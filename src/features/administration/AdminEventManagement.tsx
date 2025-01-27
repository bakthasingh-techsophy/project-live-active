// AdminEventManagement.tsx
import { emptyBinPic } from "@assets/index";
import ExploreEvents from "@features/common/ExploreEvents";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Container, Typography } from "@mui/material";
import { pushNotification } from "@redux/slices/loadingSlice";
import { AppDispatch } from "@redux/store";
import {
  saveEventInDataBase,
  searchEvents,
  updateEventInDatabase,
} from "@services/eventsService";
import { CONSTANTS } from "@utils/constants";
import { handleResponseMessage } from "@utils/dispatchNotification";
import { Event, NotificationTypes } from "@utils/types";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AddEventModal from "./AddEventModal";
import { AppRouteQueryValues, AppSubRoutes } from "@utils/AppRoutes";
import EmptyBin from "../../components/EmptyBin";

const AdminEventManagement: React.FC = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reloadEvents, setReloadEvents] = useState<boolean | undefined>(
    undefined
  );
  const [selectedEvent, setSelectedEvent] = useState<
    Event | undefined | null
  >();
  const [isEmpty, setIsEmpty] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const availableTags = [
    "Fitness",
    "Yoga",
    "Lifestyle",
    "Health",
    "Mindfulness",
  ];
  const availableHosts = ["Host1", "Host2", "Host3", "Host4"];

  const handleOpenModal = () => {
    setOpenAddModal(true);
  };
  const handleCloseModal = () => {
    setSelectedEvent(null);
    setOpenAddModal(false);
  };

  const handleSaveEvent = async (eventData: Event) => {
    setLoading(true);
    let response;
    const durationInMinutes = eventData?.duration * 60;

    const updatedEventData = {
      ...eventData,
      duration: durationInMinutes,
    };

    if (updatedEventData?.id) {
      const eventId = updatedEventData?.id;
      delete updatedEventData?.updated;
      response = await updateEventInDatabase(eventId, updatedEventData);
      if (response?.success) {
        setSelectedEvent((prev) => {
          if (prev) prev.updated = true;
          return { ...prev } as Event;
        });
        setReloadEvents(true);
      }
    } else {
      setSelectedEvent(null);
      response = await saveEventInDataBase(updatedEventData);
      // handleSearch({
      //   searchText: "",
      // });
      setReloadEvents(true);
    }

    handleResponseMessage(
      response,
      dispatch,
      CONSTANTS?.API_RESPONSE_MESSAGES?.EVENT_SAVE_SUCCESS,
      CONSTANTS?.API_RESPONSE_MESSAGES?.EVENT_SAVE_FAILURE
    );

    setLoading(false);
    handleCloseModal();
  };

  // const handleSearch = async (payload: any) => {
  //   try {
  //     setLoading(true);
  //     const searchFormResponse = await searchEvents(payload);
  //     if (searchFormResponse?.success) {
  //       setLoading(false);
  //       setIsEmpty?.(searchFormResponse?.data?.length === 0);
  //     } else {
  //       setLoading(false);
  //       dispatch(
  //         pushNotification({
  //           isOpen: true,
  //           message:
  //             searchFormResponse?.message ||
  //             CONSTANTS?.API_RESPONSE_MESSAGES?.EVENTS_FETCH_FAILURE,
  //           type: NotificationTypes?.ERROR,
  //         })
  //       );
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setLoading(false);
  //     dispatch(
  //       pushNotification({
  //         isOpen: true,
  //         message: CONSTANTS?.API_RESPONSE_MESSAGES?.EVENTS_FETCH_FAILURE,
  //         type: NotificationTypes?.ERROR,
  //       })
  //     );
  //   }
  // };
  const handleEditEvent = (event: Event) => {
    setSelectedEvent({
      ...event,
    });
    setOpenAddModal(true);
  };

  useEffect(() => {
    // handleSearch({
    //   searchText: "",
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        height: "100vh",
        position: "relative",
        p: 3,
      }}
    >
      {isEmpty && (
        <EmptyBin
          setSelectedEvent={setSelectedEvent}
          onClick={handleOpenModal}
          isShowButton
          buttonText="Add Event"
        />
      )}

      {!isEmpty && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              setSelectedEvent(null);
              handleOpenModal();
            }}
            sx={{
              alignSelf: "flex-end",
              fontSize: "16px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              mr: 3,
              "&:hover": {
                boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <AddIcon /> Add Event
          </Button>
          <ExploreEvents
            page={AppSubRoutes.ADMIN}
            viewMode="explore"
            selectedTags={[]}
            searchText={""}
            handleEditEvent={handleEditEvent}
            isOnAdministrationPage={true}
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
            setIsEmpty={setIsEmpty}
            reloadEvents={reloadEvents}
            setReloadEvents={setReloadEvents}
          />
        </Box>
      )}
      <AddEventModal
        open={openAddModal}
        onClose={handleCloseModal}
        onSave={handleSaveEvent}
        loading={loading}
        availableTags={availableTags}
        availableHosts={availableHosts}
        selectedEvent={selectedEvent}
      />
    </Container>
  );
};

export default AdminEventManagement;
