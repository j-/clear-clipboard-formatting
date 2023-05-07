import { FC } from 'react';
import { AlertDanger } from './AlertDanger';

export const MaybeUnsupportedAlert: FC = () => {
  const supported = (
    typeof navigator.clipboard.read === 'function' &&
    typeof navigator.clipboard.readText === 'function'
  );

  return supported ? null : (
    <AlertDanger>
      Your browser does not support the <a className="alert-link" href="https://caniuse.com/mdn-api_clipboard_read" target="_blank">clipboard API</a>.
    </AlertDanger>
  );
};
