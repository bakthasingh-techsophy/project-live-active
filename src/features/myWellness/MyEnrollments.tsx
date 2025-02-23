import { defaultEventPic } from "@assets/index";
import EventDetailsModal from "@features/administration/EventDetailsModal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { enrollOrJoinEvent } from "@services/eventsService";
import { CONSTANTS } from "@utils/constants";
import {
  handleNotification,
  handleResponseMessage,
} from "@utils/dispatchNotification";
import { getLocalStorageItem } from "@utils/encrypt";
import { Event } from "@utils/types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";

const staticStyles = {
  container: {
    mainContainer: {
      py: 4,
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
      transition: "transform 0.2s ease-in-out",
      "&:hover": {
        cursor: "pointer",
        transform: "scale(1.02)",
      },
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
      position: "relative",
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
    browseHeader: {
      color: "text.secondary",
      fontWeight: 600,
    },
    caution: {
      color: "text.secondary",
    },
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
  handleReload: () => void;
}

const MyEnrollments = ({
  isLoading,
  browsedEvents,
  userDetails,
  handleReload,
}: MyEnrollmentsProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [localEventDetails, setLocalEventDetails] = useState<
    Event | undefined | null
  >();
  const [openEventDetails, setOpenEventDetails] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleCardClick = (eventDetails: Event) => {
    setLocalEventDetails(eventDetails);
    setOpenEventDetails(true);
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

  const handleEnrollOrJoinClick = async (eventId: any) => {
    const payload = {
      joinList: [getLocalStorageItem(CONSTANTS?.USER_EMAIL)],
    };

    setLoading(true);
    try {
      const enrollOrJoinFormResponse = await enrollOrJoinEvent(
        payload,
        eventId
      );
      if (enrollOrJoinFormResponse?.success) {
        handleReload();
      }
      handleResponseMessage(
        enrollOrJoinFormResponse,
        dispatch,
        CONSTANTS?.API_RESPONSE_MESSAGES?.EVENT_JOINED_SUCCESS,
        CONSTANTS?.API_RESPONSE_MESSAGES?.EVENT_JOINED_FAILURE
      );
    } catch (error: any) {
      handleNotification(
        dispatch,
        error,
        CONSTANTS?.API_RESPONSE_MESSAGES?.EVENT_JOINED_FAILURE
      );
    }
    setLoading(false);
    return;
  };

  return (
    <Container sx={[staticStyles?.container?.mainContainer]} maxWidth={false}>
      {filteredAndSortedEvents?.length > 0 ? (
        <Typography variant="h5" sx={staticStyles?.typography?.browseHeader}>
          My Enrollments
        </Typography>
      ) : (
        <Typography variant="body1" sx={staticStyles?.typography?.caution}>
          No Upcoming Enrollments
        </Typography>
      )}
      <Grid container spacing={2} sx={dynamicStyles?.container?.grid}>
        {isLoading ? (
          <ClipLoader color={"#fff"} loading={isLoading} size={24} />
        ) : (
          filteredAndSortedEvents?.map((event: Event) => (
            <Grid item xs={12} sm={12} md={12} lg={6} key={event?.id}>
              <Card
                sx={[
                  staticStyles?.container?.cardContainer,
                  dynamicStyles?.container?.cardContainer,
                ]}
                onClick={() => {
                  handleCardClick(event);
                }}
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
                  {event?.scheduledTime &&
                    new Date(event?.scheduledTime).getTime() >
                      new Date().getTime() && (
                      <Button
                        variant="contained"
                        onClick={(e) => {
                          e?.stopPropagation();
                          handleEnrollOrJoinClick(event?.id);
                          window.open(event?.joinLink, "_blank");
                        }}
                        sx={staticStyles?.button?.joinButton}
                        disabled={event?.expired || event?.ended}
                      >
                        {loading ? (
                          <ClipLoader
                            color={"#fff"}
                            loading={loading}
                            size={24}
                          />
                        ) : (
                          "Join"
                        )}
                      </Button>
                    )}
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
      <EventDetailsModal
        selectedEvent={localEventDetails}
        open={openEventDetails}
        onClose={() => setOpenEventDetails(false)}
        onEnroll={handleEnrollOrJoinClick}
        loading={isLoading}
        userDetails={userDetails}
        isOnAdministrationPage={false}
        handleStartEvent={function (eventId: number): void {
          throw new Error("Function not implemented.");
        }}
      />
    </Container>
  );
};

export default MyEnrollments;
