import {
  preferencePic2,
  preferencePic3
} from "@assets/index";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography
} from "@mui/material";

const events = [
  {
    id: 1,
    title: "HIIT Bootcamp",
    host: "John Doe",
    rating: 4.8,
    scheduledTime: "2025-01-21T10:00:00",
    description: "High-intensity interval training for ultimate fitness!",
    category: ["HIIT", "Strength", "Cardio", "Fitness", "Endurance"],
    image: preferencePic2,
  },
  {
    id: 2,
    title: "Morning Yoga",
    host: "Sarah Lee",
    rating: 4.5,
    scheduledTime: "2025-01-20T07:30:00",
    description: "Start your day with a calming and energizing yoga session.",
    category: ["Yoga", "Morning", "Beginner", "Relaxation", "Breathwork"],
    image: preferencePic3,
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
      borderRadius: 2,
      backgroundColor: "background.paper",
      boxShadow: 2,
      position: "relative",
      height: "100%",
      overflow: "hidden",
    },
    cardMediaContainer: {
      width: "100%",
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
      flexDirection: "column",
    },
    ratingContainer: { display: "flex", alignItems: "center", marginTop: 1 },
  },
  typography: {
    boldText: { fontWeight: "bold" },
  },
  button: {
    joinButton: {
      fontSize: "0.8rem",
      whiteSpace: "nowrap",
      textTransform: "none",
    },
  },
};
const dynamicStyles = {
  container: {
    cardContainer: {
      flexDirection: {
        lg: "row",
        md: "row",
        sm: "row",
        xs: "column",
      },
    },
    cardMediaContainer: {
      width: {
        lg: "50%",
        sm: "40%",
        md: "40%",
        xs: "100%",
      },
    },
    grid: {
      px: {
        lg: 20,
        md: 4,
        sm: 8,
        xs: 2,
      },
    },
  },
};

const QuickLinks = () => {
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

  return (
    <Container sx={[staticStyles?.container?.mainContainer]} maxWidth={false}>
      <Typography
        variant="h5"
        sx={{
          color: "text.secondary",
          fontWeight: 600,
        }}
      >
        Quick Links
      </Typography>
      <Grid container spacing={2} sx={dynamicStyles?.container?.grid}>
        {/* Map through events and render each card */}

        {[...events]?.map((event) => (
          <Grid item xs={12} sm={12} md={6} key={event?.id}>
            <Card
              sx={[
                staticStyles?.container?.cardContainer,
                dynamicStyles?.container?.cardContainer,
              ]}
            >
              <CardMedia
                component="img"
                sx={[
                  staticStyles?.container?.cardMediaContainer,
                  dynamicStyles?.container?.cardMediaContainer,
                ]}
                image={event?.image}
                alt={event?.title}
              />
              <CardContent sx={staticStyles?.container?.cardContentContainer}>
                {/* Event Title */}
                <Box sx={staticStyles?.container?.contentHeaderFooter}>
                  <Typography
                    variant="h6"
                    sx={staticStyles?.typography?.boldText}
                  >
                    {event?.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Hosted by: {event?.host}
                  </Typography>
                </Box>

                <Box sx={staticStyles?.container?.contentHeaderFooter}>
                  <Typography variant="body1">{event?.description}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Scheduled for: {formatDate(event?.scheduledTime)}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  onClick={() => {
                    console.log("Join Clicked");
                  }}
                  sx={staticStyles?.button?.joinButton}
                >
                  Join
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default QuickLinks;
