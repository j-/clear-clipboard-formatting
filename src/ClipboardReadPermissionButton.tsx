import { FC, useCallback, useId } from 'react';
import { useClipboardReadPermissionState } from './use-clipboard-read-permission-state';

declare global {
  interface Permissions {
    request(permissionDescriptor: PermissionDescriptor): Promise<void>;
  }
}

export const ClipboardReadPermissionButton: FC = () => {
  const id = useId();
  const key = `ClipboardReadPermissionButton-${id}`;
  const state: PermissionState | null = useClipboardReadPermissionState();
  const canRequest = typeof navigator.permissions.request == 'function';

  const handleClickRequestPermission = useCallback(() => {
    navigator.permissions.request({ name: 'clipboard-read' as PermissionName });
  }, []);

  switch (state) {
    case 'granted': return (
      <button key={key} className="btn btn-light" type="button" disabled>
        Read permission granted
      </button>
    );
    case 'prompt': return (
      <button key={key} className="btn btn-dark" type="button" disabled={!canRequest} onClick={handleClickRequestPermission}>
        {canRequest ? 'Click to request read permission' : 'Read permission is not yet granted'}
      </button>
    );
    case 'denied': return (
      <button key={key} className="btn btn-danger" type="button" disabled>
        Read permission denied
      </button>
    );
    default: return (
      <button key={key} className="btn btn-dark" type="button" disabled={!canRequest} onClick={handleClickRequestPermission}>
        {canRequest ? 'Click to request read permission' : 'Read permission state cannot be determined'}
      </button>
    );
  }
};
