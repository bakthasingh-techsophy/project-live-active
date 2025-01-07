import { servicePic4 } from "@assets/index";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button, useTheme } from "@mui/material";
import Banner from "./Banner";

const ServiceBanner4 = () => {
  const theme = useTheme();

  return (
    <Banner
      backgroundImage={servicePic4}
      heading={
        <>
          <span style={{ fontWeight: 900, color: theme.palette.primary.main }}>
            Optimize Your Nutrition
          </span>
          <br />
          With personalized coaching and tips!
        </>
      }
      tagline="Achieve your fitness goals with tailored nutrition plans and expert coaching to fuel your success."
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
              fontSize: {
                xs: "0.9rem",
                sm: "1rem",
              },
            }}
            endIcon={<ChevronRightIcon />}
            // onClick={handleExploreClick}
          >
            I want food
          </Button>
        </>
      }
    />
  );
};

export default ServiceBanner4;
