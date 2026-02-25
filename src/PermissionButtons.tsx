import { FC } from 'react';
import Box from '@mui/material/Box';
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
    <Box sx={{ my: 3, display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
      <ClipboardReadPermissionButton />
      <ClipboardWritePermissionButton />
    </Box>
  );
};
