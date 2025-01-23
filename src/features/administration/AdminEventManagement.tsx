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

const AdminEventManagement: React.FC = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reloadEvents, setReloadEvents] = useState(false);
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
        setReloadEvents((prev) => !prev);
      }
    } else {
      setSelectedEvent(null);
      response = await saveEventInDataBase(updatedEventData);
      handleSearch({
        searchText: "",
      });
      setReloadEvents((prev) => !prev);
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

  const handleSearch = async (payload: any) => {
    try {
      setLoading(true);
      const searchFormResponse = await searchEvents(payload);
      if (searchFormResponse?.success) {
        setLoading(false);
        setIsEmpty?.(searchFormResponse?.data?.length === 0);
      } else {
        setLoading(false);
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
      setLoading(false);
      dispatch(
        pushNotification({
          isOpen: true,
          message: CONSTANTS?.API_RESPONSE_MESSAGES?.EVENTS_FETCH_FAILURE,
          type: NotificationTypes?.ERROR,
        })
      );
    }
  };
  const handleEditEvent = (event: Event) => {
    setSelectedEvent({
      ...event,
    });
    setOpenAddModal(true);
  };

    useEffect(() => {
      handleSearch({
        searchText: "",
      });
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
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Box sx={{ marginBottom: 4 }}>
            <img
              src={emptyBinPic}
              alt="No Events"
              style={{ maxWidth: "300px", width: "100%", height: "auto" }}
            />
          </Box>
          <Typography variant="h4" gutterBottom>
            No Events Yet
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            It looks like you don't have any events at the moment. To get
            started, create your first event by clicking the button below.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              setSelectedEvent(null);
              handleOpenModal();
            }}
            sx={{
              marginTop: "20px",
              padding: "15px 30px",
              fontSize: "16px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            Add Event
          </Button>
        </Box>
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
            viewMode="explore"
            selectedTags={[]}
            searchText={""}
            handleEditEvent={handleEditEvent}
            isOnAdministrationPage={true}
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
            setIsEmpty={setIsEmpty}
            reloadEvents={reloadEvents}
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
