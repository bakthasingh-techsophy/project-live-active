import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button, useTheme } from "@mui/material";
import Banner from "../../components/Banner";
import { staticStyles, dynamicStyles } from "./ServiceCarousel";

interface ServiceBanner2Props {
  backgroundImage: string;
}

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
              staticStyles?.buttons?.button(theme),
              dynamicStyles?.buttons?.button,
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
