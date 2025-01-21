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

export const staticStyles = {
  container: {},
  typography: {
    header: (theme: any) => ({
      fontWeight: 700,
      color: theme?.palette?.primary?.main,
    }),
  },
  buttons: {
    button: (theme: any) => ({
      padding: "12px 24px",
      fontWeight: "bold",
      borderRadius: "8px",
      textTransform: "none",
      whiteSpace: "nowrap",
      background: theme?.palette?.secondary?.main,
      "&:hover": {
        background: theme?.palette?.secondary?.dark,
      },
      "&.Mui-disabled": {
        background: "rgb(255, 255, 255,0.5)",
        color:'#555',
        "&:hover": {
          background: "red",
        },
      },
    }),
  },
};
export const dynamicStyles = {
  container: {},
  typography: {},
  buttons: {
    button: {
      fontSize: {
        xs: "0.9rem",
        sm: "1rem",
      },
    },
  },
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
