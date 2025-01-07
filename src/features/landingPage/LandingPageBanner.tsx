import { Button, useTheme } from "@mui/material";
import { backgroundPic2 } from "@assets/index";
import Banner from "./Banner";

const LandingPageBanner = () => {
  //   const handleExploreClick = () => {
  //     console.log("Explore Now clicked!");
  //   };

  //   const handleGetStartedClick = () => {
  //     console.log("Get Started clicked!");
  //   };
  const theme = useTheme();

  return (
    <Banner
      backgroundImage={backgroundPic2}
      heading={
        <>
          <span style={{ fontWeight: 900, color: theme.palette.primary.main }}>
            Get Active Now
          </span>
          <br />
          and join exciting <br />
          <span style={{ fontWeight: 900, color: theme.palette.primary.main }}>
            Live Fitness Events
          </span>{" "}
          with expert guidance!
        </>
      }
      tagline="Discover engaging fitness, wellness, and yoga sessions online, with expert instructors to guide you every step of the way."
      actionButtons={
        <>
          <Button
            variant="contained"
            color="primary"
            sx={{
              padding: "12px 24px",
              fontWeight: "bold",
              borderRadius: "8px",
              textTransform: "none",
              whiteSpace: "nowrap",
              "&:hover": {
                background: theme.palette.primary.main,
              },
            }}
            // onClick={handleExploreClick}
          >
            Explore Now
          </Button>
          <Button
            variant="outlined"
            sx={{
              padding: "12px 24px",
              fontWeight: "bold",
              borderRadius: "8px",
              textTransform: "none",
              whiteSpace: "nowrap",
              color: "primary.contrastText",
              border: `1px solid ${theme.palette.primary.contrastText}`,
              "&:hover": {
                background: "transparent",
              },
            }}
            // onClick={handleGetStartedClick}
          >
            Get Started
          </Button>
        </>
      }
    />
  );
};

export default LandingPageBanner;
