import { usePermissionState } from './use-permission-state';

export const useClipboardReadPermissionState = (): PermissionState | null => (
  usePermissionState('clipboard-read')
);
