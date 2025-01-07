import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Slider from "react-slick"; // Carousel component
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css"; // Slick carousel styles
import ServiceBanner1 from "./ServiceBanner1";
import ServiceBanner2 from "./ServiceBanner2";
import ServiceBanner3 from "./ServiceBanner3";
import ServiceBanner4 from "./ServiceBanner4";

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
    draggable: true, // Enables dragging to navigate
    arrows: false, // Optional: hide navigation arrows
  };

  // const services = [
  //   {
  //     title: "Live Yoga Class",
  //     description:
  //       "Join our live yoga sessions from anywhere, guided by certified instructors.",
  //     buttonText: "Join Live Yoga Class",
  //     imageUrl: servicePic1,
  //   },
  //   {
  //     title: "Personalized Training",
  //     description:
  //       "Get a fitness plan tailored to your needs and goals, with constant support.",
  //     buttonText: "Get Personalized Plan",
  //     imageUrl: servicePic2,
  //   },
  //   {
  //     title: "Nutritional Guidance",
  //     description:
  //       "Receive expert nutritional advice to fuel your fitness journey and wellness.",
  //     buttonText: "Book a Consultation",
  //     imageUrl: servicePic3,
  //   },
  // ];

  const serviceComponents = [
    <ServiceBanner1 />,
    <ServiceBanner2 />,
    <ServiceBanner3 />,
    <ServiceBanner4 />,
  ];

  return (
    <Box
      sx={{
        // padding: { xs: "2rem 1rem", sm: "3rem" },
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {/* <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "2rem", sm: "2.5rem" },
          color: theme.palette.text.primary,
          textAlign: "center",
          marginBottom: 4,
        }}
      >
        Explore Our{" "}
        <span style={{ color: theme.palette.primary.main }}>
          Tailored Services
        </span>
      </Typography> */}

      <Slider {...settings}>
        {serviceComponents.map(
          (service, index) => (
            <Box key={index}>{service}</Box>
          )
          // <Box
          //   key={index}
          //   sx={{
          //     display: "flex",
          //     justifyContent: "start",
          //     alignItems: "center",
          //     flexDirection: { xs: "column-reverse", sm: "row" },
          //     // gap: 4,
          //     border: "1px solid red",
          //     position: "relative",
          //   }}
          // >
          //   <Box
          //     sx={{
          //       position: "absolute", // Overlay on top of the background
          //       top: 0,
          //       left: 0,
          //       right: 0,
          //       bottom: 0,
          //       background: {
          //         lg: "linear-gradient(90deg, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 0.23) 28%, rgba(18, 18, 18, 0) 40%)",
          //         md: "linear-gradient(90deg, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 0.23) 28%, rgba(18, 18, 18, 0) 40%)",
          //         sm: "#1212122f",
          //       }, // Dark overlay to improve text visibility
          //     }}
          //   />
          //   {/* Left side (Image) */}
          //   <Box
          //     sx={{
          //       width: { xs: "100%", sm: "100%" },
          //       height: { xs: "200px", sm: "100vh" },
          //       background: `url(${service.imageUrl})`,
          //       backgroundSize: "cover",
          //       backgroundPosition: "center",
          //       // borderRadius: "12px",
          //       // boxShadow: 2,
          //     }}
          //   >
          //     <Box
          //       sx={{
          //         display: "flex",
          //         flexDirection: "column",
          //         justifyContent: "center",
          //         alignItems: "flex-start",
          //         width: { xs: "100%", sm: "50%" },
          //         gap: 2,
          //       }}
          //     >
          //       <Typography
          //         variant="h5"
          //         sx={{
          //           fontWeight: 700,
          //           fontSize: { xs: "1.5rem", sm: "2rem" },
          //           color: theme.palette.text.primary,
          //         }}
          //       >
          //         {service.title}
          //       </Typography>

          //       <Typography
          //         variant="body1"
          //         sx={{
          //           fontWeight: 400,
          //           fontSize: { xs: "1rem", sm: "1.1rem" },
          //           color: theme.palette.text.secondary,
          //           marginBottom: 2,
          //         }}
          //       >
          //         {service.description}
          //       </Typography>

          //       <Button
          //         variant="contained"
          //         color="primary"
          //         sx={{
          //           padding: "10px 20px",
          //           fontWeight: "bold",
          //           borderRadius: "8px",
          //           textTransform: "none",
          //           whiteSpace: "nowrap",
          //           "&:hover": {
          //             backgroundColor: theme.palette.primary.dark,
          //           },
          //         }}
          //       >
          //         {service.buttonText}
          //       </Button>
          //     </Box>
          //   </Box>
          // </Box>
        )}
      </Slider>
    </Box>
  );
};

export default ServiceCarousel;
