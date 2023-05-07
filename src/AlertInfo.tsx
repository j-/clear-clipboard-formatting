import { FC, HTMLAttributes } from 'react';
import { InfoFill } from './Icons';

export const AlertInfo: FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div className="alert alert-info d-flex align-items-center" {...props}>
    <InfoFill className="bi flex-shrink-0 me-2" aria-label="Info:" />
    <div>{children}</div>
  </div>
);
