import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  IconButton,
  Popover,
  Rating,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { pushNotification } from "@redux/slices/loadingSlice";
import { enrollOrJoinEvent, searchEvents } from "@services/eventsService";
import { getUserDetails } from "@services/userManagementService";
import { AppRouteQueries } from "@utils/AppRoutes";
import { CONSTANTS } from "@utils/constants";
import { getLocalStorageItem } from "@utils/encrypt";
import { isTokenExpired } from "@utils/tokenUtils";
import { NotificationTypes } from "@utils/types";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { defaultEventPic } from "@assets/index";
import MoreInfoPopover from "@components/MoreInfoPopover";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date?.toLocaleString();
};

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

// Sample data
const staticStyles = {
  container: {
    mainContainer: { padding: 4 },
    grid: {
      py: 3,
      px: 1,
    },
    cardContainer: (theme: any) => ({
      display: "flex",
      boxShadow: 3,
      borderRadius: 2,
      backgroundColor: theme?.palette?.background?.paper,
      position: "relative",
      height: "100%",
      overflow: "hidden",
    }),
    cardMediaContainer: {
      objectFit: "cover",
    },
    cardContentContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: 2,
      flex: 1,
    },
    contentHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "start",
    },
    ratingContainer: { display: "flex", alignItems: "center", marginTop: 1 },
    tagsContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: 1,
      marginTop: 2,
    },
    popoverContainer: { padding: 2, maxWidth: 300 },
    popoverTagsContainer: { display: "flex", flexWrap: "wrap", gap: 1 },
    closeButton: { marginTop: 1, textAlign: "right" },
  },
  typography: {
    boldText: { fontWeight: "bold" },
    ratingText: { marginLeft: 1 },
    scheduleText: { marginTop: 1 },
  },
  button: {
    moreButton: {
      textTransform: "none",
      fontSize: "12px",
      marginLeft: 1,
    },
    enrollButton: {
      whiteSpace: "nowrap",
      fontSize: "0.8rem",
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
        lg: "40%",
        sm: "40%",
        md: "40%",
        xs: "100%",
      },
    },
  },
};

const staticStylesExploreEvents = {
  boxContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", // Auto-fill grid with responsive column size
    gap: "16px", // Gap between items
    paddding: "0px",
  },
  cardStyle: { display: "flex", flexDirection: "column" },
  cardImage: {
    width: "100%",
    height: "200px", // Fixed height for the image
    objectFit: "cover",
  },
};

interface ExploreEventsProps {
  viewMode: "explore" | "browse";
  selectedTags?: any;
  searchText?: any;
}

const ExploreEvents = ({
  viewMode,
  selectedTags,
  searchText,
}: ExploreEventsProps) => {
  const theme = useTheme();
  const isTokenActive = !isTokenExpired();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [popoverTags, setPopoverTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [browsedEvents, setBrowsedEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<
    Event | undefined | null
  >();
  const [userDetails, setUserDetails] = useState<any>();

  const filteredEvents =
    selectedTags?.length === 0
      ? browsedEvents
      : browsedEvents?.filter((event) => {
          return event?.tags?.some((tag) =>
            selectedTags?.some(
              (selectedTag: any) =>
                tag.toLowerCase() === selectedTag.toLowerCase()
            )
          );
        });

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    tags: string[]
  ) => {
    setAnchorEl(event?.currentTarget);
    setPopoverTags(tags);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPopoverTags([]);
  };

  const handleEnrollClick = async (event: any) => {
    setSelectedEvent({
      ...event,
      loading: true,
    });
    const payload = {
      enrollList: [getLocalStorageItem(CONSTANTS?.USER_EMAIL)],
    };

    if (isTokenActive) {
      try {
        const enrollFormResponse = await enrollOrJoinEvent(payload, event?.id);
        setSelectedEvent(null);
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
      } catch (error) {
        console.error(error);
        dispatch(
          pushNotification({
            isOpen: true,
            message: CONSTANTS.API_RESPONSE_MESSAGES.EVENT_ENROLL_FAILURE,
            type: NotificationTypes.ERROR,
          })
        );
      }
      return;
    }
    navigate(AppRouteQueries?.AUTH_LOGIN);
  };

  const open = Boolean(anchorEl);
  // const viewMode = "explore";

  const handleSearch = async (payload: any) => {
    try {
      setIsLoading(true);

      const searchFormResponse = await searchEvents(payload);

      if (searchFormResponse?.success) {
        setIsLoading(false);
        setBrowsedEvents(searchFormResponse?.data);
      } else {
        setIsLoading(false);
        dispatch(
          pushNotification({
            isOpen: true,
            message:
              searchFormResponse?.message ||
              CONSTANTS.API_RESPONSE_MESSAGES.EVENTS_FETCH_FAILURE,
            type: NotificationTypes.ERROR,
          })
        );
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      dispatch(
        pushNotification({
          isOpen: true,
          message: CONSTANTS.API_RESPONSE_MESSAGES.EVENTS_FETCH_FAILURE,
          type: NotificationTypes.ERROR,
        })
      );
    }
  };

  const fetchUserDetails = async () => {
    const userId = getLocalStorageItem(CONSTANTS.USER_ID);
    try {
      const getUserResponse = await getUserDetails(userId || "");
      if (getUserResponse?.success) {
        setUserDetails(getUserResponse?.data);
      } else {
        dispatch(
          pushNotification({
            isOpen: true,
            message:
              getUserResponse?.message ||
              CONSTANTS.API_RESPONSE_MESSAGES.USER_DETAILS_FETCH_FAILURE,
            type: NotificationTypes.ERROR,
          })
        );
      }
    } catch (error) {
      console.error(error);
      dispatch(
        pushNotification({
          isOpen: true,
          message: CONSTANTS.API_RESPONSE_MESSAGES.USER_DETAILS_FETCH_FAILURE,
          type: NotificationTypes.ERROR,
        })
      );
    }
  };

  useEffect(() => {
    if (isTokenActive) {
      fetchUserDetails();
    }
  }, []);

  useEffect(() => {
    const payload = {
      searchText: searchText,
    };
    handleSearch(payload);
  }, [searchText]);

  return (
    <Container
      maxWidth={false}
      sx={
        viewMode === "explore"
          ? {
              padding: "0px 0px !important",
            }
          : {}
      }
    >
      {/* Masonry Grid Container */}
      {viewMode === "explore" ? (
        <Box sx={[staticStylesExploreEvents?.boxContainer]}>
          {isLoading ? (
            <ClipLoader color={"#fff"} loading={isLoading} size={24} />
          ) : (
            filteredEvents?.map((event) =>
              getCard(
                event,
                handlePopoverOpen,
                handleEnrollClick,
                viewMode,
                theme,
                selectedEvent,
                userDetails?.eventIds
              )
            )
          )}
        </Box>
      ) : (
        <Grid container spacing={2} sx={staticStyles?.container?.grid}>
          {isLoading ? (
            <ClipLoader color={"#fff"} loading={isLoading} size={24} />
          ) : (
            filteredEvents?.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event?.id}>
                {getCard(
                  event,
                  handlePopoverOpen,
                  handleEnrollClick,
                  viewMode,
                  theme,
                  selectedEvent,
                  userDetails?.eventIds
                )}
              </Grid>
            ))
          )}
        </Grid>
      )}


      <MoreInfoPopover
        open={open}
        anchorEl={anchorEl}
        items={popoverTags}
        onClose={handlePopoverClose}
      />
    </Container>
  );
};

