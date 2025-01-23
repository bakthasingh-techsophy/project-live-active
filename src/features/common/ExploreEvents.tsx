import MoreInfoPopover from "@components/MoreInfoPopover";
import EventDetailsModal from "@features/administration/EventDetailsModal";
import { Box, Container, Grid, useTheme } from "@mui/material";
import { pushNotification } from "@redux/slices/loadingSlice";
import { searchEvents } from "@services/eventsService";
import { getUserDetails } from "@services/userManagementService";
import { CONSTANTS } from "@utils/constants";
import { getLocalStorageItem } from "@utils/encrypt";
import { isTokenExpired } from "@utils/tokenUtils";
import { NotificationTypes } from "@utils/types";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import EventCard from "./EventCard";

export interface Event {
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
  updated?: boolean;
  duration: number;
  password: string;
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
    gap: "16px", // Gap between items
    padding: 3,
  },
  cardStyle: { display: "flex", flexDirection: "column", position: "relative" },
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
}: ExploreEventsProps) => {
  const theme = useTheme();
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
        ? browsedEvents.sort((a, b) => {
            const now = new Date().getTime();
            const timeA = new Date(a.scheduledTime).getTime();
            const timeB = new Date(b.scheduledTime).getTime();

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
              new Date(event?.scheduledTime).getTime() > new Date().getTime();

            return upcoming;
          })
      : browsedEvents?.filter((event) => {
          const tagsMatch = event?.tags?.some((tag) =>
            selectedTags?.some(
              (selectedTag: any) =>
                tag.toLowerCase() === selectedTag.toLowerCase()
            )
          );
          const isUpcoming =
            new Date(event?.scheduledTime).getTime() > new Date().getTime();

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
  }, []);

  useEffect(() => {
    const payload = {
      searchText: searchText,
    };
    handleSearch(payload);
  }, [searchText]);

  const handleCardClick = (eventDetails: Event) => {
    setLocalEventDetails(eventDetails);
    setOpenEventDetails(true);
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
                setSelectedEvent={setSelectedEvent}
                handleReload={handleReload}
                handleCardClick={handleCardClick}
              />
            ))
          )}
        </Box>
      ) : (
        <Grid container spacing={2} sx={staticStyles?.container?.grid}>
          {isLoading ? (
            <ClipLoader color={"#fff"} loading={isLoading} size={24} />
          ) : (
            sortedFilteredEvents?.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event?.id}>
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
                  setSelectedEvent={setSelectedEvent}
                  handleReload={handleReload}
                  handleCardClick={handleCardClick}
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
        onEnroll={function (): void {
          throw new Error("Function not implemented.");
        }}
        loading={isLoading}
        userDetails={userDetails}
      />
    </Container>
  );
};

export default ExploreEvents;
