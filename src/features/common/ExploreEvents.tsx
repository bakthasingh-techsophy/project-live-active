import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Typography,
  Button,
  Popover,
  IconButton,
  Rating,
  useTheme,
  Theme,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { isTokenExpired } from "@utils/tokenUtils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppRouteQueries } from "@utils/AppRoutes";
import { searchEvents } from "@services/eventsService";
import { pushNotification } from "@redux/slices/loadingSlice";
import { CONSTANTS } from "@utils/constants";
import { NotificationTypes } from "@utils/types";
import { ClipLoader } from "react-spinners";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date?.toLocaleString();
};

interface Event {
  id: number;
  title: string;
  host: string;
  rating: number;
  scheduledTime: string;
  description: string;
  tags: string[];
  photoUrl: string;
  isEnrolled: boolean;
  isStarted: boolean;
  isExpired: boolean;
}

// Sample data
const staticStyles = {
  container: {
    mainContainer: { padding: 4 },
    grid: {
      px: 2,
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
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [popoverTags, setPopoverTags] = useState<string[]>([]);
  const [browsedEvents, setBrowsedEvents] = useState<Event[]>([]);

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

  const handleEnrollClick = () => {
    if (isTokenActive) {
      console.log("Enroll Clicked");
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

  useEffect(() => {
    const payload = {
      searchText: searchText,
    };
    handleSearch(payload);
  }, [searchText]);

  return (
    <Container maxWidth={false}>
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
                theme
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
                  theme
                )}
              </Grid>
            ))
          )}
        </Grid>
      )}

      {/* Popover for Tags */}
      <Popover
        id="tag-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ padding: 2, maxWidth: 300 }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {popoverTags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                variant="outlined"
                color="primary"
              />
            ))}
          </Box>
          <Box sx={{ textAlign: "right", marginTop: "8px" }}>
            <IconButton onClick={handlePopoverClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </Popover>
    </Container>
  );
};

export default ExploreEvents;
function getCard(
  event: {
    id: number;
    title: string;
    host: string;
    rating: number;
    description: string;
    tags: string[];
    photoUrl: string;
    scheduledTime: string;
    isEnrolled: boolean;
    isStarted: boolean;
    isExpired: boolean;
  },
  handlePopoverOpen: (
    event: React.MouseEvent<HTMLElement>,
    tags: string[]
  ) => void,
  handleEnrollClick: () => void,
  viewMode: string,
  theme: Theme
) {
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
        src={event.photoUrl}
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
            onClick={handleEnrollClick}
          >
            Enroll
          </Button>
        </Box>
        {/* <Typography variant="h6">{event.title}</Typography> */}
        <Typography variant="body2" color="text.secondary">
          Hosted by: {event.host}
        </Typography>

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
