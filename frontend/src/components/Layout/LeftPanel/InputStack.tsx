import { Stack } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
interface Props {
  sliders: number[][];
  onFirstChange: (num: number) => void;
  onSecondChange: (num: number) => void;
  onThirdChange: (num: number) => void;
  titles: string[];
  transformationChange: boolean;
  setTransformationChange: (b: boolean) => void;
}
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const InputStack = ({
  sliders,
  onFirstChange,
  onSecondChange,
  onThirdChange,
  titles,
  transformationChange,
  setTransformationChange,
}: Props) => {
  const functions = [onFirstChange, onSecondChange, onThirdChange];
  let items = sliders?.map((slider, index) => (
    <div
      onLoad={() => {}}
      key={titles[index] + index.toString()}
      style={{ width: "80%", height: "auto" }}
    >
      <Typography
        key={"input-slider" + titles[index]}
        id="input-slider"
        gutterBottom
      >
        <span style={{ fontSize: "1.4vh" }}>{titles[index]}</span>
      </Typography>
      <Slider
        key={titles[index] + index.toString()}
        aria-label="Always visible"
        min={slider[0]}
        max={slider[1]}
        step={slider[2]}
        getAriaValueText={(value: number) => {
          return value.toString();
        }}
        onChange={(event: Event, newValue: number | number[]) => {
          functions[index](newValue as number);
          //console.log("changed");
        }}
        defaultValue={slider[3]}
        aria-labelledby="input-slider"
        valueLabelDisplay="auto"
        marks={[
          {
            value: slider[0],
            label: slider[0].toString(),
          },
          {
            value: slider[1],
            label: slider[1].toString(),
          },
        ]}
      ></Slider>
    </div>
  ));
  useEffect(() => {
    if (transformationChange) {
      for (let index = 0; index < sliders.length; index++) {
        functions[index](sliders[index][3]);
        //   console.log("worked");
      }
      setTransformationChange(false);
    }
  });

  return (
    <Stack
      sx={{
        textAlign: "center",
        width: "100%", // Adjust the width to fit the container
        height: "100%", // Adjust the height to fit the container
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {items}
    </Stack>
  );
};

export default InputStack;
