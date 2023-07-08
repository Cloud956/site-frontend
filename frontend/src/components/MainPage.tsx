import React, { useState } from "react";
import { Box, Paper } from "@mui/material";
import LeftPanel from "./Layout/LeftPanel/LeftPanel";
import RightPanel from "./Layout/RightSide/RightPanel";
import bibiSource from "../images/bibi.jpg";
const MainPage = () => {
  const backendIP = "http://127.0.0.1:8000/transformations/";
  const [firstParam, setFirstParam] = useState(0);
  const [secondParam, setSecondParam] = useState(0);
  const [thirdParam, setThirdParam] = useState(0);
  const [ImageBase64, SetImageBase64] = useState("");
  const [practiceImageFlag, SetPracticeImageFlag] = useState(true);
  const [currentTransformation, currentTransformationSetter] =
    useState<string>("nothing");
  const [loading, setLoading] = useState(true);
  function convertImageToBase64(imgElement: HTMLImageElement) {
    const canvas = document.createElement("canvas");
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(imgElement, 0, 0);

    const base64String = canvas.toDataURL("image/png");
    return base64String;
  }
  if (practiceImageFlag) {
    const image = new Image();
    image.src = bibiSource;
    console.log("this is running");
    image.onload = function () {
      setLoading(false);
      SetImageBase64(convertImageToBase64(image));
      console.log("Im loading");
    };
    SetPracticeImageFlag(false);
  }

  async function onClickMain() {
    setLoading(true);
    let currentAddress = backendIP + currentTransformation;
    const requestBody = {
      image: ImageBase64,
      param1: firstParam,
      param2: secondParam,
      param3: thirdParam,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "True",
      },
      body: JSON.stringify(requestBody),
    };
    const response = await fetch(currentAddress, requestOptions);
    const data = await response.json();
    const image_data = data.image;
    SetImageBase64(image_data);
    setLoading(false);
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
      <RightPanel imageString={ImageBase64} loading={loading} />
    </>
  );
};

export default MainPage;
//TODO MAKE THE INPUTS NOT DISAPPEAR BUT INSTEAD BE DISABLED
// FIGURE OUT THE TRANSFORMING BULLSHIT :)
// DISPLAY IMAGE
// FIGURE OUT OPENCV
