import AlertTitle from '@mui/material/AlertTitle';
import { FC } from 'react';
import { AlertDanger } from './AlertDanger';

export const PermissionStateAlertDenied: FC = () => (
  <AlertDanger>
    <AlertTitle>Clipboard read permission is denied</AlertTitle>
    This app will not function until permission is granted.
  </AlertDanger>
);
