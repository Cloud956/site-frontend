import React from "react";
import Button from "@mui/material/Button";
interface Props {
  text: string;
  onClick: () => void;
}
const MyButton = ({ text, onClick }: Props) => {
  return (
    <>
      <Button onClick={onClick} sx={{ boxShadow: 8 }} variant="contained">
        {text}
      </Button>
    </>
  );
};

export default MyButton;
