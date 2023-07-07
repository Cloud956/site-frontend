import React from "react";
import { Box } from "@mui/material";
import bibiSource from "../../../../public/images/bibi.jpg";
import cv, { Mat } from "opencv-ts";

const ImageBox = () => {
  const image = new Image(1080, 720);
  image.src = bibiSource;
  function convertImageToBase64(imgElement: HTMLImageElement) {
    const canvas = document.createElement("canvas");
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(imgElement, 0, 0);

    const base64String = canvas.toDataURL("image/png");
    return base64String;
  }
  console.log(convertImageToBase64(image));

  return (
    <Box
      sx={{
        width: 1080,
        height: 720,
        backgroundColor: "primary.dark",
      }}
    >
      <img src={bibiSource} width="1080" height="720"></img>
    </Box>
  );
};

export default ImageBox;
