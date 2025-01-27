import { defaultEventPic } from "@assets/index";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Rating,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import { pushNotification } from "@redux/slices/loadingSlice";
import { deleteEvent, getEventById } from "@services/eventsService";
import { AppRouteQueries } from "@utils/AppRoutes";
import { CONSTANTS } from "@utils/constants";
import {
  handleNotification,
  handleResponseMessage,
} from "@utils/dispatchNotification";
import { isTokenExpired } from "@utils/tokenUtils";
import { Event, NotificationTypes } from "@utils/types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

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
  handleEnrollOrJoinClick: (eventId: any) => void;
  handleReload: () => void;
  handleCardClick: (eventDetails: Event) => void;
  handleStartEvent: (eventId: number) => void;
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
  handleEnrollOrJoinClick,
  setSelectedEvent,
  handleReload,
  handleCardClick,
  handleStartEvent,
}) => {
  const [localEvent, setLocalEvent] = useState<Event>(event);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleDelete = async () => {
    if (!isTokenExpired()) {
      setLoading(true);
      try {
        const deleteEventResponse = await deleteEvent({
          eventIds: [localEvent?.id],
        });
        if (deleteEventResponse?.success) handleReload();
        handleResponseMessage(
          deleteEventResponse,
          dispatch,
          CONSTANTS?.API_RESPONSE_MESSAGES?.EVENT_DELETED_SUCCESS,
          CONSTANTS?.API_RESPONSE_MESSAGES?.EVENT_DELETED_FAILURE
        );
      } catch (error: any) {
        handleNotification(
          dispatch,
          error,
          isEnrolled
            ? CONSTANTS?.API_RESPONSE_MESSAGES?.EVENT_DELETED_SUCCESS
            : CONSTANTS?.API_RESPONSE_MESSAGES?.EVENT_DELETED_FAILURE
        );
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
        if (eventResponse?.success) {
          setLocalEvent({ ...eventResponse?.data });
        } else {
          dispatch(
            pushNotification({
              isOpen: true,
              message:
                eventResponse?.message ||
                CONSTANTS?.API_RESPONSE_MESSAGES?.EVENT_FETCH_FAILURE,
              type: NotificationTypes?.ERROR,
            })
          );
        }
      } catch (error: any) {
        handleNotification(
          dispatch,
          error,
          CONSTANTS?.API_RESPONSE_MESSAGES?.EVENT_FETCH_FAILURE
        );
      }
      setLoading(false);

      return;
    }
    navigate(AppRouteQueries?.AUTH_LOGIN);
  };
  const updateCurrentCard = () => {
    fetchCurrentUpdatedEvent();
    setSelectedEvent(null);
  };

  useEffect(() => {
    if (selectedEvent?.updated) {
      updateCurrentCard();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEvent]);
  useEffect(() => {
    if (enrolledEventIds && localEvent) {
      setLoading(false);
      setIsEnrolled(
        enrolledEventIds?.includes(localEvent?.id?.toString()) ?? false
      );
    } else {
      if (isTokenExpired()) {
        setLoading(false);
      }
    }
  }, [enrolledEventIds, localEvent]);

  const getActionButtonBehaviour = (): { label: string; disable: boolean } => {
    if (isOnAdministrationPage) {
      if (localEvent?.expired) {
        return { label: "Expired", disable: true };
      }
      return { label: "Start Event", disable: false };
    }

    const isEventEnded: boolean = localEvent?.expired;
    const actionLabel = isEventEnded
      ? isEnrolled
        ? "Join"
        : "Enroll"
      : isEnrolled
        ? "Join"
        : "Enroll";

    return { label: actionLabel, disable: isEventEnded };
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const eventId = params.get("event");
    if (eventId && localEvent?.id + "" === eventId) {
      handleCardClick(localEvent);
    }
  }, [location]);

  return (
    <Card
      key={localEvent?.id}
      sx={{
        ...(viewMode === "explore"
          ? staticStylesExploreEvents?.cardStyle
          : {
              ...staticStyles?.container?.cardContainer?.(theme),
              ...dynamicStyles?.container?.cardContainer,
            }),
      }}
      onClick={(e: any) => {
        e?.preventDefault();
        if (localEvent && enrolledEventIds) {
          handleCardClick(localEvent);
        }
      }}
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
          <Typography
            variant="h6"
            sx={{
              ...staticStyles?.typography?.boldText,
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3, // Clamps the text to 3 lines
              whiteSpace: "normal", // Ensures that text wraps
              textOverflow: "ellipsis", // Adds ellipses at the end of the truncated text
            }}
          >
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
            <Button
              variant="contained"
              sx={staticStyles?.button?.enrollButton}
              onClick={(e) => {
                e?.stopPropagation();
                if (isOnAdministrationPage) {
                  handleStartEvent(localEvent?.id);
                } else {
                  if (isEnrolled) {
                    window.open(localEvent?.joinLink, "_blank");
                  } else {
                    handleEnrollOrJoinClick(localEvent?.id);
                  }
                }
              }}
              disabled={getActionButtonBehaviour().disable}
            >
              {loading ? (
                <ClipLoader color={"#fff"} loading={loading} size={24} />
              ) : (
                getActionButtonBehaviour().label
              )}
            </Button>
            {isOnAdministrationPage && (
              <>
                <Tooltip title="Edit Event" arrow>
                  <IconButton
                    color="primary"
                    onClick={(e: any) => {
                      e?.preventDefault();
                      e?.stopPropagation();
                      handleEditEvent(localEvent);
                    }}
                    sx={{
                      backgroundColor: theme?.palette?.primary?.light,
                      padding: 1,
                      "&:hover": {
                        backgroundColor: theme?.palette?.primary?.light,
                        transform: "scale(1.1)",
                      },
                    }}
                    disabled={getActionButtonBehaviour().disable}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>

                {/* Delete Icon Button */}
                <Tooltip title="Delete Event" arrow>
                  <IconButton
                    color="secondary"
                    onClick={(e: any) => {
                      e?.preventDefault();
                      e?.stopPropagation();
                      handleDelete();
                    }}
                    sx={{
                      backgroundColor: theme?.palette?.primary?.light,
                      padding: 1,
                      "&:hover": {
                        backgroundColor: theme?.palette?.primary?.light,
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
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
            {localEvent?.hosts?.length > 4 && (
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
          sx={staticStyles?.typography?.scheduleText}
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
          {localEvent?.tags?.length > 5 && (
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
