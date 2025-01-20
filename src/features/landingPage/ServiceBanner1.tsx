import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button, useTheme } from "@mui/material";
import Banner from "../../components/Banner";
import { staticStyles, dynamicStyles } from "./ServiceCarousel";

interface ServiceBanner1Props {
  backgroundImage: string;
}


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
              staticStyles?.buttons?.button(theme),
              dynamicStyles?.buttons?.button,
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
