import { TestProfile1, TestProfile2, TestProfile3, TestProfile4, TestProfile5 } from "@assets/index";
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
import { useState } from "react";

const coaches = [
  {
    id: 1,
    title: "Ravindra Kiran",
    level: "Professional",
    rating: 4.8,
    sessionsNo: 212,
    description: "Experienced with Zumba, Nutrition, Cardio",
    image: TestProfile1,
  },
  {
    id: 2,
    title: "Sushma Pandey",
    level: "Amateur",
    rating: 4.1,
    sessionsNo: 68,
    description: "Experienced with Yoga, Nutrition",
    image: TestProfile2,
  },
  {
    id: 3,
    title: "Poornima Thakur",
    level: "Beginner",
    rating: 4.0,
    sessionsNo: 22,
    description: "Specialized in Nutrition",
    image: TestProfile3,
  },
  {
    id: 4,
    title: "Baktha Singh",
    level: "Beginner",
    rating: 4.1,
    sessionsNo: 12,
    description: "Experienced with Cardio",
    image: TestProfile4,
  },
  {
    id: 5,
    title: "Rashmika R",
    level: "Trainee",
    rating: 4.6,
    sessionsNo: 2,
    description: "Trained with Dietary Plans",
    image: TestProfile5,
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
      borderRadius: 8,
      backgroundColor: "background.paper",
      boxShadow: 4,
      position: "relative",
      height: "100%",
      overflow: "hidden",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "scale(1.025)",
        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
      },
    },
    cardMediaContainer: {
      width: "100%",
      transformOrigin: "center",
      objectFit: "cover",
      position: "relative",
    },
    cardContentContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: 2,
      flex: 1,
      gap: 1,
    },
    contentHeaderFooter: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    ratingContainer: {
      display: "flex",
      alignItems: "center",
      gap: 1,
    },
  },
  typography: {
    ratingText: { marginLeft: 1 },
    boldText: {
      fontWeight: "bold",
      fontSize: "1.1rem",
      color: "#333",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      position: "relative",
      transition:
        "whiteSpace 0.3s ease, overflow 0.3s ease, textOverflow 0.3s ease",
      "&:hover": {
        whiteSpace: "normal",
        overflow: "visible",
        textOverflow: "unset",
        zIndex: 1,
      },
    },
    descriptionText: {
      fontSize: "0.95rem",
      color: "#555",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      position: "relative",
      transition:
        "whiteSpace 0.3s ease, overflow 0.3s ease, textOverflow 0.3s ease",
      "&:hover": {
        whiteSpace: "normal",
        overflow: "visible",
        textOverflow: "unset",
        zIndex: 1,
      },
    },
    sessionsText: { fontSize: "0.95rem", fontWeight: "500", color: "#333" },
    levelText: { fontSize: "0.875rem", color: "#777" },
  },
  button: {
    subscribeButton: {
      fontSize: "1rem",
      textTransform: "none",
      borderRadius: 25,
      color: "#fff",
    },
  },
};

const dynamicStyles = {
  container: {
    grid: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: {
        lg: 8,
        md: 4,
        sm: 4,
        xs: 4,
      },
      px: {
        lg: 16,
        md: 4,
        sm: 8,
        xs: 2,
      },
    },
  },
};

const CoachesSection = () => {
  const [showAll, setShowAll] = useState(false);

  const getSessionRound = (sessionNo: any) => {
    return Math.floor(sessionNo / 10) * 10;
  };

  const visibleCoaches = showAll ? coaches : coaches?.slice(0, 3);

  return (
    <Container sx={[staticStyles?.container?.mainContainer]} maxWidth={false}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          color: "#333",
        }}
      >
        Our Coaches
      </Typography>
      <Grid container spacing={2} sx={dynamicStyles?.container?.grid}>
        {/* Map through visible coaches and render each card */}
        {visibleCoaches?.map((event) => (
          <Grid item xs={12} sm={6} md={3} lg={3.5} key={event?.id}>
            <Card sx={[staticStyles?.container?.cardContainer]}>
              <CardMedia
                component="img"
                sx={[staticStyles?.container?.cardMediaContainer]}
                image={event?.image}
                alt={event?.title}
              />
              <CardContent sx={staticStyles?.container?.cardContentContainer}>
                {/* Event Title and Level */}
                <Box sx={staticStyles?.container?.contentHeaderFooter}>
                  <Typography
                    variant="h6"
                    sx={staticStyles?.typography?.boldText}
                  >
                    {event?.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={staticStyles?.typography?.levelText}
                  >
                    ({event?.level})
                  </Typography>
                </Box>

                {/* Event Description */}
                <Typography
                  variant="body1"
                  sx={staticStyles?.typography?.descriptionText}
                >
                  {event?.description}
                </Typography>

                {/* Sessions Taken */}
                <Typography
                  variant="body1"
                  sx={staticStyles?.typography?.sessionsText}
                >
                  <b>Sessions Taken:</b> {getSessionRound(event?.sessionsNo)}+
                </Typography>

                {/* Rating */}
                <Box sx={staticStyles?.container?.ratingContainer}>
                  <Rating
                    value={event?.rating}
                    precision={0.1}
                    readOnly
                    size="small"
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={staticStyles?.typography?.ratingText}
                  >
                    ({event?.rating})
                  </Typography>
                </Box>

                {/* Subscribe Button */}
                <Button
                  variant="contained"
                  onClick={() => {
                    console.log("Join Clicked");
                  }}
                  sx={staticStyles?.button?.subscribeButton}
                  disabled
                >
                  Coming Soon
                  {/* Subscribe */}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* View More / View Less Button */}
      <Button
        variant="outlined"
        onClick={() => setShowAll((prev) => !prev)}
        sx={{ marginTop: 2 }}
      >
        {showAll ? "View Less" : "View More"}
      </Button>
    </Container>
  );
};

export default CoachesSection;