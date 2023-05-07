import { FC, HTMLAttributes } from 'react';
import { ExclamationTriangleFill } from './Icons';

export const AlertWarning: FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div className="alert alert-warning d-flex align-items-center" {...props}>
    <ExclamationTriangleFill className="bi flex-shrink-0 me-2" aria-label="Warning:" />
    <div>{children}</div>
  </div>
);
