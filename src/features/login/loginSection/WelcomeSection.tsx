import { Box, Typography } from "@mui/material";
import { HOME_CONSTANTS } from "../LoginConstants";
import { defaultLogo } from "@assets/index";

const styles = {
  container: {
    welcomeContainer: {
      width: "100%",
      // height: "100%",
      background: `radial-gradient(circle, #557fc2 20%, #183F7C 100%)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 2,
      transition:
        "filter 0.2s ease-in-out, background-position 0.5s ease-in-out",
      padding: "4rem",
      "@media (max-width: 840px)": {
        padding: "0rem",
        height: "500px",
        flexDirection: "column",
      },
    },
    textContainer: {
      zIndex: 99,
      gap: 2,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "@media (max-width: 1140px)": {
        flexDirection: "column",
      },
      height: "100%",
    },
  },
  typography: {
    loginHeader: {
      color: "#fff",
      fontSize: "1.5rem",
      textAlign: "left",
      whiteSpace: "nowrap",
      "@media (max-width: 840px)": {
        fontSize: "1.2rem",
        textAlign: "center",
      },
    },
  },
  icons: {
    welcomeLogo: {
      width: "20rem",
      maxWidth: "80%",
      transition: "width 0.1s ease-in-out",
      "@media (max-width: 1240px)": {
        width: "15rem",
      },
    },
  },
};

const WelcomeSection = () => {
  return (
    <Box sx={styles?.container?.welcomeContainer}>
      <Box sx={styles?.container?.textContainer}>
        <Box
          component="img"
          src={defaultLogo}
          alt="Vision Sure Logo"
          sx={styles?.icons?.welcomeLogo}
        />
        <Typography variant="h4" sx={styles?.typography?.loginHeader}>
          {HOME_CONSTANTS?.LOGGED_WELCOME_MESSAGE}
        </Typography>
      </Box>
    </Box>
  );
};

export default WelcomeSection;
