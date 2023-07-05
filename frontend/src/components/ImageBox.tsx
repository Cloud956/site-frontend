import React from "react";
import { Box } from "@mui/material";
const ImageBox = () => {
  return (
    <Box
      sx={{
        width: 1080,
        height: 720,
        backgroundColor: "primary.dark",
        "&:hover": {
          backgroundColor: "primary.main",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    />
  );
};

export default ImageBox;
