import { servicePic3 } from "@assets/index";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button, useTheme } from "@mui/material";
import Banner from "./Banner";

const ServiceBanner3 = () => {
  const theme = useTheme();

  return (
    <Banner
      backgroundImage={servicePic3}
      heading={
        <>
          <span style={{ fontWeight: 900, color: theme.palette.primary.main }}>
            Join Group Classes
          </span>
          <br />
          For fun and motivation together!
        </>
      }
      tagline="Stay motivated and enjoy a fun workout experience with live group classes led by expert trainers."
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
            Join Now
          </Button>
        </>
      }
    />
  );
};

export default ServiceBanner3;
