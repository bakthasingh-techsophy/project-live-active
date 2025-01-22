import { defaultEventPic } from "@assets/index";
import { Event } from "@features/common/ExploreEvents";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  Modal,
  Typography
} from "@mui/material";
import { format } from "date-fns";
import React, { useEffect } from "react";

interface EventDetailsModalProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  selectedEvent: Event | undefined | null;
  onEnroll: () => void;
  userDetails: any;
  timePeriod?: "upcoming" | "past";
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  open,
  onClose,
  loading,
  selectedEvent,
  onEnroll,
  userDetails,
  timePeriod = "upcoming",
}) => {
  useEffect(() => {
    // Any logic to fetch event details if needed, like selectedEvent changes
  }, [selectedEvent]);

  const isUserEnrolled = userDetails?.eventIds?.includes(selectedEvent?.id);

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
          maxHeight: "80vh",
          overflowY: "auto",
          boxShadow: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Event Details
        </Typography>

        <Grid container spacing={2}>
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
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", flex: 1 }}>
                {selectedEvent?.title}
              </Typography>
              {timePeriod === "upcoming" && (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={onEnroll}
                  disabled={loading}
                  sx={{ alignSelf: "flex-start" }}
                >
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : isUserEnrolled ? (
                    "Join"
                  ) : (
                    "Enroll"
                  )}
                </Button>
              )}
            </Box>

            {/* Event Hosts */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
                Hosts:{" "}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {(selectedEvent?.hosts ?? [])?.length > 0
                  ? selectedEvent?.hosts?.join(", ")
                  : "No hosts available"}
              </Typography>
            </Box>

            {/* Scheduled Date and Time */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
                Scheduled Time:
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {selectedEvent?.scheduledTime &&
                  format(
                    new Date(selectedEvent?.scheduledTime),
                    "MMMM dd, yyyy h:mm a"
                  )}
              </Typography>
            </Box>

            {/* Event Description */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
                Description:
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ whiteSpace: "pre-wrap" }}
              >
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
                  <Chip
                    key={index}
                    label={tag}
                    size="small"
                    variant="outlined"
                    color="primary"
                  />
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
