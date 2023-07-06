import React from "react";
import { Box } from "@mui/material";
import bibiSource from "./images/bibi.jpg";
import cv from "opencv-ts";
const ImageBox = () => {
 // const bibi = cv.imread(bibiSource);
 // console.log;
  return (
    <Box
      sx={{
        width: 1080,
        height: 720,
        backgroundColor: "primary.dark",
      }}
    >
      <img src={bibiSource}></img>
    </Box>
  );
};

export default ImageBox;
