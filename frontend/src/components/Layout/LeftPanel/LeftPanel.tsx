import React, { useState } from "react";
import "./Layout.css";
import { Box, Stack, Button, Input, Icon, Tooltip } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import ListGroup from "./ListGroup";
import TransformationsMenu from "./TransformationsMenu";
import InputStack from "./InputStack";
import MyButton from "./MyButton";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import UploadIcon from "@mui/icons-material/Upload";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
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
  ["No transformation", "Please select a transformation!"],
]);

let InputStackMap = new Map<string, string[]>([
  ["TO_RGB", ["fiwrst", "sesscond", ""]],
  ["OTHER", ["firsst", "", ""]],
  ["FUCK", ["firdst", "secodnd", "thired"]],
  ["No transformation", ["", "", ""]],
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
  onDisplayMain: () => void;
  handleUserImageInput: () => void;
  currentTransformation: string;
}

const LeftPanel = ({
  onFirstChange,
  onSecondChange,
  onThirdChange,
  onTransformationTypeChange,
  onTransformMain,
  onTransformCurrent,
  onDisplayMain,
  handleUserImageInput,
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
        <Item>
          <Stack>
            <span style={{ fontWeight: "bold" }}>
              Currently selected transformation :
            </span>
            <span style={{ textDecoration: "underline" }}>
              {currentTransformation}
            </span>
          </Stack>
        </Item>
        <Box
          sx={{
            width: "100%",
            height: 300,
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
            height: 130,
            width: "100%",
          }}
        >
          <Item>
            <Stack spacing={1}>
              <MyButton
                text={"Transform the current image"}
                onClick={onTransformCurrent}
                mainColor={true}
              ></MyButton>
              <MyButton
                text={"Transform the main image"}
                onClick={onTransformMain}
                mainColor={true}
              ></MyButton>
              <MyButton
                text={"Display the main image"}
                onClick={onDisplayMain}
                mainColor={false}
              ></MyButton>
            </Stack>
          </Item>
        </Box>
        <Box>
          <Item
            sx={{
              gap: "50px",
            }}
          >
            <Button
              endIcon={
                <Tooltip title="All uploads will be resized into a 1080x720 format.">
                  <HelpOutlineIcon />
                </Tooltip>
              }
              variant="outlined"
              onClick={handleUserImageInput}
            >
              Upload a new image!
            </Button>
          </Item>
        </Box>
      </Stack>
    </Box>
  );
};

export default LeftPanel;
