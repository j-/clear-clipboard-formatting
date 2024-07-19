import { usePermissionState } from './use-permission-state';

export const useClipboardWritePermissionState = (): PermissionState | null => (
  usePermissionState({ name: 'clipboard-write' })
);
