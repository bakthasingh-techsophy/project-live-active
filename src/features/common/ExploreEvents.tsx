import MoreInfoPopover from "@components/MoreInfoPopover";
import EventDetailsModal from "@features/administration/EventDetailsModal";
import { Box, Container, Grid, useTheme } from "@mui/material";
import { pushNotification } from "@redux/slices/loadingSlice";
import {
  enrollOrJoinEvent,
  getEventLinks,
  searchEvents,
} from "@services/eventsService";
import { getUserDetails } from "@services/userManagementService";
import { CONSTANTS } from "@utils/constants";
import { getLocalStorageItem } from "@utils/encrypt";
import { isTokenExpired } from "@utils/tokenUtils";
import { Event, NotificationTypes } from "@utils/types";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import EventCard from "./EventCard";
import {
  handleNotification,
  handleResponseMessage,
} from "@utils/dispatchNotification";
import { useNavigate } from "react-router-dom";
import { AppRouteQueries } from "@utils/AppRoutes";

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
      "&:hover": {
        cursor: "pointer",
        transform: "scale(1.04)",
      },
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
      gap: 3,
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
    boldText: {
      fontWeight: "bold",
      maxWidth: "20rem", // Adjust based on your container width
      overflow: "hidden", // Hide overflowed content
      textOverflow: "ellipsis", // Add ellipsis when the text overflows
    },
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
    gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", // Auto-fill grid with responsive column size
    gap: 3, // Gap between items
    padding: 3,
  },
  cardStyle: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.04)",
    },
  },
  cardImage: {
    width: "100%",
    height: "200px", // Fixed height for the image
    objectFit: "cover",
  },
};

interface ExploreEventsProps {
  viewMode: "explore" | "browse";
  selectedTags: string[];
  searchText: string;
  isOnAdministrationPage?: boolean;
  handleEditEvent: (event: Event) => void;
  selectedEvent: Event | null | undefined;
  setSelectedEvent: (event: Event | undefined | null) => void;
  setIsEmpty?: (value: boolean) => void;
  reloadEvents?: boolean;
}

