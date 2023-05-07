import { usePermissionState } from './use-permission-state';

export const useClipboardWritePermissionState = (): PermissionState | null => (
  usePermissionState('clipboard-write')
);
