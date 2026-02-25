import Alert, { AlertProps } from '@mui/material/Alert';
import { FC } from 'react';

export const AlertDanger: FC<AlertProps> = ({ children, ...props }) => (
  <Alert severity="error" sx={{ mt: 2 }} {...props}>
    {children}
  </Alert>
);
