import { FC, useCallback, useId } from 'react';
import { useClipboardWritePermissionState } from './use-clipboard-write-permission-state';

declare global {
  interface Permissions {
    request(permissionDescriptor: PermissionDescriptor): Promise<void>;
  }
}

export const ClipboardWritePermissionButton: FC = () => {
  const id = useId();
  const key = `ClipboardWritePermissionButton-${id}`;
  const state: PermissionState | null = useClipboardWritePermissionState();
  const canRequest = typeof navigator.permissions.request == 'function';

  const handleClickRequestPermission = useCallback(() => {
    navigator.permissions.request({ name: 'clipboard-write' as PermissionName });
  }, []);

  switch (state) {
    case 'granted': return (
      <button key={key} className="btn btn-light" type="button" disabled>
        Write permission granted
      </button>
    );
    case 'prompt': return (
      <button key={key} className="btn btn-dark" type="button" disabled={!canRequest} onClick={handleClickRequestPermission}>
        {canRequest ? 'Click to request write permission' : 'Write permission is not yet granted'}
      </button>
    );
    case 'denied': return (
      <button key={key} className="btn btn-danger" type="button" disabled>
        Write permission denied
      </button>
    );
    default: return (
      <button key={key} className="btn btn-dark" type="button" disabled={!canRequest} onClick={handleClickRequestPermission}>
        {canRequest ? 'Click to request write permission' : 'Write permission state cannot be determined'}
      </button>
    );
  }
};
