import AlertTitle from '@mui/material/AlertTitle';
import { FC } from 'react';
import { AlertWarning } from './AlertWarning';

export const PermissionStateAlertUnknown: FC = () => (
  <AlertWarning>
    <AlertTitle>Clipboard read permission state cannot be determined</AlertTitle>
    You may be asked to grant permission to this app.
  </AlertWarning>
);
