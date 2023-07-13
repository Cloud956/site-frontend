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
    "Displays the shapes in the image, aqcuired using the manual Sobel Edge Detection.\
  You can select an integer below, which is used in the code to make the edge \
  detection stronger/weaker. Recommended number is 5.",
  ],
  [
    "Linear sampling",
    "Samples the image resizing it to 1/X of its original size. Resizes it back to its original size using the linear \
    sampling rezising method! Input the sampling factor(X), which will determine \
    the size of the sampled image below!",
  ],
  [
    "Nearest Neighbour sampling",
    "Samples the image resizing it to 1/X of its original size. Resizes it back to its original size using the nearest neighbour \
  rezising method! Input the sampling factor(X), which will determine \
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
  After that all of the pixel values will be powered to X, which you can input below. Feel free to experiment with different values of X.",
  ],
  [
    "Cartoonification",
    "Cartoonifies the image using the edge detection and color quantization. \
  Detects the edges in the image and applies an outline around them, while reducing the number of colors in the image to give it a cartoon-like look.\
  Please select below numerical factors for the edge detection strength, number of colors(X) and edge outline strength. Due to the nature of the algorithm, on grayscale images it will reduce the number of colors to X, while on colored\
  images it will reduce it to X*X*X. ",
  ],
  [
    "Vertical and horizontal translation",
    "Applies a vertical and horizontal translation, essentially moving the image to the sides. Will cut out part of the image in the process. \
  Please select below the number of pixels for the horizontal and vertical translation.",
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

let InputStackMap = new Map<string, string[]>([
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
  ["Median filter", ["Kernel shape", "", ""]], //median_filter
  ["Periodic horizontal noise", ["", "", ""]], //horizontal_noise
  ["Periodic vertical noise", ["", "", ""]], // vertical_noise
  ["FFT power spectrum", ["", "", ""]], //fft_power
  ["FFT magnitude spectrum", ["", "", ""]], //fft_magnitude
  ["Denoise in FT", ["", "", ""]], //denoise
]);
const transformations = Array.from(InputStackMap.keys());
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
            height: "25vh",
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
            height: "15vh",
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
        <Box sx={{ width: "100%", height: "15vh" }}>
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
              Upload a new image!
            </Button>
          </Item>
        </Box>
      </Stack>
    </Box>
  );
};

export default LeftPanel;
