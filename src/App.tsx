import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { MaybePermissionStateAlert } from './MaybePermissionStateAlert';
import { AlertDanger } from './AlertDanger';
import { AlertInfo } from './AlertInfo';
import { MaybeUnsupportedAlert } from './MaybeUnsupportedAlert';
import { PermissionButtons } from './PermissionButtons';

const MESSAGE_DELAY = 5_000;

const App: FC = () => {
  const [lastReadError, setLastReadError] = useState<Error | null>(null);
  const [lastWriteError, setLastWriteError] = useState<Error | null>(null);
  const [message, setMessage] = useState<ReactNode | null>(null);

  const clearClipboardFormatting = useCallback(async () => {
    setMessage(null);
    setLastReadError(null);
    setLastWriteError(null);

    let text: string;
    let items: ClipboardItems;

    try {
      [text, items] = await Promise.all([
        navigator.clipboard.readText(),
        navigator.clipboard.read(),
      ]);
    } catch (err) {
      setLastReadError(err as Error);
      umami?.track('Read error', { message: (err as Error).message });
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      setLastWriteError(err as Error);
      umami?.track('Write error', { message: (err as Error).message });
    }

    const allTypes = items.flatMap((item) => item.types).sort();
    const otherTypes = allTypes.filter((type) => type !== 'text/plain');
    const hasOthers = otherTypes.length > 0;

    if (!hasOthers) {
      setMessage('Clipboard formatting was cleared.');
    } else {
      setMessage(`Clipboard formatting was cleared of these types: ${otherTypes.map((type) => JSON.stringify(type)).join(', ')}`);
    }

    umami?.track('Clear formatting success', { types: otherTypes });
  }, []);

  const handleClickClearFormattingButton = useCallback(() => {
    umami?.track('Click button');
    clearClipboardFormatting();
  }, [clearClipboardFormatting]);

  const handlePasteWindow = useCallback(() => {
    umami?.track('Paste window');
    clearClipboardFormatting();
  }, [clearClipboardFormatting]);

  const clearClipboard = useCallback(async () => {
    let items: ClipboardItems = [];

    try {
      const permission = await navigator.permissions.query({
        name: 'clipboard-read' as PermissionName,
      });
      if (permission.state === 'granted') {
        items = await navigator.clipboard.read();
      }
    } catch (err) {
      umami?.track('Read error', { message: (err as Error).message });
    }

    try {
      await navigator.clipboard.writeText('');
    } catch (err) {
      setLastWriteError(err as Error);
      umami?.track('Write error', { message: (err as Error).message });
    }

    const allTypes = items.flatMap((item) => item.types).sort();

    if (allTypes.length === 0) {
      setMessage('Clipboard was cleared.');
    } else {
      setMessage(`Clipboard was cleared of these types: ${allTypes.map((type) => JSON.stringify(type)).join(', ')}`);
    }
  }, []);

  const handleClickClearClipboardButton = useCallback(() => {
    umami?.track('Click clear clipboard button');
    clearClipboard();
  }, [clearClipboard]);

  useEffect(() => {
    const clock = setTimeout(() => {
      setMessage(null);
    }, MESSAGE_DELAY);

    return () => {
      clearTimeout(clock);
    };
  }, [message]);

  useEffect(() => {
    window.addEventListener('paste', handlePasteWindow);
    return () => window.removeEventListener('paste', handlePasteWindow);
  }, [handlePasteWindow]);

  return (
    <Container maxWidth="sm" sx={{ my: 5 }}>
      <Typography component="h1" variant="h4" sx={{ my: 3 }}>
        Clear clipboard formatting
      </Typography>

      <Typography component="p">
        <strong>Paste into this window</strong> or <strong>click the button below</strong> to replace the contents of your clipboard with a plain text version. Will prevent formatting from being pasted into applications which support it.
      </Typography>

      <Stack
        gap={2}
        mx="auto"
        my={5}
        sx={{
          width: '20rem',
        }}
      >
        <Tooltip
          title="Remove formating from text in clipboard"
          followCursor
          placement="top"
          sx={{
            pointerEvents: 'none',
          }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              height: '10rem',
              fontSize: '1.25rem',
              borderRadius: 4,
            }}
            type="button"
            onClick={handleClickClearFormattingButton}
            disabled={
              typeof navigator.clipboard.read !== 'function' ||
              typeof navigator.clipboard.readText !== 'function'
            }
          >
            Clear clipboard formatting
          </Button>
        </Tooltip>

        <Tooltip
          title="Empty clipboard of text and images"
          followCursor
          sx={{
            pointerEvents: 'none',
          }}
        >
          <Button
            variant="contained"
            size="medium"
            sx={{
              borderRadius: 3,
              filter: 'invert(1)',
            }}
            type="button"
            onClick={handleClickClearClipboardButton}
            disabled={
              typeof navigator.clipboard.writeText !== 'function'
            }
          >
            Clear all
          </Button>
        </Tooltip>
      </Stack>

      <PermissionButtons />

      <MaybeUnsupportedAlert />
      <MaybePermissionStateAlert />

      {lastReadError && (
        <AlertDanger>
          <AlertTitle>There was an error reading from the clipboard</AlertTitle>
          {lastReadError.message}
        </AlertDanger>
      )}

      {lastWriteError && (
        <AlertDanger>
          <AlertTitle>There was an error reading writing to the clipboard</AlertTitle>
          {lastWriteError.message}
        </AlertDanger>
      )}

      {message && (
        <AlertInfo>
          {message}
        </AlertInfo>
      )}
    </Container>
  );
};

export default App;
