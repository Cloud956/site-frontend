import React from "react";
import { Alert } from "@mui/material";
interface Props {
  showing: boolean;
  setShowing: (bool: boolean) => void;
  message: string;
}
const AlertFields = ({ showing, setShowing, message }: Props) => {
  return (
    <>
      {showing ? (
        <Alert
          severity="error"
          onClose={() => {
            setShowing(false);
          }}
          sx={{
            height: "auto",
            width: "auto",
            position: "absolute",
            display: "flex",
            top: 0,
            right: 0,
          }}
        >
          {message}
        </Alert>
      ) : null}
    </>
  );
};

export default AlertFields;
