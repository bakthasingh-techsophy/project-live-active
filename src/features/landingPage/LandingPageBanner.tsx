import { exerciseVideo3, onlineExercise, yogaVideo } from "@assets/index";
import {
  Box,
  Button,
  CssThemeVariables,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  AppRouteQueries,
  AppRoutes,
  AppRoutesCombination,
} from "@utils/AppRoutes";
import { isTokenExpired } from "@utils/tokenUtils";
import { useNavigate } from "react-router-dom";

const staticStyles = {
  container: {
    mainContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "90vh",
      position: "relative",
      textAlign: "center",
      overflow: "hidden",
    },
    videoContainer: {
      display: "flex",
      width: "100%",
      height: "100%",
      overflow: "hidden",
    },
    headerContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      justifyContent: "center",
      gap: 3,
      position: "absolute",
      zIndex: 1,
    },
    actionButtonsContainer: {
      display: "flex",
      gap: 2,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.65)",
    },
  },
  typography: {
    heading: {
      fontWeight: 700,
      color: "#fff",
      textShadow: "2px 2px 3px rgba(0, 0, 0, 0.8)",
      marginBottom: 2,
      lineHeight: 1.2,
      textAlign: "center",
    },
    tagline: {
      textAlign: "center",
      width: "100%",
      fontWeight: 500,
      color: "#fff",
      marginBottom: 3,
      lineHeight: 1.5,
      // textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
    },
  },
  button: {
    buttonOne: (theme: any) => ({
      padding: "12px 24px",
      fontWeight: "bold",
      borderRadius: "8px",
      textTransform: "none",
      whiteSpace: "nowrap",
      background: theme?.palette?.secondary?.main,
      "&:hover": {
        background: theme?.palette?.secondary?.dark,
      },
    }),
    buttonTwo: (theme: any) => ({
      padding: "12px 24px",
      fontWeight: "bold",
      borderRadius: "8px",
      textTransform: "none",
      whiteSpace: "nowrap",
      color: "primary.contrastText",
      border: `1px solid ${theme?.palette?.primary?.contrastText}`,
      "&:hover": {
        background: "transparent",
      },
    }),
  },
  videoStyle: {
    objectFit: "cover",
    height: "100%",
    // filter: "grayscale(100%)",
  } as CssThemeVariables,
};

const dynamicStyles = {
  container: {
    headerContainer: {
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
  videoStyle: (isSmallScreen: boolean, isMediumScreen: boolean) =>
    ({
      width: isSmallScreen ? "100%" : isMediumScreen ? "50%" : "34%",
    }) as CssThemeVariables,
};

const LandingPageBanner = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isTokenActive = !isTokenExpired();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  // const videoStyle = {
  //   objectFit: "cover",
  //   height: "100%",
  //   width: isSmallScreen ? "100%" : isMediumScreen ? "50%" : "34%",
  //   filter: "grayscale(100%)",
  // } as CssThemeVariables;

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  return (
    <Box sx={staticStyles?.container?.mainContainer}>
      <Box sx={staticStyles?.container?.videoContainer}>
        <video
          src={exerciseVideo3}
          autoPlay
          loop
          muted
          style={{
            ...staticStyles.videoStyle,
            ...dynamicStyles.videoStyle(isSmallScreen, isMediumScreen),
          }}
        />
        <video
          src={yogaVideo}
          autoPlay
          loop
          muted
          style={{
            ...staticStyles.videoStyle,
            ...dynamicStyles.videoStyle(isSmallScreen, isMediumScreen),
          }}
        />
        <video
          src={onlineExercise}
          autoPlay
          loop
          muted
          style={{
            ...staticStyles.videoStyle,
            ...dynamicStyles.videoStyle(isSmallScreen, isMediumScreen),
          }}
        />
        <Box sx={staticStyles?.container?.overlay} />
      </Box>
      <Box
        sx={[
          staticStyles?.container?.headerContainer,
          dynamicStyles?.container?.headerContainer,
        ]}
      >
        <Typography
          variant="h2"
          sx={[
            staticStyles?.typography?.heading,
            dynamicStyles?.typography?.heading,
          ]}
        >
          <>
            <span
              style={{
                fontWeight: 700,
                color: theme?.palette?.primary?.main,
              }}
            >
              Get Active Now
            </span>{" "}
            and join exciting <br />
            <span
              style={{
                fontWeight: 700,
                color: theme?.palette?.primary?.main,
              }}
            >
              Live Fitness Events
            </span>{" "}
            with expert guidance!
          </>
        </Typography>

        <Typography
          variant="h6"
          sx={[
            staticStyles?.typography?.tagline,
            dynamicStyles?.typography?.tagline,
          ]}
        >
          Discover engaging fitness, wellness, and yoga sessions online, with
          expert instructors to guide you every step of the way.
        </Typography>

        <Box sx={[staticStyles?.container?.actionButtonsContainer]}>
          <>
            <Button
              variant="contained"
              color="primary"
              sx={staticStyles?.button?.buttonOne}
              onClick={() =>
                isTokenActive
                  ? handleNavigation(
                      AppRoutesCombination?.DASHBOARD_EXPLORE_EVENTS
                    )
                  : handleNavigation(AppRoutes?.BROWSE_EVENTS)
              }
            >
              Explore Now
            </Button>
            <Button
              variant="outlined"
              sx={staticStyles?.button?.buttonTwo}
              onClick={() =>
                isTokenActive
                  ? handleNavigation(AppRoutes?.WELLNESS)
                  : handleNavigation(AppRouteQueries?.AUTH_LOGIN)
              }
            >
              Get Started
            </Button>
          </>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPageBanner;
