import { cardPic1, eventPic1, eventPic2 } from "@assets/index";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Card,
  CardContent,
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
    image: eventPic1,
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
    image: eventPic2,
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
      alignItems: "center",
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

const BrowseEventsComponent: React.FC = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [popoverTags, setPopoverTags] = useState<string[]>([]);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date?.toLocaleString();
  };

  return (
    <Container sx={staticStyles?.container?.mainContainer} maxWidth={false}>
      {/* Container for the event cards */}
      <Grid container spacing={2} sx={staticStyles?.container?.grid}>
        {/* Map through events and render each card */}
        {[...events, ...events, ...events].map((event) => (
          <Grid item xs={12} sm={14} md={6} key={event?.id}>
            <Card
              sx={[
                staticStyles?.container?.cardContainer(theme),
                dynamicStyles?.container?.cardContainer,
              ]}
            >
              <Box
                component="img"
                sx={[
                  staticStyles?.container?.cardMediaContainer,
                  dynamicStyles?.container?.cardMediaContainer,
                ]}
                src={event?.image}
              />
              <CardContent sx={staticStyles?.container?.cardContentContainer}>
                {/* Event Title */}
                <Box sx={staticStyles?.container?.contentHeader}>
                  <Typography
                    variant="h6"
                    sx={staticStyles?.typography?.boldText}
                  >
                    {event?.title}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={staticStyles?.button?.enrollButton}
                  >
                    Enroll
                  </Button>
                </Box>

                {/* Host Name */}
                <Typography variant="body2" color="text.secondary">
                  Hosted by: {event?.host}
                </Typography>

                {/* Rating */}
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

                {/* Scheduled Time */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={staticStyles?.typography.scheduleText}
                >
                  Scheduled for: {formatDate(event?.scheduledTime)}
                </Typography>

                {/* Event Description */}
                <Typography
                  variant="body2"
                  sx={staticStyles?.typography?.scheduleText}
                >
                  {event?.description}
                </Typography>

                {/* Tags */}
                <Box sx={staticStyles?.container?.tagsContainer}>
                  {event?.tags?.slice(0, 3).map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                  ))}
                  {event?.tags?.length > 3 && (
                    <Button
                      onClick={(e) => handlePopoverOpen(e, event?.tags)}
                      sx={staticStyles?.button?.moreButton}
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
        <Box sx={staticStyles?.container?.popoverContainer}>
          <Box sx={staticStyles?.container?.popoverTagsContainer}>
            {popoverTags?.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                variant="outlined"
                color="primary"
              />
            ))}
          </Box>
          <Box sx={staticStyles?.container?.closeButton}>
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
