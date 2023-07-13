import React from "react";
import { Box, CircularProgress } from "@mui/material";
import bibiSource from "../../../images/bibi.jpg";
import { useState } from "react";
interface Props {
  loading: boolean;
  imageString: string;
}
const ImageBox = ({ loading, imageString }: Props) => {
  return (
    <Box
      sx={{
        width: "60vw",
        height: "60vl",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: 1,
        borderColor: "white",
      }}
    >
      {loading ? (
        <CircularProgress color="info" />
      ) : (
        <img src={imageString} width="100%" height="100%"></img>
      )}
    </Box>
  );
};

export default ImageBox;
