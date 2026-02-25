import { FC, useCallback } from 'react';
import Button from '@mui/material/Button';
import { useClipboardReadPermissionState } from './use-clipboard-read-permission-state';

declare global {
  interface Permissions {
    request(permissionDescriptor: PermissionDescriptor): Promise<void>;
  }
}

export const ClipboardReadPermissionButton: FC = () => {
  const state: PermissionState | null = useClipboardReadPermissionState();
  const canRequest = typeof navigator.permissions.request == 'function';

  const handleClickRequestPermission = useCallback(() => {
    navigator.permissions.request({ name: 'clipboard-read' as PermissionName });
  }, []);

  switch (state) {
    case 'granted': return (
      <Button variant="outlined" color="success" type="button" disabled>
        Read permission granted
      </Button>
    );
    case 'prompt': return (
      <Button variant="contained" color="primary" type="button" disabled={!canRequest} onClick={handleClickRequestPermission}>
        {canRequest ? 'Click to request read permission' : 'Read permission not yet granted'}
      </Button>
    );
    case 'denied': return (
      <Button variant="contained" color="error" type="button" disabled>
        Read permission denied
      </Button>
    );
    default: return (
      <Button variant="contained" color="primary" type="button" disabled={!canRequest} onClick={handleClickRequestPermission}>
        {canRequest ? 'Click to request read permission' : 'Read permission state cannot be determined'}
      </Button>
    );
  }
};
