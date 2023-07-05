import { Box, Container, Grid } from "@mui/material";
import React from "react";
import { ReactNode } from "react";
import ImageBox from "./ImageBox.tsx";
interface Props {
  LeftContainer: ReactNode;
  BottomContainer: ReactNode;
  ImageContainer: ReactNode;
}

const MainPageBox = () =>
  //{
  // LeftContainer,
  //BottomContainer,
  //ImageContainer,
  //}: Props
  {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={3}><ImageBox></ImageBox></Grid>
          <Grid item xs={9}>
            <ImageBox></ImageBox>
          </Grid>
        </Grid>
      </>
    );
  };

export default MainPageBox;