export default ExploreEvents;
function getCard(
  event: {
    id: number;
    title: string;
    hosts: string[];
    rating: number;
    description: string;
    tags: string[];
    photoUrl: string;
    scheduledTime: string;
    isEnrolled: boolean;
    isStarted: boolean;
    isExpired: boolean;
    loading?: boolean;
  },
  handlePopoverOpen: (
    event: React.MouseEvent<HTMLElement>,
    tags: string[]
  ) => void,
  handleEnrollClick: (event: Event) => void,
  viewMode: string,
  theme: Theme,
  selectedEvent: Event | undefined | null,
  enrolledEventIds?: string[]
) {
  const isEnrolled = enrolledEventIds?.includes(event.id.toString());
  return (
    <Card
      key={event.id}
      sx={
        viewMode === "explore"
          ? staticStylesExploreEvents?.cardStyle
          : [
              staticStyles?.container?.cardContainer(theme),
              dynamicStyles?.container?.cardContainer,
            ]
      }
    >
      <Box
        component="img"
        src={event.photoUrl || defaultEventPic}
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
            {event?.title}
          </Typography>
          <Button
            variant="contained"
            sx={staticStyles?.button?.enrollButton}
            onClick={() => {
              handleEnrollClick(event);
              // setLoading(true);
            }}
          >
            {selectedEvent?.id === event?.id && selectedEvent?.loading ? (
              <ClipLoader
                color={"#fff"}
                loading={
                  selectedEvent?.id === event?.id && selectedEvent?.loading
                }
                size={24}
              />
            ) : isEnrolled ? (
              "Join"
            ) : (
              "Enroll"
            )}
          </Button>
        </Box>
        {/* <Typography variant="h6">{event.title}</Typography> */}
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
            {event.hosts.slice(0, 4).map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                variant="outlined"
                color="primary"
              />
            ))}
            {event.hosts.length > 4 && (
              <Button
                onClick={(e) => handlePopoverOpen(e, event.hosts)}
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
          Scheduled for: {formatDate(event?.scheduledTime)}
        </Typography>
        {/* Event Rating */}
        <Box sx={staticStyles?.container?.ratingContainer}>
          <Rating value={event?.rating} precision={0.1} readOnly />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={staticStyles?.typography?.ratingText}
          >
            ({event?.rating})
          </Typography>
        </Box>

        {/* Event Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: "8px" }}
        >
          {event.description}
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
          {event.tags.slice(0, 5).map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              variant="outlined"
              color="primary"
            />
          ))}
          {event.tags.length > 5 && (
            <Button
              onClick={(e) => handlePopoverOpen(e, event.tags)}
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
}
