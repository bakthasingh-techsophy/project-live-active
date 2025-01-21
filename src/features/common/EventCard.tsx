import { defaultEventPic } from "@assets/index";
import {
  staticStyles,
  dynamicStyles,
} from "@features/landingPage/ServiceCarousel";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Rating,
  Theme,
  Typography,
} from "@mui/material";
import { ClipLoader } from "react-spinners";
import { Event } from "./ExploreEvents";
import { pushNotification } from "@redux/slices/loadingSlice";
import {
  deleteEvent,
  enrollOrJoinEvent,
  getEventById,
} from "@services/eventsService";
import { AppRouteQueries } from "@utils/AppRoutes";
import { CONSTANTS } from "@utils/constants";
import { getLocalStorageItem } from "@utils/encrypt";
import { ApiResponse, NotificationTypes } from "@utils/types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "@utils/tokenUtils";
import { AppDispatch } from "@redux/store";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date?.toLocaleString();
};
interface EventCardProps {
  event: Event; // Assuming Event is your event type (adjust the path to where it’s defined)
  handlePopoverOpen: (
    event: React.MouseEvent<HTMLElement>,
    tags: string[]
  ) => void;
  viewMode: string;
  theme: Theme;
  selectedEvent: Event | undefined | null;
  setSelectedEvent: (event: Event | null | undefined) => void;
  isOnAdministrationPage: boolean;
  staticStyles: any; // You might want to refine these to match the actual types
  staticStylesExploreEvents: any; // Similar here, specify more types if needed
  dynamicStyles: any; // Same as above, if you have a specific type for styles, specify it
  enrolledEventIds?: string[]; // Optional prop, array of event IDs
  handleEditEvent: (event: Event) => void;
  handleReload: () => void;
  handleCardClick: (eventDetails: Event) => void;
}
const EventCard: React.FC<EventCardProps> = ({
  event,
  handlePopoverOpen,
  viewMode,
  theme,
  selectedEvent,
  isOnAdministrationPage,
  staticStyles,
  staticStylesExploreEvents,
  dynamicStyles,
  enrolledEventIds,
  handleEditEvent,
  setSelectedEvent,
  handleReload,
  handleCardClick,
}) => {
  const [localEvent, setLocalEvent] = useState<Event>(event);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isEnrolled = enrolledEventIds?.includes(localEvent?.id.toString());
  const [loading, setLoading] = useState(false);
  const handleEnrollClick = async () => {
    //   setSelectedEvent({
    //     ...event,
    //     loading: true,
    //   });
    const payload = {
      enrollList: [getLocalStorageItem(CONSTANTS?.USER_EMAIL)],
    };

    if (!isTokenExpired()) {
      setLoading(true);
      try {
        const enrollFormResponse = await enrollOrJoinEvent(
          payload,
          localEvent?.id
        );
        //   setSelectedEvent(null);
        handleResponseMessage(enrollFormResponse, dispatch);
      } catch (error: any) {
        handleNotification(dispatch, error);
      }
      setLoading(false);
      return;
    }
    navigate(AppRouteQueries?.AUTH_LOGIN);
  };

  const handleDelete = async () => {
    if (!isTokenExpired()) {
      setLoading(true);
      try {
        const deleteEventResponse = await deleteEvent({
          eventIds: [localEvent?.id],
        });
        if (deleteEventResponse?.success) handleReload();
        handleResponseMessage(deleteEventResponse, dispatch);
      } catch (error: any) {
        handleNotification(dispatch, error);
      }
      setLoading(false);
      return;
    }
    navigate(AppRouteQueries?.AUTH_LOGIN);
  };
  const fetchCurrentUpdatedEvent = async () => {
    if (!isTokenExpired()) {
      setLoading(true);
      try {
        const eventResponse = await getEventById(localEvent?.id);
        if (eventResponse?.success) setLocalEvent(eventResponse?.data);
        handleResponseMessage(eventResponse, dispatch);
      } catch (error: any) {
        handleNotification(dispatch, error);
      }
      setLoading(false);

      return;
    }
    navigate(AppRouteQueries?.AUTH_LOGIN);
  };
  useEffect(() => {
    console.log("eventresponse--", selectedEvent);
    if (selectedEvent?.updated) {
      fetchCurrentUpdatedEvent();
      setSelectedEvent(null);
    }
  }, [selectedEvent]);

  return (
    <Card
      key={localEvent?.id}
      onClick={() => handleCardClick(localEvent)}
      sx={
        viewMode === "explore"
          ? [
              staticStylesExploreEvents?.cardStyle,
              {
                "&:hover": {
                  cursor: "pointer",
                },
              },
            ]
          : [
              staticStyles?.container?.cardContainer?.(theme),
              dynamicStyles?.container?.cardContainer,
            ]
      }
    >
      <Box
        component="img"
        src={localEvent?.photoUrl || defaultEventPic}
        sx={
          viewMode === "explore"
            ? staticStylesExploreEvents?.cardImage
            : [
                staticStyles?.container?.cardMediaContainer,
                dynamicStyles?.container?.cardMediaContainer,
              ]
        }
      />
      <CardContent sx={staticStyles?.container?.cardContentContainer}>
        {/* Event Title */}
        <Box sx={staticStyles?.container?.contentHeader}>
          <Typography variant="h6" sx={staticStyles?.typography?.boldText}>
            {localEvent?.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            {!isOnAdministrationPage && (
              <Button
                variant="contained"
                sx={staticStyles?.button?.enrollButton}
                onClick={() => {
                  handleEnrollClick();
                }}
              >
                {loading ? (
                  <ClipLoader color={"#fff"} loading={loading} size={24} />
                ) : isEnrolled ? (
                  "Join"
                ) : (
                  "Enroll"
                )}
              </Button>
            )}
            {/* Admin Edit/Delete Buttons */}
            {isOnAdministrationPage && (
              <
                //   sx={{
                //     position: "absolute",
                //     right: 8,
                //     top: 8,
                //     display: "flex",
                //     justifyContent: "center",
                //     alignItems: "center",
                //     gap: 1,
                //   }}
              >
                {/* Edit Icon Button */}
                <IconButton
                  color="primary"
                  onClick={() => handleEditEvent(event)}
                  sx={{
                    backgroundColor: theme.palette.primary.light,
                    padding: 1,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.light,
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <EditIcon />
                </IconButton>

                {/* Delete Icon Button */}
                <IconButton
                  color="secondary"
                  onClick={handleDelete}
                  sx={{
                    backgroundColor: theme.palette.primary.light,
                    padding: 1,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.light,
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
            gap: 1,
            flexDirection: "column",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Hosted By:
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {localEvent?.hosts
              .slice(0, 4)
              .map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  size="small"
                  variant="outlined"
                  color="primary"
                />
              ))}
            {localEvent?.hosts.length > 4 && (
              <Button
                onClick={(e) => handlePopoverOpen(e, localEvent?.hosts)}
                sx={{ textTransform: "none", fontSize: "12px" }}
                color="primary"
              >
                ...More
              </Button>
            )}
          </Box>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={staticStyles?.typography.scheduleText}
        >
          Scheduled for: {formatDate(localEvent?.scheduledTime)}
        </Typography>

        {/* Event Rating */}
        <Box sx={staticStyles?.container?.ratingContainer}>
          <Rating value={localEvent?.rating} precision={0.1} readOnly />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={staticStyles?.typography?.ratingText}
          >
            ({localEvent?.rating})
          </Typography>
        </Box>

        {/* Event Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: "8px" }}
        >
          {localEvent?.description}
        </Typography>

        {/* Tags */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginTop: "8px",
          }}
        >
          {localEvent?.tags
            .slice(0, 5)
            .map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                variant="outlined"
                color="primary"
              />
            ))}
          {localEvent?.tags.length > 5 && (
            <Button
              onClick={(e) => handlePopoverOpen(e, localEvent?.tags)}
              sx={{ textTransform: "none", fontSize: "12px" }}
              color="primary"
            >
              ...More
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventCard;
function handleNotification(dispatch: AppDispatch, error: any) {
  dispatch(
    pushNotification({
      isOpen: true,
      message:
        error?.message || CONSTANTS.API_RESPONSE_MESSAGES.EVENT_ENROLL_FAILURE,
      type: NotificationTypes.ERROR,
    })
  );
}

function handleResponseMessage(
  enrollFormResponse: ApiResponse,
  dispatch: AppDispatch
) {
  if (enrollFormResponse?.success) {
    dispatch(
      pushNotification({
        isOpen: true,
        message:
          enrollFormResponse?.message ||
          CONSTANTS.API_RESPONSE_MESSAGES.EVENT_ENROLL_SUCCESS,
        type: NotificationTypes.SUCCESS,
      })
    );
  } else {
    dispatch(
      pushNotification({
        isOpen: true,
        message:
          enrollFormResponse?.message ||
          CONSTANTS.API_RESPONSE_MESSAGES.EVENT_ENROLL_FAILURE,
        type: NotificationTypes.ERROR,
      })
    );
  }
}