const ExploreEvents = ({
  viewMode,
  selectedTags,
  searchText = "",
  isOnAdministrationPage = false,
  selectedEvent = undefined,
  handleEditEvent = () => {},
  setSelectedEvent,
  setIsEmpty,
  reloadEvents,
}: ExploreEventsProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isTokenActive = !isTokenExpired();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [popoverTags, setPopoverTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [browsedEvents, setBrowsedEvents] = useState<Event[]>([]);
  const [openEventDetails, setOpenEventDetails] = useState(false);
  const [localEventDetails, setLocalEventDetails] = useState<
    Event | undefined | null
  >();

  const [userDetails, setUserDetails] = useState<any>();

  const filteredEvents =
    selectedTags?.length === 0
      ? isOnAdministrationPage
        ? browsedEvents?.sort((a, b) => {
            const now = new Date()?.getTime();
            const timeA = new Date(a?.scheduledTime)?.getTime();
            const timeB = new Date(b?.scheduledTime)?.getTime();

            const isUpcomingA = timeA > now;
            const isUpcomingB = timeB > now;

            if (isUpcomingA && !isUpcomingB) {
              return -1;
            } else if (!isUpcomingA && isUpcomingB) {
              return 1;
            } else if (isUpcomingA && isUpcomingB) {
              return timeA - timeB;
            } else {
              return timeB - timeA;
            }
          })
        : browsedEvents?.filter((event) => {
            const upcoming =
              new Date(event?.scheduledTime)?.getTime() > new Date()?.getTime();

            return upcoming;
          })
      : browsedEvents?.filter((event) => {
          const tagsMatch = event?.tags?.some((tag) =>
            selectedTags?.some(
              (selectedTag: any) =>
                tag?.toLowerCase() === selectedTag?.toLowerCase()
            )
          );
          const isUpcoming =
            new Date(event?.scheduledTime)?.getTime() > new Date()?.getTime();

          return tagsMatch && isUpcoming;
        });

  const sortedFilteredEvents = isOnAdministrationPage
    ? filteredEvents
    : filteredEvents?.sort((a, b) => {
        const dateA: any = new Date(a?.scheduledTime);
        const dateB: any = new Date(b?.scheduledTime);

        return dateA - dateB;
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

  const open = Boolean(anchorEl);

  const handleSearch = async (payload: any) => {
    try {
      setIsLoading(true);

      const searchFormResponse = await searchEvents(payload);

      if (searchFormResponse?.success) {
        setIsLoading(false);
        setBrowsedEvents(searchFormResponse?.data);
        setIsEmpty?.(searchFormResponse?.data?.length === 0);
      } else {
        setIsLoading(false);
        dispatch(
          pushNotification({
            isOpen: true,
            message:
              searchFormResponse?.message ||
              CONSTANTS?.API_RESPONSE_MESSAGES?.EVENTS_FETCH_FAILURE,
            type: NotificationTypes?.ERROR,
          })
        );
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      dispatch(
        pushNotification({
          isOpen: true,
          message: CONSTANTS?.API_RESPONSE_MESSAGES?.EVENTS_FETCH_FAILURE,
          type: NotificationTypes?.ERROR,
        })
      );
    }
  };

  const fetchUserDetails = async () => {
    if (isTokenExpired()) return;
    const userId = getLocalStorageItem(CONSTANTS?.USER_ID);

    try {
      const getUserResponse = await getUserDetails(userId || "");
      if (getUserResponse?.success) {
        setUserDetails({ ...getUserResponse?.data });
      } else {
        dispatch(
          pushNotification({
            isOpen: true,
            message:
              getUserResponse?.message ||
              CONSTANTS?.API_RESPONSE_MESSAGES?.USER_DETAILS_FETCH_FAILURE,
            type: NotificationTypes?.ERROR,
          })
        );
      }
    } catch (error) {
      console.error(error);
      dispatch(
        pushNotification({
          isOpen: true,
          message: CONSTANTS?.API_RESPONSE_MESSAGES?.USER_DETAILS_FETCH_FAILURE,
          type: NotificationTypes?.ERROR,
        })
      );
    }
  };

  const handleEnrollOrJoinClick = async (eventId: any, isEnrolled?: any) => {
    if (!isTokenExpired()) {
      const payload = {
        [`${isEnrolled ? "join" : "enroll"}List`]: [
          getLocalStorageItem(CONSTANTS?.USER_EMAIL),
        ],
      };

      try {
        const enrollOrJoinFormResponse = await enrollOrJoinEvent(
          payload,
          eventId
        );
        handleResponseMessage(
          enrollOrJoinFormResponse,
          dispatch,
          isEnrolled
            ? CONSTANTS?.API_RESPONSE_MESSAGES?.EVENT_JOINED_SUCCESS
            : CONSTANTS?.API_RESPONSE_MESSAGES?.EVENT_ENROLL_SUCCESS,
          isEnrolled
            ? CONSTANTS?.API_RESPONSE_MESSAGES?.EVENT_JOINED_FAILURE
            : CONSTANTS?.API_RESPONSE_MESSAGES?.EVENT_ENROLL_FAILURE
        );
        handleReload();
      } catch (error: any) {
        handleNotification(
          dispatch,
          error,
          isEnrolled
            ? CONSTANTS?.API_RESPONSE_MESSAGES?.EVENT_JOINED_SUCCESS
            : CONSTANTS?.API_RESPONSE_MESSAGES?.EVENT_ENROLL_SUCCESS
        );
      }
      return;
    }
    navigate(AppRouteQueries?.AUTH_LOGIN);
  };

  const handleReload = () => {
    fetchUserDetails();
    handleSearch({
      searchText: "",
    });
  };

  useEffect(() => {
    if (isTokenActive) {
      fetchUserDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleReload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadEvents]);

  useEffect(() => {
    const payload = {
      searchText: searchText,
    };
    handleSearch(payload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const handleCardClick = (eventDetails: Event) => {
    setLocalEventDetails(eventDetails);
    setOpenEventDetails(true);
  };

  const handleStartEvent = async (eventId: number) => {
    if (!isTokenExpired()) {
      setIsLoading(true);
      try {
        const eventLinkResponse = await getEventLinks(eventId);
        if (eventLinkResponse?.success) {
          window.open(eventLinkResponse?.data?.startLink, "_blank");
        } else {
          dispatch(
            pushNotification({
              isOpen: true,
              message:
                eventLinkResponse?.message ||
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
      setIsLoading(false);

      return;
    }
    navigate(AppRouteQueries?.AUTH_LOGIN);
  };

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
            sortedFilteredEvents?.map((event) => (
              <EventCard
                event={event}
                handlePopoverOpen={handlePopoverOpen}
                viewMode={viewMode}
                theme={theme}
                selectedEvent={selectedEvent}
                isOnAdministrationPage={isOnAdministrationPage}
                staticStyles={staticStyles}
                staticStylesExploreEvents={staticStylesExploreEvents}
                dynamicStyles={dynamicStyles}
                enrolledEventIds={userDetails?.eventIds} // Assuming event IDs are from userDetails
                handleEditEvent={handleEditEvent}
                handleEnrollOrJoinClick={handleEnrollOrJoinClick}
                setSelectedEvent={setSelectedEvent}
                handleReload={handleReload}
                handleStartEvent={handleStartEvent}
                handleCardClick={handleCardClick}
              />
            ))
          )}
        </Box>
      ) : (
        <Grid container spacing={4} sx={staticStyles?.container?.grid}>
          {isLoading ? (
            <ClipLoader color={"#fff"} loading={isLoading} size={24} />
          ) : (
            sortedFilteredEvents?.map((event) => (
              <Grid item xs={12} sm={100} md={100} lg={6} key={event?.id}>
                <EventCard
                  event={event}
                  handlePopoverOpen={handlePopoverOpen}
                  viewMode={viewMode}
                  theme={theme}
                  selectedEvent={selectedEvent}
                  isOnAdministrationPage={isOnAdministrationPage}
                  staticStyles={staticStyles}
                  staticStylesExploreEvents={staticStylesExploreEvents}
                  dynamicStyles={dynamicStyles}
                  enrolledEventIds={userDetails?.eventIds} // Assuming event IDs are from userDetails
                  handleEditEvent={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  handleEnrollOrJoinClick={handleEnrollOrJoinClick}
                  setSelectedEvent={setSelectedEvent}
                  handleReload={handleReload}
                  handleCardClick={handleCardClick}
                  handleStartEvent={handleStartEvent}
                />
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
      <EventDetailsModal
        selectedEvent={localEventDetails}
        open={openEventDetails}
        onClose={() => setOpenEventDetails(false)}
        onEnroll={handleEnrollOrJoinClick}
        loading={isLoading}
        userDetails={userDetails}
        isOnAdministrationPage={isOnAdministrationPage}
        handleStartEvent={handleStartEvent}
      />
    </Container>
  );
};

export default ExploreEvents;
