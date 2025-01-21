import { defaultEventPic } from "@assets/index";
import { Event } from "@features/common/ExploreEvents";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Modal,
  Typography,
  Avatar,
  useTheme,
  Grid,
} from "@mui/material";
import { format } from "date-fns";
import React, { useEffect } from "react";

interface EventDetailsModalProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  selectedEvent: Event | undefined | null;
  onEnroll: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  open,
  onClose,
  loading,
  selectedEvent,
  onEnroll,
}) => {
  const theme = useTheme();

  useEffect(() => {
    // Any logic to fetch event details if needed, like selectedEvent changes
  }, [selectedEvent]);

  return (
    <Modal open={open} onClose={onClose} disableAutoFocus>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
          width: "90%",
          maxWidth: "800px",
          maxHeight: "80vh", // Limit the height of the modal
          overflowY: "auto",
          boxShadow: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Event Details
        </Typography>

        {/* Grid layout: Image on the left, content on the right */}
        <Grid container spacing={2}>
          {/* Image Section */}
          <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
            <img
              src={selectedEvent?.photoUrl || defaultEventPic}
              alt="Event"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
          </Grid>

          {/* Content Section */}
          <Grid item xs={12} sm={8}>
            {/* Event Title and Enroll Button */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", flex: 1 }}>
                {selectedEvent?.title}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={onEnroll}
                disabled={loading}
                sx={{ alignSelf: "flex-start" }}
              >
                {loading ? <CircularProgress size={24} /> : "Enroll"}
              </Button>
            </Box>

            {/* Event Hosts */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
                Hosts:
              </Typography>
              <Grid container spacing={1}>
                {selectedEvent?.hosts?.map((host, index) => (
                  <Grid item key={index} sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ width: 32, height: 32, mr: 1 }} />
                    <Typography variant="body2">{host}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Scheduled Date and Time */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
                Scheduled Time:
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {selectedEvent?.scheduledTime &&
                  format(new Date(selectedEvent?.scheduledTime), "MMMM dd, yyyy h:mm a")}
              </Typography>
            </Box>

            {/* Event Description */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
                Description:
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ whiteSpace: "pre-wrap" }}>
                {selectedEvent?.description}
              </Typography>
            </Box>

            {/* Event Tags */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
                Tags:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {selectedEvent?.tags?.map((tag, index) => (
                  <Chip key={index} label={tag} size="small" variant="outlined" color="primary" />
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default EventDetailsModal;
