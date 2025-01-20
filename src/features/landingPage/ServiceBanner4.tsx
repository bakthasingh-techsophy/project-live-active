import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button, useTheme } from "@mui/material";
import Banner from "../../components/Banner";
import { staticStyles, dynamicStyles } from "./ServiceCarousel";

interface ServiceBanner4Props {
  backgroundImage: string;
}

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
              staticStyles?.buttons?.button(theme),
              dynamicStyles?.buttons?.button,
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
