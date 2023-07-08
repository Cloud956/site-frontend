import React from "react";
import { Box, CircularProgress } from "@mui/material";
import bibiSource from "../../../images/bibi.jpg";
import { useState } from "react";
interface Props {
  loading: boolean
  imageString: string;
}
const ImageBox = ({ loading, imageString }: Props) => {
  
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
