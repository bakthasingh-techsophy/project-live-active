import {
  servicePic1,
  servicePic2,
  servicePic3,
  servicePic4,
} from "@assets/index";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const services = [
  {
    title: "Live Yoga Classes",
    description:
      "Join our expert-led yoga sessions designed to improve flexibility and mindfulness.",
    imageUrl: servicePic1,
  },
  {
    title: "Personalized Workouts",
    description:
      "Get tailored workout plans that cater to your fitness goals and lifestyle.",
    imageUrl: servicePic2,
  },
  {
    title: "Group Fitness Events",
    description:
      "Engage in fun and motivating fitness events with people from around the world.",
    imageUrl: servicePic3,
  },
  {
    title: "Nutrition Coaching",
    description:
      "Receive personalized nutritional guidance to fuel your fitness journey.",
    imageUrl: servicePic4,
  },
];

const staticStyles = {
  container: {
    mainContainer: (theme: any) => ({
      padding: "4rem 16px",
      backgroundColor: theme?.palette?.background?.paper,
    }),
    headerContainer: {
      textAlign: "center",
      marginBottom: "3rem",
    },
    cardsContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: 4,
      justifyContent: "center",
    },
    card: {
      maxWidth: "300px",
      minWidth: 200,
      flex: "1 1 45%",
      boxShadow: 3,
      borderRadius: "8px",
      overflow: "hidden",
      transition: "transform 0.3s ease-in-out",
      "&:hover": {
        transform: "scale(1.05)",
      },
      height: "auto",
    },
    cardMedia: { objectFit: "cover" },
  },
  typography: {
    h1: (theme: any) => ({
      fontWeight: 700,
      color: theme?.palette?.text?.primary,
      marginBottom: 2,
      textAlign: "center",
      fontSize: { xs: "1.8rem", sm: "2.2rem" },
    }),
    subHeader: (theme: any) => ({
      fontWeight: 900,
      color: theme?.palette?.primary?.main,
    }),
    content: (theme: any) => ({
      maxWidth: "800px",
      margin: "0 auto",
      lineHeight: 1.7,
      color: theme?.palette?.text?.secondary,
    }),
    cardTitle: (theme: any) => ({
      fontWeight: 700,
      color: theme?.palette?.primary?.main,
      marginBottom: 1,
    }),
    cardDescription: (theme: any) => ({
      color: theme?.palette?.text?.secondary,
      lineHeight: 1.6,
    }),
  },
  button: {},
};
const dynamicStyles = {
  container: {},
  typography: {
    h1: {
      fontSize: { xs: "1.8rem", sm: "2.2rem" },
    },
    content: {
      fontSize: { xs: "1rem", sm: "1.25rem" },
    },
  },
  button: {},
};

const ServicesSection = () => {
  const theme = useTheme();

  return (
    <Box sx={staticStyles?.container?.mainContainer(theme)}>
      <Box sx={staticStyles?.container?.headerContainer}>
        <Typography
          variant="h4"
          sx={[
            staticStyles?.typography?.h1(theme),
            dynamicStyles?.typography?.h1,
          ]}
        >
          Your path to a healthier you, with{" "}
          <span style={staticStyles?.typography?.subHeader(theme)}>
            personalized services
          </span>
          .
        </Typography>

        <Typography
          variant="body1"
          sx={[
            staticStyles?.typography?.content(theme),
            dynamicStyles?.typography?.content,
          ]}
        >
          We offer a variety of fitness, wellness, and nutrition services to
          help you achieve your health goals. Our expert instructors and
          personalized plans are designed to support you every step of the way.
        </Typography>
      </Box>

      {/* Cards for Services */}
      <Box sx={staticStyles?.container?.cardsContainer}>
        {services?.map((service, index) => (
          <Card key={index} sx={staticStyles?.container?.card}>
            <CardMedia
              component="img"
              alt={service?.title}
              height="200"
              image={service?.imageUrl}
              sx={staticStyles?.container?.cardMedia}
            />
            <CardContent>
              <Typography
                variant="h6"
                sx={staticStyles?.typography?.cardTitle(theme)}
              >
                {service?.title}
              </Typography>
              <Typography
                variant="body2"
                sx={staticStyles?.typography?.cardDescription(theme)}
              >
                {service?.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ServicesSection;
