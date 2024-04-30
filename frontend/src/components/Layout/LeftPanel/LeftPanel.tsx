import React, { useState } from "react";
import "./Layout.css";
import { Box, Stack, Button, Input, Icon, Tooltip } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import ListGroup from "./ListGroup";
import TransformationsMenu from "./TransformationsMenu";
import InputStack from "./InputStack";
import { positions } from "@mui/system";
import MyButton from "./MyButton";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import UploadIcon from "@mui/icons-material/Upload";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
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
  [
    "To BRG",
    "Transforms the RGB image to its BRB representative. As this image is still \
  read in RGB, it will appear as if the intensity of the red and \
  blue colors have swapped.",
  ],
  ["To HSV", "Transforms the RGB image to its HSV representative."],
  ["To HSL", "Transforms the RGB image to its HLS representative."],
  ["To GRAY", "Transforms the RGB image to its grayscale representative."],

  [
    "Edge detection",
    "Displays the shapes in the image, aqcuired using the Sobel Edge Detection algorithm.\
  You can select an integer below, which is used in the code to make the edge \
  detection stronger/weaker. Recommended number is 5.",
  ],
  [
    "Linear sampling",
    "Samples the image resizing it to 1/X of its original size. Resizes it back to its original size using the linear \
    sampling rezising method! Select the sampling factor(X), which will determine \
    the size of the sampled image below!",
  ],
  [
    "Nearest Neighbour sampling",
    "Samples the image resizing it to 1/X of its original size. Resizes it back to its original size using the nearest neighbour \
  rezising method! Select the sampling factor(X), which will determine \
  the size of the sampled image below!",
  ],
  [
    "Color quantization",
    "Reduces the number of colors in the image using the uniform quantization method.\
  Please select below the desired number of colors(X). Due to the nature of the algorithm, on grayscale images it will reduce the number of colors to X, while on colored\
  images it will reduce it to X*X*X.",
  ],
  ["Gaussian noise", "Adds gaussian noise to the image."],
  [
    "Image inversion",
    "Creates a negative of the image by applying the pointwise inverse operation.",
  ],
  [
    "Power law transformation",
    "Also called gamma adjustment. All of the pixel values ( ranging from 0-255) will be divided by 255 to fit a 0-1 scale.\
  After that all of the pixel values will be powered to X, which you can select below. Feel free to experiment with different values of X.",
  ],
  [
    "Cartoonification",
    "Cartoonifies the image using the edge detection and color quantization. \
  Detects the edges in the image and applies an outline around them, while reducing the number of colors in the image to give it a cartoon-like look.\
  Please select below numerical factors for the edge detection strength, number of colors(X) and edge outline strength. Due to the nature of the algorithm, on grayscale images it will reduce the number of colors to X, while on colored\
  images it will reduce it to X*X*X. ",
  ],
  [
    "Salt&Pepper noise",
    "Applies salt and pepper noise to the image. Select below a number X, where 1/X will be the chance for noise to appear on each pixel.",
  ],
  [
    "Median filter",
    "De-noises the image using a median filter, which uses a X*X kernel to go over the entire image and fix inconsistencies. Good at removing salt and pepper noise. Please input below X, which will determine the size of the kernel.",
  ],
  [
    "Periodic horizontal noise",
    "Applies periodic horizontal noise to the image. This noise will also be clearly visible in FFT spectra of the image.",
  ],
  [
    "Periodic vertical noise",
    "Applies periodic vertical noise to the image. This noise will also be clearly visible in FFT spectra of the image.",
  ],
  [
    "FFT power spectrum",
    "Displays the power spectrum of the Fast Fourier Transformation of the image.",
  ],
  [
    "FFT magnitude spectrum",
    "Displays the magnitude spectrum of the Fast Fourier Transformation of the image.",
  ],
  [
    "Denoise in FT",
    "De-noises the image, by cutting out a big part of his FFT in an attempt to remove the parts causing the periodic noise. Outputs a grayscale image, which will probably be quite blurry.",
  ],
]);
let SlidersTitlesMap = new Map<string, string[]>([
  ["To BRG", ["", "", ""]], //to_bgr
  ["To HSV", ["", "", ""]], // to_hsv
  ["To HSL", ["", "", ""]], // to_hsl
  ["To GRAY", ["", "", ""]], //to_gray
  ["Edge detection", ["Edge strength", "", ""]], //sobel_edge
  ["Linear sampling", ["Image size", "", ""]], //linear_sampling
  ["Nearest Neighbour sampling", ["Image size", "", ""]], //nn_sampling
  ["Color quantization", ["Number of colors", "", ""]], //uniform_quantization
  ["Gaussian noise", ["Seed", "", ""]], //gauss_noise
  ["Image inversion", ["", "", ""]], //inverse
  ["Power law transformation", ["X", "", ""]], //power_law
  [
    "Cartoonification",
    ["Edge detection strength", "Number of colors", "Edge outline strength"],
  ], //cartoon
  [
    "Vertical and horizontal translation",
    ["Vertical translation", "Horizontal translation", ""],
  ], //translation
  ["Salt&Pepper noise", ["Chance factor", "", ""]], //salt_pepper
  ["Periodic horizontal noise", ["", "", ""]], //horizontal_noise
  ["Periodic vertical noise", ["", "", ""]], // vertical_noise
  ["FFT power spectrum", ["", "", ""]], //fft_power
  ["FFT magnitude spectrum", ["", "", ""]], //fft_magnitude
  ["Denoise in FT", ["", "", ""]], //denoise
]);
let InputStackMap = new Map<string, number[][] | number[]>([
  ["No transformation", []],
  ["To BRG", []], //to_bgr
  ["To HSV", []], // to_hsv
  ["To HSL", []], // to_hsl
  ["To GRAY", []], //to_gray
  ["Edge detection", [[0, 20, 1, 5]]], //sobel_edge
  ["Linear sampling", [[0, 100, 1, 10]]], //linear_sampling
  ["Nearest Neighbour sampling", [[0, 100, 1, 10]]], //nn_sampling
  ["Color quantization", [[0, 30, 1, 8]]], //uniform_quantization
  ["Gaussian noise", []], //gauss_noise
  ["Image inversion", []], //inverse
  ["Power law transformation", [[0, 2, 0.1, 1]]], //power_law
  [
    "Cartoonification",
    [
      [0, 20, 1, 5],
      [0, 30, 1, 8],
      [0, 1, 0.1, 0.5],
    ],
  ], //cartoon
  ["Salt&Pepper noise", [[0, 200, 1, 40]]], //salt_pepper
  ["Median filter", [[0, 10, 1, 3]]], //median_filter
  ["Periodic horizontal noise", []], //horizontal_noise
  ["Periodic vertical noise", []], // vertical_noise
  ["FFT power spectrum", []], //fft_power
  ["FFT magnitude spectrum", []], //fft_magnitude
  ["Denoise in FT", []], //denoise
]);
const transformations = Array.from(SlidersTitlesMap.keys());
function isString(value: unknown): value is string {
  return typeof value === "string";
}

