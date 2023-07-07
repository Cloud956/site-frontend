import React, { useState } from "react";
import "./Layout.css";
import { Box, Stack, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import ListGroup from "./ListGroup";
import TransformationsMenu from "./TransformationsMenu";
import InputStack from "./InputStack";
import MyButton from "./MyButton";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import UploadIcon from "@mui/icons-material/Upload";

const transformations = ["TO_RGB", "OTHER", "FUCK"];
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  elevation: "15",
  //  width: "100%", // Adjust the width to fit the container
  // height: "100%", // Adjust the height to fit the container
}));

const FillItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  elevation: "15",
  width: "100%", // Adjust the width to fit the container
  height: "100%", // Adjust the height to fit the container
}));

let TextMap = new Map<string, string>([
  ["TO_RGB", "THIS TRANSFORMATION TRANSFORMS INTO RGB"],
  ["OTHER", "THIS DOES STH ELSE"],
  ["FUCK", "FUCK TYPESCRIPT?"],
  ["nothing", "Please select a transformation!"],
]);

let InputStackMap = new Map<string, string[]>([
  ["TO_RGB", ["fiwrst", "sesscond", ""]],
  ["OTHER", ["firsst", "", ""]],
  ["FUCK", ["firdst", "secodnd", "thired"]],
  ["nothing", ["", "", ""]],
]);

function isString(value: unknown): value is string {
  return typeof value === "string";
}

interface Props {
  onFirstChange: (int: number) => void;
  onSecondChange: (int: number) => void;
  onThirdChange: (int: number) => void;
  onTransformationTypeChange: (str: string) => void;
  onTransformMain: () => void;
  onTransformCurrent: () => void;
  currentTransformation: string;
}

const LeftPanel = ({
  onFirstChange,
  onSecondChange,
  onThirdChange,
  onTransformationTypeChange,
  onTransformMain,
  onTransformCurrent,
  currentTransformation,
}: Props) => {
  
  const [leftPanelText, setLeftPanelText] = useState<string | undefined>(
    TextMap.get(currentTransformation)
  );

  return (
    <Box className="sidebar">
      <Stack spacing={2}>
        <Item>
          <TransformationsMenu
            menuItems={transformations}
            onItemClick={(item: string) => {
              setLeftPanelText(TextMap.get(item));
              onTransformationTypeChange(item);
            }}
          />
        </Item>
        <Box
          sx={{
            width: "100%",
            height: 350,
          }}
        >
          <FillItem>{leftPanelText}</FillItem>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: 233,
          }}
        >
          {isString(currentTransformation) ? (
            <FillItem>
              <InputStack
                titles={InputStackMap.get(currentTransformation)}
                onFirstChange={onFirstChange}
                onSecondChange={onSecondChange}
                onThirdChange={onThirdChange}
              />
            </FillItem>
          ) : (
            <Item></Item>
          )}
        </Box>
        <Box
          sx={{
            height: 100,
            width: "100%",
          }}
        >
          <Item>
            <Stack spacing={2}>
              <MyButton
                text={"Transform the current image"}
                onClick={onTransformCurrent}
              ></MyButton>
              <MyButton
                text={"Transform the main image"}
                onClick={onTransformMain}
              ></MyButton>
            </Stack>
          </Item>
        </Box>
        <Box>
          <Item>
            <Button endIcon={<UploadIcon />} variant="outlined">
              Upload a new image!
            </Button>
          </Item>
        </Box>
      </Stack>
    </Box>
  );
};

export default LeftPanel;
