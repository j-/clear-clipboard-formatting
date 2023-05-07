import { FC } from 'react';
import { AlertWarning } from './AlertWarning';

export const PermissionStateAlertUnknown: FC = () => (
  <AlertWarning>
    Clipboard read permission state cannot be determined. You may be asked to grant permission to this app.
  </AlertWarning>
);
