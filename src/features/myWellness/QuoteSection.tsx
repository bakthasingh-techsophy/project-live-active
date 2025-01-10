import { Box, Container, CssThemeVariables, Typography } from "@mui/material";
import React from "react";
import { myWellnessVideo as MyWellnessVideo } from "@assets/index";
import VideoBackground from "@components/VideoBackground";

const staticStyles = {
  container: {
    wrapper: { py: 12 },
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
      position: "relative",
      zIndex: 2,
    },
    videoContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 1,
      overflow: "hidden",
    },
    video: {
      objectFit: "cover",
      objectPosition: "top",
      width: "100%",
      height: "100%",
    } as CssThemeVariables,
    videoOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 51, 0, 0.5)",
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
  },
  typography: {
    h1: {
      width: {
        xs: "90%",
        sm: "90%",
        md: "70%",
        lg: "70%",
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

const QuoteSection: React.FC = () => {
  return (
    <Box sx={staticStyles?.container?.wrapper}>
      <Container
        sx={[
          staticStyles?.container?.mainContainer,
          dynamicStyles?.container?.mainContainer,
        ]}
        maxWidth={false}
      >
        <VideoBackground src={MyWellnessVideo} />
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
            Taking care of yourself is part of taking care of the world.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default QuoteSection;
