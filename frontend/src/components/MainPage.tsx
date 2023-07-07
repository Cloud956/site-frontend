import React, { useState } from "react";
import { Box, Paper } from "@mui/material";
import LeftPanel from "./Layout/LeftPanel/LeftPanel";
import RightPanel from "./Layout/RightSide/RightPanel";

const MainPage = () => {
  const [firstParam, setFirstParam] = useState(0);
  const [secondParam, setSecondParam] = useState(0);
  const [thirdParam, setThirdParam] = useState(0);
  const [ImageBase64, SetImageBase64] = useState("");
  const [currentTransformation, currentTransformationSetter] =
    useState<string>("nothing");
  function onClickMain() {
    console.log(1);
  }
  function onClickCurrent() {
    console.log(2);
    console.log(firstParam);
    console.log(secondParam);
    console.log(thirdParam);
    console.log(currentTransformation);
    console.log(ImageBase64);
  }

  return (
    <>
      <LeftPanel
        onFirstChange={setFirstParam}
        onSecondChange={setSecondParam}
        onThirdChange={setThirdParam}
        onTransformCurrent={onClickCurrent}
        onTransformMain={onClickMain}
        onTransformationTypeChange={currentTransformationSetter}
        currentTransformation={currentTransformation}
      />
      <RightPanel onImageLoad={SetImageBase64} imageString={ImageBase64} />
    </>
  );
};

export default MainPage;
//TODO MAKE THE INPUTS NOT DISAPPEAR BUT INSTEAD BE DISABLED
// FIGURE OUT THE TRANSFORMING BULLSHIT :)
// DISPLAY IMAGE
// FIGURE OUT OPENCV
