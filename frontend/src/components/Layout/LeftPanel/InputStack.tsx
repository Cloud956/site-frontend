import { Stack } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
interface Props {
  titles: string[] | undefined;
  onFirstChange: (num: number) => void;
  onSecondChange: (num: number) => void;
  onThirdChange: (num: number) => void;
}
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const InputStack = ({
  titles,
  onFirstChange,
  onSecondChange,
  onThirdChange,
}: Props) => {
  const functions = [onFirstChange, onSecondChange, onThirdChange];
 
  
  return (
    <Stack
      sx={{
        textAlign: "center",
        width: "100%", // Adjust the width to fit the container
        height: "100%", // Adjust the height to fit the container
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {}
    </Stack>
  );
};

export default InputStack;
