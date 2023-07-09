import React from "react";
import Button from "@mui/material/Button";
interface Props {
  text: string;
  onClick: () => void;
  mainColor: boolean;
}
const MyButton = ({ text, onClick, mainColor }: Props) => {
  const color = mainColor ? "primary" : "secondary";
  return (
    <>
      <Button
        onClick={onClick}
        color={color}
        sx={{ boxShadow: 8 }}
        variant="contained"
      >
        {text}
      </Button>
    </>
  );
};

export default MyButton;
