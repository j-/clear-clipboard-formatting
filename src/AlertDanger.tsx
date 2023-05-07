import { FC, HTMLAttributes } from 'react';
import { ExclamationTriangleFill } from './Icons';

export const AlertDanger: FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div className="alert alert-danger d-flex align-items-center" {...props}>
    <ExclamationTriangleFill className="bi flex-shrink-0 me-2" aria-label="Danger:" />
    <div>{children}</div>
  </div>
);
