export type AnyPermissionDescriptor = Omit<PermissionDescriptor, 'name'> & {
  name:
  | PermissionName
  | 'accelerometer'
  | 'accessibility-events'
  | 'ambient-light-sensor'
  | 'background-sync'
  | 'camera'
  | 'clipboard-read'
  | 'clipboard-write'
  | 'geolocation'
  | 'gyroscope'
  | 'local-fonts'
  | 'magnetometer'
  | 'microphone'
  | 'midi'
  | 'notifications'
  | 'payment-handler'
  | 'persistent-storage'
  | 'push'
  | 'screen-wake-lock'
  | 'storage-access'
  | 'top-level-storage-access'
  | 'web-share'
  | 'window-management'
  | (string & {});
};
