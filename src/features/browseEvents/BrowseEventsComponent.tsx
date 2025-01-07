import { cardPic1 } from "@assets/index";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  IconButton,
  Popover,
  Rating,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";

// Sample data
const events = [
  {
    id: 1,
    title: "Morning Yoga",
    host: "Sarah Lee",
    rating: 4.5,
    scheduledTime: "2025-01-20T07:30:00",
    description: "Start your day with a calming and energizing yoga session.",
    tags: ["Yoga", "Morning", "Beginner", "Relaxation", "Breathwork"],
    image: cardPic1,
    isEnrolled: false,
    isStarted: false,
    isExpired: true,
  },
  {
    id: 2,
    title: "HIIT Bootcamp",
    host: "John Doe",
    rating: 4.8,
    scheduledTime: "2025-01-21T10:00:00",
    description: "High-intensity interval training for ultimate fitness!",
    tags: ["HIIT", "Strength", "Cardio", "Fitness", "Endurance"],
    image: cardPic1,
    isEnrolled: true,
    isStarted: false,
    isExpired: false,
  },
  {
    id: 3,
    title: "Healthy Cooking Class",
    host: "Emma Green",
    rating: 4.2,
    scheduledTime: "2025-01-22T16:00:00",
    description: "Join us for a cooking class with healthy meal ideas.",
    tags: [
      "Cooking",
      "Healthy",
      "Meal Prep",
      "Nutrition",
      "Wellness",
      "Cooking",
      "Healthy",
      "Meal Prep",
      "Nutrition",
      "Wellness",
    ],
    image: cardPic1,
    isEnrolled: false,
    isStarted: true,
    isExpired: false,
  },
];

const BrowseEventsComponent: React.FC = () => {
  const theme = useTheme();
  // const [expandedTags, setExpandedTags] = useState<Record<number, boolean>>({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [popoverTags, setPopoverTags] = useState<string[]>([]);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    tags: string[]
  ) => {
    setAnchorEl(event.currentTarget);
    setPopoverTags(tags);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPopoverTags([]);
  };

  const open = Boolean(anchorEl);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Customize this to your preferred format
  };

  return (
    <Container sx={{ padding: 4 }} maxWidth={false}>
      {/* Container for the event cards */}
      <Grid
        container
        spacing={2}
        sx={{
          px: 2,
        }}
      >
        {/* Map through events and render each card */}
        {[...events, ...events].map((event) => (
          <Grid item xs={12} sm={14} md={6} key={event.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: {
                  lg: "row",
                  md: "row",
                  sm: "row",
                  xs: "column",
                },
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper,
                position: "relative",
                height: "100%",
                overflow: "hidden", // To prevent content overflow issues
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: {
                    lg: "40%",
                    sm: "40%",
                    md: "40%",
                    xs: "100%",
                  },
                  // height: "200px", // Fixed height for consistent image size
                  objectFit: "cover",
                }}
                image={event.image}
                alt={event.title}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: 2,
                  flex: 1,
                }}
              >
                {/* Event Title */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {event.title}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      whiteSpace: "nowrap",
                      fontSize: "0.8rem",
                    }}
                    // disabled={event.isExpired || !event.isStarted}
                  >
                    Enroll
                  </Button>
                </Box>

                {/* Host Name */}
                <Typography variant="body2" color="text.secondary">
                  Hosted by: {event.host}
                </Typography>

                {/* Rating */}
                <Box
                  sx={{ display: "flex", alignItems: "center", marginTop: 1 }}
                >
                  <Rating value={event.rating} precision={0.1} readOnly />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginLeft: 1 }}
                  >
                    ({event.rating})
                  </Typography>
                </Box>

                {/* Scheduled Time */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginTop: 1 }}
                >
                  Scheduled for: {formatDate(event.scheduledTime)}
                </Typography>

                {/* Event Description */}
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  {event.description}
                </Typography>

                {/* Tags */}
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    marginTop: 2,
                  }}
                >
                  {event.tags.slice(0, 3).map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                  ))}
                  {event.tags.length > 3 && (
                    <Button
                      onClick={(e) => handlePopoverOpen(e, event.tags)}
                      sx={{
                        textTransform: "none",
                        fontSize: "12px",
                        marginLeft: 1,
                      }}
                      color="primary"
                    >
                      ...More
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

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
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
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
          <Box sx={{ marginTop: 1, textAlign: "right" }}>
            <IconButton onClick={handlePopoverClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </Popover>
    </Container>
  );
};

export default BrowseEventsComponent;
