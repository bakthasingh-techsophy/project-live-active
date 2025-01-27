import { defaultEventPic } from "@assets/index";
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
import { pushNotification } from "@redux/slices/loadingSlice";
import { enrollOrJoinEvent } from "@services/eventsService";
import { CONSTANTS } from "@utils/constants";
import { getLocalStorageItem } from "@utils/encrypt";
import { Event, NotificationTypes } from "@utils/types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";

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
    headerContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 1,
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

interface PreferenceProps {
  isLoading: any;
  browsedEvents: any;
  userDetails: any;
  handleReload: any;
}

const PreferencePrograms = ({
  isLoading,
  browsedEvents,
  userDetails,
  handleReload,
}: PreferenceProps) => {
  const dispatch = useDispatch();
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<
    Event | undefined | null
  >();

  const getTopUpcomingEvents = () => {
    const currentDate = new Date();

    const filteredEvents = browsedEvents
      ?.filter((event: Event) => {
        const hasMatchingTags = event?.tags?.some((tag) =>
          userDetails?.preferences?.includes(tag)
        );
        return (
          !userDetails?.eventIds?.includes(event?.id) &&
          hasMatchingTags &&
          new Date(event?.scheduledTime) > currentDate
        );
      })
      ?.sort((a: Event, b: Event) => b?.rating - a?.rating);

    setUpcomingEvents(filteredEvents?.slice(0, 3));
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

  const handleEnrollClick = async (event: any) => {
    setSelectedEvent({
      ...event,
      loading: true,
    });
    const payload = {
      enrollList: [getLocalStorageItem(CONSTANTS?.USER_EMAIL)],
    };

    try {
      const enrollFormResponse = await enrollOrJoinEvent(payload, event?.id);
      setSelectedEvent(null);
      if (enrollFormResponse?.success) {
        handleReload();
        dispatch(
          pushNotification({
            isOpen: true,
            message:
              enrollFormResponse?.message ||
              CONSTANTS?.API_RESPONSE_MESSAGES?.EVENT_ENROLL_SUCCESS,
            type: NotificationTypes?.SUCCESS,
          })
        );
      } else {
        dispatch(
          pushNotification({
            isOpen: true,
            message:
              enrollFormResponse?.message ||
              CONSTANTS?.API_RESPONSE_MESSAGES?.EVENT_ENROLL_FAILURE,
            type: NotificationTypes?.ERROR,
          })
        );
      }
    } catch (error) {
      console.error(error);
      dispatch(
        pushNotification({
          isOpen: true,
          message: CONSTANTS?.API_RESPONSE_MESSAGES?.EVENT_ENROLL_FAILURE,
          type: NotificationTypes?.ERROR,
        })
      );
    }
  };

  useEffect(() => {
    getTopUpcomingEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails, browsedEvents]);

  return (
    <Container sx={[staticStyles?.container?.mainContainer]} maxWidth={false}>
      {upcomingEvents?.length > 0 && (
        <Box sx={staticStyles?.container?.headerContainer}>
          <Typography
            variant="h5"
            sx={{
              color: "text.secondary",
              fontWeight: 600,
            }}
          >
            Top Upcoming Events
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              fontWeight: 400,
            }}
          >
            Based on Preferences
          </Typography>
        </Box>
      )}
      <Grid container spacing={2} sx={dynamicStyles?.container?.grid}>
        {/* Map through events and render each card */}
        {isLoading ? (
          <ClipLoader color={"#fff"} loading={isLoading} size={24} />
        ) : (
          [...upcomingEvents]?.map((event) => (
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
                    image={event?.photoUrl || defaultEventPic}
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
                        handleEnrollClick(event);
                      }}
                      sx={staticStyles?.button?.exploreButton}
                      disabled={event?.expired || event?.ended}
                    >
                      {selectedEvent?.id === event?.id &&
                      selectedEvent?.loading ? (
                        <ClipLoader
                          color={"#fff"}
                          loading={
                            selectedEvent?.id === event?.id &&
                            selectedEvent?.loading
                          }
                          size={24}
                        />
                      ) : (
                        "Enroll"
                      )}
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
                    Hosted by:{" "}
                    {event?.hosts?.length > 0
                      ? event?.hosts?.join(", ")
                      : "No hosts available"}
                  </Typography>

                  {/* Rating */}
                  <Box sx={staticStyles?.container?.ratingContainer}>
                    <Rating value={event?.rating} precision={0.1} readOnly />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default PreferencePrograms;
