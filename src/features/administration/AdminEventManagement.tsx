// AdminEventManagement.tsx
import React, { useState } from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { defaultEventPic, emptyBinPic } from "@assets/index";
import AddEventModal from "./AddEventModal"; // Import the new AddEventModal component
import { saveEventInDataBase } from "@services/eventsService";

const AdminEventManagement: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const availableTags = [
    "Fitness",
    "Yoga",
    "Lifestyle",
    "Health",
    "Mindfulness",
  ];
  const availableHosts = ["Host1", "Host2", "Host3", "Host4"];

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSaveEvent = async (eventData: any) => {
    setLoading(true);
    console.log("Saving event", eventData);
    const response = await saveEventInDataBase(eventData);
    if (response?.success) {
      console.log("response here", response);
    }
    setLoading(false);
    handleCloseModal();
  };

  const handleStartEvent = (eventData: any) => {
    setLoading(true);
    console.log("Starting event", eventData);
    setLoading(false);
    handleCloseModal();
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
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
          It looks like you don't have any events at the moment. To get started,
          create your first event by clicking the button below.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleOpenModal}
          sx={{
            marginTop: "20px",
            padding: "15px 30px",
            fontSize: "16px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              backgroundColor: "#0069d9",
              boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          Add Event
        </Button>
      </Box>

      <AddEventModal
        open={openModal}
        onClose={handleCloseModal}
        onSave={handleSaveEvent}
        onStart={handleStartEvent}
        loading={loading}
        availableTags={availableTags}
        availableHosts={availableHosts}
        defaultEventPic={defaultEventPic}
        emptyBinPic={emptyBinPic}
        availableParticipants={[]}
      />
    </Container>
  );
};

export default AdminEventManagement;
