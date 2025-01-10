import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button, useTheme } from "@mui/material";
import Banner from "../../components/Banner";

interface ServiceBanner2Props {
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
    personalizeButton: (theme: any) => ({
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
    personalizeButton: {
      fontSize: {
        xs: "0.9rem",
        sm: "1rem",
      },
    },
  },
};

const ServiceBanner2 = ({ backgroundImage }: ServiceBanner2Props) => {
  const theme = useTheme();

  return (
    <Banner
      backgroundImage={backgroundImage}
      heading={
        <>
          <span style={staticStyles?.typography?.header(theme)}>
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
            sx={[
              staticStyles?.button?.personalizeButton(theme),
              dynamicStyles?.button?.personalizeButton,
            ]}
            endIcon={<ChevronRightIcon />}
          >
            Personalize Now
          </Button>
        </>
      }
    />
  );
};

export default ServiceBanner2;