interface Props {
  onFirstChange: (int: number) => void;
  onSecondChange: (int: number) => void;
  onThirdChange: (int: number) => void;
  onTransformationTypeChange: (str: string) => void;
  onDisplayMain: () => void;
  onTransformCurrent: () => void;
  GoBackOneStep: () => void;
  handleUserImageInput: () => void;
  currentTransformation: string;
  transformationChange: boolean;
  setTransformationChange: (b: boolean) => void;
}

const LeftPanel = ({
  onFirstChange,
  onSecondChange,
  onThirdChange,
  onTransformationTypeChange,
  onDisplayMain,
  onTransformCurrent,
  GoBackOneStep,
  handleUserImageInput,
  currentTransformation,
  transformationChange,
  setTransformationChange,
}: Props) => {
  const [leftPanelText, setLeftPanelText] = useState<string | undefined>(
    TextMap.get(currentTransformation)
  );

  return (
    <Box className="sidebar">
      <Stack spacing={1}>
        <Item
          sx={{
            height: "auto",
          }}
        >
          <TransformationsMenu
            menuItems={transformations}
            onItemClick={(item: string) => {
              setLeftPanelText(TextMap.get(item));
              onTransformationTypeChange(item);
              setTransformationChange(true);
            }}
          />
        </Item>
        <Item
          sx={{
            height: "6vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack sx={{ alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontWeight: "bold", fontSize: "1.5vh" }}>
              Currently selected transformation :
            </span>
            <span style={{ textDecoration: "underline", fontSize: "1.5vh" }}>
              {currentTransformation}
            </span>
          </Stack>
        </Item>
        <Box
          sx={{
            width: "100%",
            height: "27vh",
          }}
        >
          <FillItem>
            <span style={{ fontSize: "1.5vh" }}>{leftPanelText}</span>
          </FillItem>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "30vh",
          }}
        >
          {isString(currentTransformation) ? (
            <FillItem>
              <InputStack
                sliders={InputStackMap.get(currentTransformation) as number[][]}
                onFirstChange={onFirstChange}
                onSecondChange={onSecondChange}
                onThirdChange={onThirdChange}
                titles={SlidersTitlesMap.get(currentTransformation) as string[]}
                transformationChange={transformationChange}
                setTransformationChange={setTransformationChange}
              />
            </FillItem>
          ) : (
            <Item></Item>
          )}
        </Box>
        <Box
          sx={{
            height: "15vh",
            width: "100%",
          }}
        >
          <Item>
            <Stack spacing={1}>
              <Button
                style={{ maxHeight: "4vh", minWidth: "30px", minHeight: "4vh" }}
                onClick={onTransformCurrent}
                color={"success"}
                sx={{ boxShadow: 8 }}
                variant="contained"
              >
                <span style={{ fontSize: "1.5vh" }}>
                  Transform the current image
                </span>
              </Button>
              <Button
                style={{ maxHeight: "4vh", minWidth: "30px", minHeight: "4vh" }}
                onClick={GoBackOneStep}
                color={"warning"}
                sx={{ boxShadow: 8 }}
                variant="contained"
              >
                <span style={{ fontSize: "1.5vh" }}>
                  Revert to the last image
                </span>
              </Button>
              <Button
                style={{ maxHeight: "4vh", minWidth: "30px", minHeight: "4vh" }}
                onClick={onDisplayMain}
                color={"primary"}
                sx={{ boxShadow: 8 }}
                variant="contained"
              >
                <span style={{ fontSize: "1.5vh" }}>
                  Display the main image
                </span>
              </Button>
            </Stack>
          </Item>
        </Box>
        <Box sx={{ width: "100%", height: "5vh" }}>
          <Item>
            <Button
              endIcon={
                <Tooltip title="All uploads will be resized into a 1080x720 format.">
                  <HelpOutlineIcon />
                </Tooltip>
              }
              variant="outlined"
              onClick={handleUserImageInput}
            >
              <span style={{ fontSize: "1.5vh" }}> Upload a new image!</span>
            </Button>
          </Item>
        </Box>
      </Stack>
    </Box>
  );
};

export default LeftPanel;
