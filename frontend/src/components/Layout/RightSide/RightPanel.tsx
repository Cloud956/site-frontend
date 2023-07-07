import { Box } from "@mui/material";
import React from "react";
import { positions } from "@mui/system";
import { spacing } from "@mui/system";
import ImageBox from "./ImageBox";
interface Props {
  onImageLoad: (str: string) => void;
  imageString: string;
}
const RightPanel = ({ onImageLoad, imageString }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        ml: "320px",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {<ImageBox onImageLoad={onImageLoad} imageString={imageString} />}
      </Box>
    </Box>
  );
};

export default RightPanel;
