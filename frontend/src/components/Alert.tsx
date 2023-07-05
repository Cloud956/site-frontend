import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const Alert = ({ children }: Props) => {
  return <div className="alert alert-primary">
    {children}
    <button type = "button" className="btn-close" data-bs-dismiss = 'alert'></button>
  </div>;
};

export default Alert;
