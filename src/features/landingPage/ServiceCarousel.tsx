import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ServiceBanner1 from "./ServiceBanner1";
import ServiceBanner2 from "./ServiceBanner2";
import ServiceBanner3 from "./ServiceBanner3";
import ServiceBanner4 from "./ServiceBanner4";
import {
  servicePic1,
  servicePic2,
  servicePic3,
  servicePic4,
} from "@assets/index";

const styles = {
  container: (theme: any) => ({
    backgroundColor: theme?.palette?.background?.paper,
  }),
};

const ServiceCarousel = () => {
  const theme = useTheme();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    draggable: true,
    arrows: false,
    pauseOnHover: false,
  };

  const serviceComponents = [
    <ServiceBanner1 backgroundImage={servicePic1} />,
    <ServiceBanner2 backgroundImage={servicePic2} />,
    <ServiceBanner3 backgroundImage={servicePic3} />,
    <ServiceBanner4 backgroundImage={servicePic4} />,
  ];

  return (
    <Box sx={styles.container(theme)}>
      <Slider {...settings}>
        {serviceComponents?.map((service, index) => (
          <Box key={index}>{service}</Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ServiceCarousel;
