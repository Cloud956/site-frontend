import React, { useState } from "react";
import { Box, Paper } from "@mui/material";
import LeftPanel from "./Layout/LeftPanel/LeftPanel";
import RightPanel from "./Layout/RightSide/RightPanel";
import bibiSource from "../images/bibi.jpg";
const MainPage = () => {
  const backendIP = "http://3.64.165.103:8000/transformations/";
  const [firstParam, setFirstParam] = useState(0);
  const [secondParam, setSecondParam] = useState(0);
  const [thirdParam, setThirdParam] = useState(0);
  const [currentImageBase64, setCurrentImageBase64] = useState("");
  const [mainImageBase64, setMainImageBase64] = useState("");

  const [practiceImageFlag, setPracticeImageFlag] = useState(true);
  const [currentTransformation, currentTransformationSetter] =
    useState<string>("No transformation");
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  function DisplayMain() {
    setCurrentImageBase64(mainImageBase64);
  }
  async function fileto64(file: File) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      let base64 = reader.result as string;
      setCurrentImageBase64(base64);
      setMainImageBase64(base64);
    };
  }
  function handleUserImageInput() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (event) => {
      let files = (event.target as HTMLInputElement).files;
      if (files != null) {
        let file = files[0];
        fileto64(file);
      }
      // Do something with the selected file
    };
    input.click();
  }

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
      const image64 = convertImageToBase64(image);
      setMainImageBase64(image64);
      setCurrentImageBase64(image64);
      console.log("Im loading");
    };
    setPracticeImageFlag(false);
  }
  function giveRequestBody(current: boolean) {
    let image64 = current ? currentImageBase64 : mainImageBase64;
    let requestBody = {
      image: image64,
      param1: firstParam,
      param2: secondParam,
      param3: thirdParam,
    };
    return requestBody;
  }

  async function runRequest(requestBody: {
    image: string;
    param1: number;
    param2: number;
    param3: number;
  }) {
    let currentAddress = backendIP + currentTransformation;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "True",
      },
      body: JSON.stringify(requestBody),
    };
    try {
      setLoading(true);
      let response = await fetch(currentAddress, requestOptions);
      if (!response.ok) {
        setOffAlert(response.status + " " + response.statusText);
        setLoading(false);
      } else {
        console.log(response.status);
        const data = await response.json();
        const image_data = data.image;
        setCurrentImageBase64(image_data);
        setLoading(false);
      }
    } catch (e) {
      console.log("request failed");
      setLoading(false);
    }
  }
  function setOffAlert(message: string) {
    setAlertMessage(message);
    if (!showAlert) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  }
  const transformationSelected = () => {
    if (currentTransformation == "nothing") {
      return false;
    } else {
      return true;
    }
  };
  async function onClickMain() {
    if (transformationSelected()) {
      let requestbody = giveRequestBody(false);
      runRequest(requestbody);
    } else {
      setOffAlert("No transformation selected!");
    }
  }

  async function onClickCurrent() {
    if (transformationSelected()) {
      let requestbody = giveRequestBody(true);
      runRequest(requestbody);
    } else {
      setOffAlert("No transformation selected!");
    }
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
        onDisplayMain={DisplayMain}
        handleUserImageInput={handleUserImageInput}
        currentTransformation={currentTransformation}
      />
      <RightPanel
        imageString={currentImageBase64}
        loading={loading}
        setAlertShowing={setShowAlert}
        alertMessage={alertMessage}
        showingAlert={showAlert}
      />
    </>
  );
};

export default MainPage;
//TODO MAKE THE INPUTS NOT DISAPPEAR BUT INSTEAD BE DISABLED
// FIGURE OUT THE TRANSFORMING BULLSHIT :)
// DISPLAY IMAGE
// FIGURE OUT OPENCV
