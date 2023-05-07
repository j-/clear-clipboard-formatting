import { useEffect, useState } from 'react';

export const usePermissionStatus = (permissionName: string): PermissionStatus | null => {
  const [status, setStatus] = useState<PermissionStatus | null>(null);

  useEffect(() => {
    if (
      !navigator.permissions ||
      typeof navigator.permissions.query !== 'function'
    ) {
      return;
    }

    let effectMounted = true;

    navigator.permissions
      .query({ name: permissionName as PermissionName })
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
  }, [permissionName]);

  return status;
};
