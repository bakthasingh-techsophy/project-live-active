import { Button, useTheme } from "@mui/material";
import Banner from "../../components/Banner";

interface LandingPageBannerProps {
  backgroundImage: string;
}

const staticStyles = {
  container: {},
  typography: {},
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
};
const LandingPageBanner = ({ backgroundImage }: LandingPageBannerProps) => {
  const theme = useTheme();

  return (
    <Banner
      backgroundImage={backgroundImage}
      heading={
        <>
          <span
            style={{ fontWeight: 900, color: theme?.palette?.primary?.main }}
          >
            Get Active Now
          </span>
          <br />
          and join exciting <br />
          <span
            style={{ fontWeight: 900, color: theme?.palette?.primary?.main }}
          >
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
            sx={staticStyles?.button?.buttonOne}
          >
            Explore Now
          </Button>
          <Button variant="outlined" sx={staticStyles?.button?.buttonTwo}>
            Get Started
          </Button>
        </>
      }
    />
  );
};

export default LandingPageBanner;
