import { FC } from 'react';
import Link from '@mui/material/Link';
import { AlertDanger } from './AlertDanger';

export const MaybeUnsupportedAlert: FC = () => {
  const supported = (
    typeof navigator.clipboard.read === 'function' &&
    typeof navigator.clipboard.readText === 'function'
  );

  return supported ? null : (
    <AlertDanger>
      Your browser does not support the <Link href="https://caniuse.com/mdn-api_clipboard_read" target="_blank" rel="noreferrer">clipboard API</Link>.
    </AlertDanger>
  );
};
