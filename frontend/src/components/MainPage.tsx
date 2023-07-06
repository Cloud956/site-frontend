import React from "react";
import { Box, Paper } from "@mui/material";
import LeftPanel from "./Layout/LeftPanel/LeftPanel";
import RightPanel from "./Layout/RightSide/RightPanel";

const MainPage = () => {
  return (
    <>
      <LeftPanel />
      <RightPanel />
    </>
  );
};

export default MainPage;
//TODO MAKE THE INPUTS NOT DISAPPEAR BUT INSTEAD BE DISABLED
// FIGURE OUT THE TRANSFORMING BULLSHIT :)
// DISPLAY IMAGE
// FIGURE OUT OPENCV
