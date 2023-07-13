import { Box } from "@mui/material";
import React from "react";
import { positions } from "@mui/system";
import { spacing } from "@mui/system";
import ImageBox from "./ImageBox";
import AlertFields from "./AlertFields";
import { SettingsAccessibility } from "@mui/icons-material";
interface Props {
  imageString: string;
  loading: boolean;
  showingAlert: boolean;
  setAlertShowing: (bool: boolean) => void;
  alertMessage: string;
}
const RightPanel = ({
  imageString,
  loading,
  showingAlert,
  setAlertShowing,
  alertMessage,
}: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        ml: "25vw",
      }}
    >
      <AlertFields
        showing={showingAlert}
        setShowing={setAlertShowing}
        message={alertMessage}
      />
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: "100",
        }}
      >
        {
          <>
            <ImageBox imageString={imageString} loading={loading} />
          </>
        }
      </Box>
    </Box>
  );
};

export default RightPanel;
