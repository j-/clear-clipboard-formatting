import { FC, useCallback } from 'react';
import Button from '@mui/material/Button';
import { useClipboardWritePermissionState } from './use-clipboard-write-permission-state';

declare global {
  interface Permissions {
    request(permissionDescriptor: PermissionDescriptor): Promise<void>;
  }
}

export const ClipboardWritePermissionButton: FC = () => {
  const state: PermissionState | null = useClipboardWritePermissionState();
  const canRequest = typeof navigator.permissions.request == 'function';

  const handleClickRequestPermission = useCallback(() => {
    navigator.permissions.request({ name: 'clipboard-write' as PermissionName });
  }, []);

  switch (state) {
    case 'granted': return (
      <Button variant="outlined" color="success" type="button" disabled>
        Write permission granted
      </Button>
    );
    case 'prompt': return (
      <Button variant="contained" color="primary" type="button" disabled={!canRequest} onClick={handleClickRequestPermission}>
        {canRequest ? 'Click to request write permission' : 'Write permission not yet granted'}
      </Button>
    );
    case 'denied': return (
      <Button variant="contained" color="error" type="button" disabled>
        Write permission denied
      </Button>
    );
    default: return (
      <Button variant="contained" color="primary" type="button" disabled={!canRequest} onClick={handleClickRequestPermission}>
        {canRequest ? 'Click to request write permission' : 'Write permission state cannot be determined'}
      </Button>
    );
  }
};
