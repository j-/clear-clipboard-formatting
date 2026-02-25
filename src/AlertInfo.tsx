import Alert, { AlertProps } from '@mui/material/Alert';
import { FC } from 'react';

export const AlertInfo: FC<AlertProps> = ({ children, ...props }) => (
  <Alert severity="info" sx={{ mt: 2 }} {...props}>
    {children}
  </Alert>
);
