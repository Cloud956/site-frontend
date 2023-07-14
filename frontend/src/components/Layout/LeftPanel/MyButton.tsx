import React from "react";
import Button from "@mui/material/Button";
interface Props {
  text: string;
  onClick: () => void;
  mainColor: number;
}
const MyButton = ({ text, onClick, mainColor }: Props) => {
  let color = "primary";
  if (mainColor == 0) {
    color = "success";
  } else {
    if (mainColor == 1) {
      color = "warning";
    } else {
      color = "primary";
    }
  }

  return (
    <>
      <Button
        style={{ maxHeight: "4vh", minWidth: "30px", minHeight: "4vh" }}
        onClick={onClick}
        sx={{ boxShadow: 8 }}
        variant="contained"
      >
        <span style={{ fontSize: "1.5vh" }}> {text}</span>
      </Button>
    </>
  );
};

export default MyButton;
