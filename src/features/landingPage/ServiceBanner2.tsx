import { servicePic2 } from "@assets/index";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button, useTheme } from "@mui/material";
import Banner from "./Banner";

const ServiceBanner2 = () => {
  const theme = useTheme();

  return (
    <Banner
      backgroundImage={servicePic2}
      heading={
        <>
          <span style={{ fontWeight: 900, color: theme.palette.primary.main }}>
            Tailored Workouts
          </span>
          <br />
          For your unique fitness goals!
        </>
      }
      tagline="Achieve your fitness goals with personalized workout plans crafted just for you, guided by expert trainers."
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
            Personalize Now
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

export default ServiceBanner2;
