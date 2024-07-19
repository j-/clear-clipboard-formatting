import { useEffect, useState } from 'react';
import usePrevious from 'react-use-previous';
import { shallowEqualObjects } from 'shallow-equal';
import { AnyPermissionDescriptor } from './types';

export const usePermissionStatus = (permissionDesc: AnyPermissionDescriptor): PermissionStatus | null => {
  const [status, setStatus] = useState<PermissionStatus | null>(null);
  const previousPermissionDesc = usePrevious(permissionDesc);

  useEffect(() => {
    if (
      !navigator.permissions ||
      typeof navigator.permissions.query !== 'function' ||
      shallowEqualObjects(permissionDesc, previousPermissionDesc)
    ) {
      return;
    }

    let effectMounted = true;

    navigator.permissions
      .query(permissionDesc as PermissionDescriptor)
      .then((status) => {
        if (effectMounted) {
          setStatus(status);
        }
      })
      .catch(() => {
        // Ignore errors
      });

    return () => {
      effectMounted = false;
    };
  }, [permissionDesc, previousPermissionDesc]);

  return status;
};
