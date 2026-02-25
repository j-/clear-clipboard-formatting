import Alert, { AlertProps } from '@mui/material/Alert';
import { FC } from 'react';

export const AlertWarning: FC<AlertProps> = ({ children, ...props }) => (
  <Alert severity="warning" sx={{ mt: 2 }} {...props}>
    {children}
  </Alert>
);
