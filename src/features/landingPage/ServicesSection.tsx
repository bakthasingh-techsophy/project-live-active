import {
    servicePic1,
    servicePic2,
    servicePic3,
    servicePic4,
} from "@assets/index";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const services = [
  {
    title: "Live Yoga Classes",
    description:
      "Join our expert-led yoga sessions designed to improve flexibility and mindfulness.",
    imageUrl: servicePic1, // Replace with your image URL
  },
  {
    title: "Personalized Workouts",
    description:
      "Get tailored workout plans that cater to your fitness goals and lifestyle.",
    imageUrl: servicePic2, // Replace with your image URL
  },
  {
    title: "Group Fitness Events",
    description:
      "Engage in fun and motivating fitness events with people from around the world.",
    imageUrl: servicePic3, // Replace with your image URL
  },
  {
    title: "Nutrition Coaching",
    description:
      "Receive personalized nutritional guidance to fuel your fitness journey.",
    imageUrl: servicePic4, // Replace with your image URL
  },
];

const ServicesSection = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: "4rem 16px",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box sx={{ textAlign: "center", marginBottom: "3rem" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1.8rem", sm: "2.2rem" },
            color: theme.palette.text.primary,
            marginBottom: 2,
            textAlign: "center", // Centered for a softer, more welcoming feel
          }}
        >
          Your path to a healthier you, with{" "}
          <span style={{ color: theme.palette.primary.main, fontWeight: 900 }}>
            personalized services
          </span>
          .
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", sm: "1.25rem" },
            color: theme.palette.text.secondary,
            maxWidth: "800px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          We offer a variety of fitness, wellness, and nutrition services to
          help you achieve your health goals. Our expert instructors and
          personalized plans are designed to support you every step of the way.
        </Typography>
      </Box>

      {/* Cards for Services */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "center",
        }}
      >
        {services.map((service, index) => (
          <Card
            key={index}
            sx={{
              maxWidth: "300px", // Max width for each card
              minWidth: 200,
              flex: "1 1 45%", // Allows wrapping and responsive resizing
              boxShadow: 3,
              borderRadius: "8px",
              overflow: "hidden",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)", // Slight zoom effect on hover
              },
              height: "auto",
            }}
          >
            <CardMedia
              component="img"
              alt={service.title}
              height="200"
              image={service.imageUrl}
              sx={{ objectFit: "cover" }}
            />
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                  marginBottom: 1,
                }}
              >
                {service.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  lineHeight: 1.6,
                }}
              >
                {service.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ServicesSection;
