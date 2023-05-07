import { FC } from 'react';
import { AlertDanger } from './AlertDanger';

export const PermissionStateAlertDenied: FC = () => (
  <AlertDanger>
    Clipboard read permission is denied. This app will not function until permission is granted.
  </AlertDanger>
);
