import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface BannerProps {
  backgroundImage: string;
  heading: React.ReactNode;
  tagline: React.ReactNode;
  actionButtons: React.ReactNode;
}

const staticStyles = (theme: any, backgroundImage: any) => ({
  container: {
    mainContainer: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      height: "100vh",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      padding: "0 16px",
      color: theme?.palette?.text?.primary,
      position: "relative",
      overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    headerContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      justifyContent: "center",
      gap: 3,
      position: "relative",
      zIndex: 1,
    },
    actionButtonsContainer: {
      display: "flex",
      gap: 2,
      alignItems: "center",
      width: "100%",
    },
  },
  typography: {
    heading: {
      fontWeight: 800,
      color: "#fff",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
      marginBottom: 2,
      lineHeight: 1.2,
    },
    tagline: {
      fontWeight: 500,
      color: "#fff",
      marginBottom: 3,
      lineHeight: 1.5,
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
    },
  },
  button: {},
});

const dynamicStyles = {
  container: {
    mainContainer: {
      textAlign: {
        xs: "center",
        sm: "left",
      },
      overlay: {
        background: {
          lg: "linear-gradient(90deg, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 0.23) 28%, rgba(18, 18, 18, 0) 40%)",
          md: "linear-gradient(90deg, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 0.23) 28%, rgba(18, 18, 18, 0) 40%)",
          sm: "#1212122f",
        },
      },
    },
    headerContainer: {
      flex: {
        lg: 0.4,
        md: 0.6,
        sm: 1,
        xs: 1,
      },
      p: {
        lg: 8,
        md: 8,
        sm: 4,
        xs: 0,
      },
      textAlign: {
        lg: "left",
        md: "left",
        sm: "center",
      },
    },
    actionButtonsContainer: {
      justifyContent: {
        lg: "start",
        md: "start",
        sm: "center",
        xs: "center",
      },
    },
  },
  typography: {
    heading: {
      fontSize: {
        xs: "1.9rem",
        lg: "4rem",
        md: "3rem",
        sm: "3.5rem",
      },
    },
    tagline: {
      fontSize: {
        xs: "0.9rem",
        sm: "1.2rem",
      },
    },
  },
  button: {},
};

const Banner = ({
  backgroundImage,
  heading,
  tagline,
  actionButtons,
}: BannerProps) => {
  const theme = useTheme();
  const customStaticStyles = staticStyles(theme, backgroundImage);
  return (
    <Box
      sx={[
        customStaticStyles?.container?.mainContainer,
        dynamicStyles?.container?.mainContainer,
      ]}
    >
      {/* Overlay for better text visibility */}
      <Box
        sx={[
          customStaticStyles?.container?.mainContainer?.overlay,
          dynamicStyles?.container?.mainContainer?.overlay,
        ]}
      />

      <Box
        sx={[
          customStaticStyles?.container?.headerContainer,
          dynamicStyles?.container?.headerContainer,
        ]}
      >
        {/* Big Heading */}
        <Typography
          variant="h2"
          sx={[
            customStaticStyles?.typography?.heading,
            dynamicStyles?.typography?.heading,
          ]}
        >
          {heading}
        </Typography>

        {/* Tagline */}
        <Typography
          variant="h6"
          sx={[
            customStaticStyles?.typography?.tagline,
            dynamicStyles?.typography?.tagline,
          ]}
        >
          {tagline}
        </Typography>

        {/* Action Buttons */}
        <Box
          sx={[
            customStaticStyles?.container?.actionButtonsContainer,
            dynamicStyles?.container?.actionButtonsContainer,
          ]}
        >
          {actionButtons}
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
