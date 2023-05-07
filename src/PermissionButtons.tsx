import { FC } from 'react';
import { ClipboardReadPermissionButton } from './ClipboardReadPermissionButton';
import { ClipboardWritePermissionButton } from './ClipboardWritePermissionButton';
import { useClipboardReadPermissionState } from './use-clipboard-read-permission-state';
import { useClipboardWritePermissionState } from './use-clipboard-write-permission-state';

export const PermissionButtons: FC = () => {
  const readPermission = useClipboardReadPermissionState();
  const writePermission = useClipboardWritePermissionState();

  if (readPermission == null && writePermission == null) {
    return null
  }

  return (
    <div className="my-3 d-grid gap-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
      <ClipboardReadPermissionButton />
      <ClipboardWritePermissionButton />
    </div>
  );
};
