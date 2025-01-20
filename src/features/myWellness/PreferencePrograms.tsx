import { preferencePic2, preferencePic3, preferencePic4 } from "@assets/index";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

interface Event {
  id: number;
  title: string;
  host: string;
  rating: number;
  scheduledTime: string;
  description: string;
  category: string[];
  image: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "Morning Yoga",
    host: "Sarah Lee",
    rating: 4.5,
    scheduledTime: "2025-01-20T16:00:00",
    description: "Start your day with a calming and energizing yoga session.",
    category: ["Yoga", "Morning", "Beginner", "Relaxation", "Breathwork"],
    image: preferencePic3,
  },
  {
    id: 2,
    title: "HIIT Bootcamp",
    host: "John Doe",
    rating: 4.8,
    scheduledTime: "2025-01-21T10:00:00",
    description: "High-intensity interval training for ultimate fitness!",
    category: ["HIIT", "Strength", "Cardio", "Fitness", "Endurance"],
    image: preferencePic2,
  },
  {
    id: 3,
    title: "Healthy Cooking Class",
    host: "Emma Green",
    rating: 4.2,
    scheduledTime: "2025-01-22T16:00:00",
    description: "Join us for a cooking class with healthy meal ideas.",
    category: [
      "Cooking",
      "Healthy",
      "Meal Prep",
      "Nutrition",
      "Wellness",
      "Cooking",
      "Healthy",
      "Meal Prep",
      "Nutrition",
      "Wellness",
    ],
    image: preferencePic4,
  },
  {
    id: 4,
    title: "Test 1",
    host: "Emma Green",
    rating: 4.2,
    scheduledTime: "2025-01-21T16:00:00",
    description: "Join us for a cooking class with healthy meal ideas.",
    category: ["Healthy"],
    image: preferencePic4,
  },
  {
    id: 5,
    title: "Test 2",
    host: "Emma Green",
    rating: 4.2,
    scheduledTime: "2025-01-21T16:00:00",
    description: "Join us for a cooking class with healthy meal ideas.",
    category: ["Cooking"],
    image: preferencePic4,
  },
];

const staticStyles = {
  container: {
    mainContainer: {
      paddingTop: 4,
      paddingBottom: 4,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 4,
    },
    cardContainer: {
      display: "flex",
      flexDirection: "column",
      borderRadius: 2,
      background: "transparent",
      boxShadow: "none",
      border: "none",
      position: "relative",
      height: "100%",
      overflow: "hidden",
    },
    cardMediaContainer: {
      width: "100%",
      objectFit: "cover",
      boxShadow: 3,
      borderRadius: 4,
      position: "relative",
    },
    overlayContainer: {
      position: "absolute",
      borderRadius: 4,
      padding: 4,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0)",
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "start",
      opacity: 0,
      transition: "opacity 0.6s, background-color 0.3s",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        opacity: 1,
      },
    },
    cardContentContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 2,
      flex: 1,
    },
    contentHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    ratingContainer: { display: "flex", alignItems: "center", marginTop: 1 },
  },
  typography: {
    boldText: { fontWeight: "bold" },
    ratingText: { marginLeft: 1 },
    description: {},
  },
  button: {
    exploreButton: {
      textTransform: "none",
      color: "text.secondary",
      backgroundColor: "primary.contrastText",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        opacity: 1,
      },
    },
  },
};
const dynamicStyles = {
  container: {
    cardContainer: {},
    cardMediaContainer: {},
    grid: {
      px: {
        lg: 20,
        md: 4,
        sm: 8,
        xs: 2,
      },
    },
    overlayContainer: {
      gap: {
        lg: 2,
        md: 1,
        sm: 1,
        xs: 1,
      },
    },
  },
  typography: {
    description: {
      lineHeight: {
        lg: 1.5,
        md: 1.5,
        sm: 1.25,
        xs: 1.25,
      },
      fontSize: {
        lg: "1rem",
        md: "1rem",
        sm: "1.5rem",
        xs: "1.5rem",
      },
    },
  },
};

const PreferencePrograms = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  const getUpcomingEvents = () => {
    const currentDate = new Date();

    const sortedUpcomingEvents = [...events]
      .filter((event) => new Date(event.scheduledTime) > currentDate)
      .sort(
        (a, b) =>
          new Date(a.scheduledTime).getTime() -
          new Date(b.scheduledTime).getTime()
      );

    setUpcomingEvents(sortedUpcomingEvents.slice(0, 3));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date?.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  useEffect(() => {
    getUpcomingEvents();
  }, []);

  return (
    <Container sx={[staticStyles?.container?.mainContainer]} maxWidth={false}>
      <Typography
        variant="h5"
        sx={{
          color: "text.secondary",
          fontWeight: 600,
        }}
      >
        Upcoming Events
      </Typography>
      <Grid container spacing={2} sx={dynamicStyles?.container?.grid}>
        {/* Map through events and render each card */}

        {[...upcomingEvents]?.map((event) => (
          <Grid item xs={12} sm={12} md={6} lg={4} key={event?.id}>
            <Card
              sx={[
                staticStyles?.container?.cardContainer,
                dynamicStyles?.container?.cardContainer,
              ]}
            >
              <Box sx={staticStyles?.container?.cardMediaContainer}>
                <CardMedia
                  component="img"
                  sx={[
                    staticStyles?.container?.cardMediaContainer,
                    dynamicStyles?.container?.cardMediaContainer,
                  ]}
                  image={event?.image}
                  alt={event?.title}
                />
                <Box
                  sx={[
                    staticStyles?.container?.overlayContainer,
                    dynamicStyles?.container?.overlayContainer,
                  ]}
                >
                  <Typography
                    variant="h6"
                    sx={[
                      staticStyles?.typography?.description,
                      dynamicStyles?.typography?.description,
                    ]}
                  >
                    {event?.description}
                  </Typography>
                  <Typography variant="body2">
                    Scheduled for: {formatDate(event?.scheduledTime)}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => {
                      console.log("Explore Clicked");
                    }}
                    sx={staticStyles?.button?.exploreButton}
                  >
                    Explore
                  </Button>
                </Box>
              </Box>
              <CardContent sx={staticStyles?.container?.cardContentContainer}>
                {/* Event Title */}
                <Box sx={staticStyles?.container?.contentHeader}>
                  <Typography
                    variant="h6"
                    sx={staticStyles?.typography?.boldText}
                  >
                    {event?.title}
                  </Typography>
                </Box>

                {/* Host Name */}
                <Typography variant="body2" color="text.secondary">
                  Hosted by: {event?.host}
                </Typography>

                {/* Rating */}
                <Box sx={staticStyles?.container?.ratingContainer}>
                  <Rating value={event?.rating} precision={0.1} readOnly />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PreferencePrograms;
