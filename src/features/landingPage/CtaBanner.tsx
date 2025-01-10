import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface CTABannerProps {
  backgroundImage: string;
}

const staticStyles = {
  container: {
    mainContainer: (backgroundImage: any) => ({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "70vh",
      textAlign: "center",
      color: "#fff",
      position: "relative",
    }),
    overlayContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0,0.6)",
    },
    contentContainer: { position: "relative", zIndex: 1, width: "100%" },
  },
  typography: {
    heading: {
      fontWeight: 600,
      color: "primary.contrastText",
      marginBottom: "1rem",
      lineHeight: 1.3,
      textShadow: "1px 0 black",
    },
    subHeading: {
      fontWeight: 400,
      lineHeight: 1.3,
      mb: 2,
    },
    content: {
      fontWeight: 400,
      color: "#fff",
      marginBottom: "2rem",
      lineHeight: 1.5,
    },
  },
  button: {
    startButton: (theme: any) => ({
      padding: "12px 24px",
      fontWeight: "bold",
      borderRadius: "8px",
      textTransform: "none",
      "&:hover": {
        backgroundColor: theme?.palette?.primary?.dark,
      },
    }),
  },
};
const dynamicStyles = {
  container: {
    mainContainer: {
      padding: { xs: "2rem 1rem", sm: "4rem 2rem", md: "5rem 4rem" },
    },
  },
  typography: {
    heading: {
      fontSize: {
        lg: "4.5rem",
        md: "4rem",
        sm: "3rem",
        xs: "1.7rem",
      },
    },
    subHeading: {
      fontSize: {
        lg: "2rem",
        md: "2rem",
        sm: "1.5rem",
        xs: "1.1rem",
      },
    },
    content: (isSmallScreen: any) => ({
      fontSize: isSmallScreen ? "1rem" : "1.2rem",
    }),
  },
  button: {
    startButton: (isSmallScreen: any) => ({
      fontSize: isSmallScreen ? "1rem" : "1.2rem",
    }),
  },
};

const CTABanner = ({ backgroundImage }: CTABannerProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme?.breakpoints?.down("sm"));

  return (
    <Box
      sx={[
        staticStyles?.container?.mainContainer(backgroundImage),
        dynamicStyles?.container?.mainContainer,
      ]}
    >
      {/* Overlay to make the text more visible */}
      <Box sx={staticStyles?.container?.overlayContainer} />

      {/* Content */}
      <Box sx={staticStyles?.container?.contentContainer}>
        <Typography
          variant={isSmallScreen ? "h5" : "h3"}
          sx={[
            staticStyles?.typography?.heading,
            dynamicStyles?.typography?.heading,
          ]}
        >
          Ready to Transform?
        </Typography>
        <Typography
          sx={[
            staticStyles?.typography?.subHeading,
            dynamicStyles?.typography?.subHeading,
          ]}
        >
          Join us today for a healthier lifestyle!
        </Typography>

        <Typography
          variant="h6"
          sx={[
            staticStyles?.typography?.content,
            dynamicStyles?.typography?.content(isSmallScreen),
          ]}
        >
          Start your fitness journey today and discover the best classes,
          personalized plans, and expert coaching.
        </Typography>

        {/* CTA Button */}
        <Button
          variant="contained"
          color="primary"
          sx={[
            staticStyles?.button?.startButton(theme),
            dynamicStyles?.button?.startButton(isSmallScreen),
          ]}
          onClick={() => {
            console.log("CTA Button Clicked!");
          }}
        >
          Get Started Now
        </Button>
      </Box>
    </Box>
  );
};

export default CTABanner;
