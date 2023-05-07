import { FC } from 'react';
import { AlertInfo } from './AlertInfo';

export const PermissionStateAlertPrompt: FC = () => (
  <AlertInfo>
    Clipboard read permission is not yet granted. You will be asked to grant permission to this app. The app may not function as expected until permission is granted.
  </AlertInfo>
);
