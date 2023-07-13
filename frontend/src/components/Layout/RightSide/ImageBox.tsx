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
        width: "62vw",
        height: "40vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: 1,
        borderColor: "white",
      }}
    >
      {loading ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            flexGrow: 1,
            backgroundColor: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="info" />
        </Box>
      ) : (
        <img src={imageString} width="100%" height="100%"></img>
      )}
    </Box>
  );
};

export default ImageBox;
