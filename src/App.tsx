import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { Icons } from './Icons';
import { MaybePermissionStateAlert } from './MaybePermissionStateAlert';
import { AlertDanger } from './AlertDanger';
import { AlertInfo } from './AlertInfo';
import { MaybeUnsupportedAlert } from './MaybeUnsupportedAlert';
import { PermissionButtons } from './PermissionButtons';

const MESSAGE_DELAY = 3_000;

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
      setMessage('Clipboard formatting was already cleared.');
    } else {
      setMessage(`Clipboard formatting was cleared of these types: ${otherTypes.map((type) => JSON.stringify(type)).join(', ')}`);
    }

    umami?.track('Clear formatting success', { types: otherTypes });
  }, []);

  const handleClickButton = useCallback(() => {
    umami?.track('Click button');
    clearClipboardFormatting();
  }, [clearClipboardFormatting]);

  const handlePasteWindow = useCallback(() => {
    umami?.track('Paste window');
    clearClipboardFormatting();
  }, [clearClipboardFormatting]);

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
    <div className="App container my-5" style={{ maxWidth: '60ch' }}>
      <Icons />

      <h1 className="my-3">Clear clipboard formatting</h1>

      <p>
        <strong>Paste into this window</strong> or <strong>click the button
        below</strong> to replace the contents of your clipboard with a plain
        text version. Will prevent formatting from being pasted into
        applications which support it.
      </p>

      <div className="d-flex justify-content-center">
        <button
          className="btn btn-dark btn-lg my-5"
          style={{
            width: '20rem',
            height: '10rem',
          }}
          type="button"
          onClick={handleClickButton}
          disabled={
            typeof navigator.clipboard.read !== 'function' ||
            typeof navigator.clipboard.readText !== 'function'
          }
        >
          Clear clipboard formatting
        </button>
      </div>

      <PermissionButtons />

      {<MaybeUnsupportedAlert /> || <MaybePermissionStateAlert />}

      {lastReadError && (
        <AlertDanger>
          <strong>There was an error reading from the clipboard:</strong>{' '}{lastReadError.message}
        </AlertDanger>
      )}

      {lastWriteError && (
        <AlertDanger>
          <strong>There was an error reading writing to the clipboard:</strong>{' '}{lastWriteError.message}
        </AlertDanger>
      )}

      {message && (
        <AlertInfo>
          {message}
        </AlertInfo>
      )}
    </div>
  );
};

export default App;
