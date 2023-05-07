import { FC } from 'react';
import { PermissionStateAlertUnknown } from './PermissionStateAlertUnknown';
import { PermissionStateAlertPrompt } from './PermissionStateAlertPrompt';
import { PermissionStateAlertDenied } from './PermissionStateAlertDenied';
import { useClipboardReadPermissionState } from './use-clipboard-read-permission-state';

export const MaybePermissionStateAlert: FC = () => {
  const state: PermissionState | null = useClipboardReadPermissionState();

  switch (state) {
    case 'granted': return null;
    case 'prompt': return <PermissionStateAlertPrompt />;
    case 'denied': return <PermissionStateAlertDenied />;
    default: return <PermissionStateAlertUnknown />;
  }
};
