import MoreInfoPopover from "@components/MoreInfoPopover";
import EventDetailsModal from "@features/administration/EventDetailsModal";
import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
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
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import EventCard from "./EventCard";
import {
  handleNotification,
  handleResponseMessage,
} from "@utils/dispatchNotification";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppRouteQueries,
  AppRoutes,
  AppRoutesCombination,
  AppSubRouteCombinations,
  AppSubRoutes,
} from "@utils/AppRoutes";
import EmptyBin from "@components/EmptyBin";

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
      transition: "transform 0.3s ease-in-out",
      "&:hover": {
        cursor: "pointer",
        transform: "scale(1.04)",
      },
    }),
    cardImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    liveContainer: {
      position: "absolute",
      top: "0px",
      left: "0px",
      p: "8px",
      backgroundColor: "rgb(255, 255, 255,0.5)",
      borderBottomRightRadius: 4,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 0.5,
    },
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
    browseHeader: {
      color: "text.secondary",
      fontWeight: 600,
      textAlign: "center",
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
  boxContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
    gap: 3,
    padding: 0,
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
    transition: "transform 0.3s ease-in-out",
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
  page: string;
  viewMode: "explore" | "browse";
  selectedTags: string[];
  searchText: string;
  isOnAdministrationPage?: boolean;
  handleEditEvent: (event: Event) => void;
  selectedEvent: Event | null | undefined;
  setSelectedEvent: (event: Event | undefined | null) => void;
  setIsEmpty?: (value: boolean) => void;
  reloadEvents?: boolean;
  setReloadEvents?: Dispatch<SetStateAction<boolean | undefined>>;
}

const ExploreEvents = ({
  page,
  viewMode,
  selectedTags,
  searchText = "",
  isOnAdministrationPage = false,
  selectedEvent = undefined,
  handleEditEvent = () => {},
  setSelectedEvent,
  setIsEmpty,
  reloadEvents,
  setReloadEvents,
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
  const location = useLocation();
  const [sortedFilteredEvents, setSortedFilteredEvents] = useState<
    Event[] | null | undefined
  >([]);
  const [previousCaller, setPreviousCaller] = useState<string>("");
  const [userDetails, setUserDetails] = useState<any>();

  useEffect(() => {
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
                new Date(event?.scheduledTime)?.getTime() >
                new Date()?.getTime();

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

    const resultEvents = isOnAdministrationPage
      ? filteredEvents
      : filteredEvents?.sort((a, b) => {
          const dateA: any = new Date(a?.scheduledTime);
          const dateB: any = new Date(b?.scheduledTime);

          return dateA - dateB;
        });
    setSortedFilteredEvents([...resultEvents]);
  }, [browsedEvents, selectedTags]);

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

  const handleSearch = async (payload: any, caller: string) => {
    if (previousCaller === caller) return;
    setPreviousCaller(caller);
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
    handleSearch(
      getSearchPayload(page, searchText, userDetails),
      "handleReload"
    );
  };

  const handleCardClick = (eventDetails: Event) => {
    setLocalEventDetails(eventDetails);
    const pathName = location.pathname;
    navigate(pathName + AppRouteQueries.EVENT_SEARCH + eventDetails?.id);
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

  useEffect(() => {
    if (isTokenActive) {
      fetchUserDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (reloadEvents) {
      handleReload();
      setReloadEvents?.(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadEvents]);

  useEffect(() => {
    if (
      location.pathname.startsWith("/dashboard") &&
      page &&
      (searchText !== null || searchText !== undefined) &&
      userDetails &&
      page + searchText + userDetails !== previousCaller
    ) {
      const payload = getSearchPayload(page, searchText, userDetails);
      handleSearch(payload, page + searchText + userDetails);
    } else if (
      !isOnAdministrationPage &&
      location.pathname.startsWith(AppRoutes.BROWSE_EVENTS)
    ) {
      const payload = getSearchPayload(page, searchText, null);
      handleSearch(payload, "handleSearch" + searchText);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchText, userDetails, location]);

  const handleEventDetailsModalClose = () => {
    navigate(location.pathname);
    setOpenEventDetails(false);
  };

  const handleOpenModal = () => {};
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
      {sortedFilteredEvents &&
        sortedFilteredEvents?.length <= 0 &&
        page != AppRoutes.WELLNESS && (
          <EmptyBin
            setSelectedEvent={setSelectedEvent}
            onClick={handleOpenModal}
            buttonText={"Explore"}
            isShowButton={page != AppRoutes.BROWSE_EVENTS}
          />
        )}
      {sortedFilteredEvents &&
        sortedFilteredEvents?.length > 0 &&
        page === AppRoutes.WELLNESS && (
          <Typography variant="h5" sx={staticStyles?.typography?.browseHeader}>
            My Enrollments
          </Typography>
        )}
      {/* Masonry Grid Container */}
      {viewMode === "explore" ? (
        <Box
          sx={
            sortedFilteredEvents && sortedFilteredEvents?.length > 0
              ? [staticStylesExploreEvents?.boxContainer]
              : [dynamicStyles?.boxContainer]
          }
        >
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
        onClose={handleEventDetailsModalClose}
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

const getSearchPayload = (
  page: string,
  searchText: string,
  userDetails: any
): {
  searchText: string;
  idsList?: string[];
  expired?: boolean;
} => {
  switch (page) {
    case AppSubRouteCombinations.MY_EVENTS_UPCOMING:
    case AppRoutes.WELLNESS:
      return {
        searchText,
        idsList: userDetails?.eventIds ?? [],
        expired: false,
      };
    case AppSubRouteCombinations.MY_EVENTS_PAST:
      return {
        searchText,
        idsList: userDetails?.eventIds ?? [],
        expired: true,
      };
    case AppSubRoutes.ADMIN:
    case AppSubRoutes.EXPLORE_EVENTS:
    case AppRoutes.BROWSE_EVENTS:
      return {
        searchText,
      };
    default:
      return {
        searchText: "",
      };
  }
};
