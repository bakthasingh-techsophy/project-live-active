import { coachVideo, exerciseVideo, nutritionVideo } from "@assets/index";
import VideoBackground from "@components/VideoBackground";
import { Box, Container, CssThemeVariables, Typography } from "@mui/material";
import React from "react";

const staticStyles = {
  container: {
    mainContainer: {
      paddingTop: 4,
      paddingBottom: 4,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
      minHeight: "90vh",
    },
    headerContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      position: "absolute",
      zIndex: 2,
    },
    videoContainerTemp: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 1,
      overflow: "hidden",
    },
    videoOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(33, 0, 39, 0.6)",
      zIndex: 2,
    },
  },
  typography: {
    h1: {
      fontWeight: "bold",
      textAlign: "center",
      color: "#fff",
    },
  },
};

const dynamicStyles = {
  container: {
    mainContainer: {},
    headerContainer: {
      marginBottom: { xs: 2, sm: 0 },
      py: { xs: 4, sm: 4, md: 6, lg: 8 },
    },
    videoCustomWidth: {
      width: { xs: "50%", sm: "50%", md: "38.33%", lg: "33.33%" },
      transition: "all 0.3s",
    },
  },
  typography: {
    h1: {
      width: {
        xs: "90%",
        sm: "90%",
        md: "70%",
        lg: "100%",
      },
      fontSize: {
        xs: "1.5rem",
        sm: "1.5rem",
        md: "2rem",
        lg: "2.5rem",
      },
    },
  },
};

const HeaderSection: React.FC = () => {
  return (
    <Container
      sx={[
        staticStyles?.container?.mainContainer,
        dynamicStyles?.container?.mainContainer,
      ]}
      maxWidth={false}
    >
      <Box sx={staticStyles?.container?.videoContainerTemp}>
        <VideoBackground src={coachVideo} />

        <VideoBackground
          src={nutritionVideo}
          containerStyles={dynamicStyles?.container?.videoCustomWidth}
        />
      </Box>
      <Box sx={staticStyles?.container?.videoOverlay} />

      <Box
        sx={[
          staticStyles?.container?.headerContainer,
          dynamicStyles?.container?.headerContainer,
        ]}
      >
        <Typography
          variant="h5"
          sx={[staticStyles?.typography?.h1, dynamicStyles?.typography?.h1]}
        >
          Achieve Your Best Self with Every Step and Bite
        </Typography>
      </Box>
    </Container>
  );
};

export default HeaderSection;
