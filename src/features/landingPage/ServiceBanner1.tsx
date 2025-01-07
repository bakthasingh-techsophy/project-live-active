import { servicePic1 } from "@assets/index";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button, useTheme } from "@mui/material";
import Banner from "./Banner";
const ServiceBanner1 = () => {
  const theme = useTheme();

  return (
    <Banner
      backgroundImage={servicePic1}
      heading={
        <>
          <span style={{ fontWeight: 900, color: theme.palette.primary.main }}>
            Join Live Yoga
          </span>
          <br />
          Find balance with expert guidance
        </>
      }
      tagline="Experience live yoga classes designed to help you find balance, flexibility, and strength with expert instructors."
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
              background: theme.palette.secondary.main,
              "&:hover": {
                background: theme.palette.secondary.dark,
              },
              fontSize: {
                xs: "0.9rem",
                sm: "1rem",
              },
            }}
            endIcon={<ChevronRightIcon />}
            // onClick={handleExploreClick}
          >
            Join Live
          </Button>
          {/* <Button
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
          </Button> */}
        </>
      }
    />
  );
};

export default ServiceBanner1;
