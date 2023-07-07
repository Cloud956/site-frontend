import React from "react";
import { Box, CircularProgress } from "@mui/material";
import bibiSource from "../../../images/bibi.jpg";
import { useState } from "react";
interface Props {
  onImageLoad: (str: string) => void;
  imageString: string;
}
const ImageBox = ({ onImageLoad, imageString }: Props) => {
  function convertImageToBase64(imgElement: HTMLImageElement) {
    const canvas = document.createElement("canvas");
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(imgElement, 0, 0);

    const base64String = canvas.toDataURL("image/png");
    return base64String;
  }
  const [loading, setLoading] = useState(true);
  const image = new Image();
  image.src = bibiSource;

  image.onload = function () {
    setLoading(false);
    onImageLoad(convertImageToBase64(image));
  };
  return (
    <Box
      sx={{
        width: 1120,
        height: 760,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: 20,
        borderColor: "white",
      }}
    >
      {loading ? (
        <CircularProgress color="info" />
      ) : (
        <img src={imageString} width="1080" height="720"></img>
      )}
    </Box>
  );
};

export default ImageBox;
