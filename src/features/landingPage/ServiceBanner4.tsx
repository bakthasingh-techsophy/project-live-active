import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button, useTheme } from "@mui/material";
import Banner from "../../components/Banner";

interface ServiceBanner4Props {
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
    optimizeButton: (theme: any) => ({
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
    optimizeButton: {
      fontSize: {
        xs: "0.9rem",
        sm: "1rem",
      },
    },
  },
};
const ServiceBanner4 = ({ backgroundImage }: ServiceBanner4Props) => {
  const theme = useTheme();

  return (
    <Banner
      backgroundImage={backgroundImage}
      heading={
        <>
          <span style={staticStyles?.typography?.header(theme)}>
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
            sx={[
              staticStyles?.button?.optimizeButton(theme),
              dynamicStyles?.button?.optimizeButton,
            ]}
            endIcon={<ChevronRightIcon />}
          >
            Optimize
          </Button>
        </>
      }
    />
  );
};

export default ServiceBanner4;
