import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button, useTheme } from "@mui/material";
import Banner from "../../components/Banner";

interface ServiceBanner1Props {
  backgroundImage: string;
}

const staticStyles = {
  container: {},
  typography: {
    header: (theme: any) => ({
      fontWeight: 900,
      color: theme?.palette?.primary?.main,
    }),
  },
  button: {
    joinButton: (theme: any) => ({
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
  },
};
const dynamicStyles = {
  container: {},
  typography: {},
  button: {
    joinButton: {
      fontSize: {
        xs: "0.9rem",
        sm: "1rem",
      },
    },
  },
};

const ServiceBanner1 = ({ backgroundImage }: ServiceBanner1Props) => {
  const theme = useTheme();

  return (
    <Banner
      backgroundImage={backgroundImage}
      heading={
        <>
          <span style={staticStyles?.typography?.header(theme)}>
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
            sx={[
              staticStyles?.button?.joinButton(theme),
              dynamicStyles?.button?.joinButton,
            ]}
            endIcon={<ChevronRightIcon />}
          >
            Join Live
          </Button>
        </>
      }
    />
  );
};

export default ServiceBanner1;
