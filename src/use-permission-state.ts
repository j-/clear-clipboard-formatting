import { useCallback, useEffect, useState } from 'react';
import { usePermissionStatus } from './use-permission-status';
import { type AnyPermissionDescriptor } from './types';

export const usePermissionState = (permissionDesc: AnyPermissionDescriptor): PermissionState | null => {
  const status: PermissionStatus | null = usePermissionStatus(permissionDesc);
  const [state, setState] = useState<PermissionState | null>(null);

  const handleChangeState = useCallback(() => {
    if (status) {
      setState(status.state);
    }
  }, [status]);

  useEffect(() => {
    if (!status) return;

    setState(status.state);

    status.addEventListener('change', handleChangeState);

    return () => {
      status.removeEventListener('change', handleChangeState);
    };
  }, [handleChangeState, status]);

  return state;
};
