import { defaultEventPic } from "@assets/index";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { ClipLoader } from "react-spinners";

interface Event {
  id: number;
  title: string;
  hosts: string[];
  rating: number;
  scheduledTime: string;
  description: string;
  tags: string[];
  photoUrl: string;
  isEnrolled: boolean;
  isStarted: boolean;
  isExpired: boolean;
  loading?: boolean;
}

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
      gap: 2,
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

interface MyEnrollmentsProps {
  isLoading: any;
  browsedEvents: any;
  userDetails: any;
}

const MyEnrollments = ({
  isLoading,
  browsedEvents,
  userDetails,
}: MyEnrollmentsProps) => {
  const filteredAndSortedEvents = browsedEvents
    ?.filter(
      (event: Event) =>
        userDetails?.eventIds?.includes(event?.id) &&
        new Date(event?.scheduledTime).getTime() > new Date().getTime()
    )
    ?.sort(
      (a: Event, b: Event) =>
        new Date(a?.scheduledTime).getTime() -
        new Date(b?.scheduledTime).getTime()
    );

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
        My Enrollments
      </Typography>
      <Grid container spacing={2} sx={dynamicStyles?.container?.grid}>
        {isLoading ? (
          <ClipLoader color={"#fff"} loading={isLoading} size={24} />
        ) : (
          filteredAndSortedEvents?.map((event: Event) => (
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
                  image={event?.photoUrl || defaultEventPic}
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
                      Hosted by:{" "}
                      {event?.hosts?.length > 0
                        ? event?.hosts?.join(", ")
                        : "No hosts available"}
                    </Typography>
                  </Box>

                  <Typography variant="body1">{event?.description}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Scheduled for: {formatDate(event?.scheduledTime)}
                  </Typography>
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
          ))
        )}
      </Grid>
    </Container>
  );
};

export default MyEnrollments;
