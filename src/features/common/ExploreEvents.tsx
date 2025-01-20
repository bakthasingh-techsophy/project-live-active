import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Typography,
  Button,
  Popover,
  IconButton,
  Rating,
  useTheme,
  Theme,
  Grid,
} from "@mui/material";
import { eventPic1, eventPic2 } from "@assets/index"; // Example image imports
import CloseIcon from "@mui/icons-material/Close";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date?.toLocaleString();
};
// Sample event data
const events = [
  {
    id: 1,
    title: "Morning Yoga",
    host: "Sarah Lee",
    rating: 4.5,
    description: "Start your day with a calming and energizing yoga session.",
    tags: ["Yoga", "Morning", "Beginner", "Relaxation", "Breathwork"],
    image: eventPic1,
    scheduledTime: "2025-01-21T10:00:00",
    isEnrolled: true,
    isStarted: false,
    isExpired: false,
  },
  {
    id: 2,
    title: "HIIT Bootcamp",
    host: "John Doe",
    rating: 4.8,
    description: "High-intensity interval training for ultimate fitness!",
    tags: ["HIIT", "Strength", "Cardio", "Fitness", "Endurance"],
    image: eventPic2,
    scheduledTime: "2025-01-22T11:00:00",
    isEnrolled: false,
    isStarted: false,
    isExpired: false,
  },
  {
    id: 3,
    title: "Healthy Cooking Class",
    host: "Emma Green",
    rating: 4.2,
    description: "Join us for a cooking class with healthy meal ideas.",
    tags: [
      "Cooking",
      "Healthy",
      "Meal Prep",
      "Nutrition",
      "Wellness",
      "Vegan",
      "Diet",
      "Healthy Lifestyle",
    ],
    image: eventPic1,
    scheduledTime: "2025-01-23T12:00:00",
    isEnrolled: true,
    isStarted: false,
    isExpired: false,
  },
  {
    id: 4,
    title: "Meditation for Mindfulness",
    host: "Liam O'Connor",
    rating: 4.7,
    description:
      "Learn meditation techniques to enhance mindfulness and reduce stress.",
    tags: [
      "Meditation",
      "Mindfulness",
      "Stress Relief",
      "Relaxation",
      "Mental Health",
    ],
    image: eventPic2,
    scheduledTime: "2025-01-24T13:00:00",
    isEnrolled: false,
    isStarted: false,
    isExpired: false,
  },
  {
    id: 5,
    title: "Advanced Strength Training",
    host: "David Smith",
    rating: 4.9,
    description: "Push your limits with advanced strength training techniques.",
    tags: [
      "Strength",
      "Fitness",
      "Muscle Building",
      "Endurance",
      "Weightlifting",
    ],
    image: eventPic1,
    scheduledTime: "2025-01-25T14:00:00",
    isEnrolled: true,
    isStarted: false,
    isExpired: false,
  },
  {
    id: 6,
    title: "Outdoor Hiking Adventure",
    host: "Maya Johnson",
    rating: 4.6,
    description: "Join us for an invigorating hike in nature.",
    tags: ["Hiking", "Outdoor", "Adventure", "Nature", "Fitness"],
    image: eventPic2,
    scheduledTime: "2025-01-26T15:00:00",
    isEnrolled: false,
    isStarted: false,
    isExpired: false,
  },
  {
    id: 7,
    title: "Pilates for Flexibility",
    host: "Olivia Brown",
    rating: 4.3,
    description: "Improve flexibility and strength with Pilates exercises.",
    tags: ["Pilates", "Flexibility", "Core Strength", "Exercise", "Fitness"],
    image: eventPic1,
    scheduledTime: "2025-01-27T16:00:00",
    isEnrolled: true,
    isStarted: false,
    isExpired: false,
  },
  {
    id: 8,
    title: "Vegan Meal Prep Workshop",
    host: "Sophia Clark",
    rating: 4.5,
    description: "Learn to prepare delicious and nutritious vegan meals.",
    tags: ["Cooking", "Vegan", "Meal Prep", "Healthy", "Nutrition"],
    image: eventPic2,
    scheduledTime: "2025-01-28T17:00:00",
    isEnrolled: false,
    isStarted: false,
    isExpired: false,
  },
  {
    id: 9,
    title: "Mindful Breathing Techniques",
    host: "James Lewis",
    rating: 4.4,
    description:
      "Master the art of mindful breathing for relaxation and focus.",
    tags: [
      "Breathing",
      "Mindfulness",
      "Relaxation",
      "Mental Health",
      "Stress Relief",
    ],
    image: eventPic1,
    scheduledTime: "2025-01-29T18:00:00",
    isEnrolled: true,
    isStarted: false,
    isExpired: false,
  },
  {
    id: 10,
    title: "Dance Fitness Party",
    host: "Emily Harris",
    rating: 4.7,
    description: "Get your body moving with an exciting dance fitness session.",
    tags: ["Dance", "Fitness", "Cardio", "Fun", "Exercise"],
    image: eventPic2,
    scheduledTime: "2025-01-30T19:00:00",
    isEnrolled: false,
    isStarted: false,
    isExpired: false,
  },
  {
    id: 11,
    title: "Yoga for Back Pain",
    host: "Jack Mitchell",
    rating: 4.6,
    description: "Alleviate back pain with gentle yoga stretches and poses.",
    tags: ["Yoga", "Back Pain", "Relaxation", "Stretching", "Wellness"],
    image: eventPic1,
    scheduledTime: "2025-02-01T10:00:00",
    isEnrolled: true,
    isStarted: false,
    isExpired: false,
  },
  {
    id: 12,
    title: "Interval Running Program",
    host: "Lucas Scott",
    rating: 4.5,
    description:
      "Boost your running stamina with interval training techniques.",
    tags: ["Running", "Cardio", "Interval Training", "Fitness", "Endurance"],
    image: eventPic2,
    scheduledTime: "2025-02-02T11:00:00",
    isEnrolled: false,
    isStarted: false,
    isExpired: false,
  },
  {
    id: 13,
    title: "Self-Care Sunday",
    host: "Ava Thomas",
    rating: 4.8,
    description: "Take time for yourself with self-care rituals and practices.",
    tags: [
      "Self-Care",
      "Relaxation",
      "Mental Health",
      "Wellness",
      "Mindfulness",
    ],
    image: eventPic1,
    scheduledTime: "2025-02-03T12:00:00",
    isEnrolled: true,
    isStarted: false,
    isExpired: false,
  },
  {
    id: 14,
    title: "Keto Diet Cooking Class",
    host: "Isabella Martinez",
    rating: 4.3,
    description:
      "Learn how to prepare keto-friendly meals that are delicious and healthy.",
    tags: ["Keto", "Cooking", "Healthy", "Nutrition", "Diet"],
    image: eventPic2,
    scheduledTime: "2025-02-04T13:00:00",
    isEnrolled: false,
    isStarted: false,
    isExpired: false,
  },
  {
    id: 15,
    title: "Strength & Conditioning Bootcamp",
    host: "Henry Carter",
    rating: 4.6,
    description:
      "Get stronger with a conditioning bootcamp designed to enhance strength and power.",
    tags: [
      "Strength",
      "Conditioning",
      "Fitness",
      "Bootcamp",
      "Muscle Building",
    ],
    image: eventPic1,
    scheduledTime: "2025-02-05T14:00:00",
    isEnrolled: true,
    isStarted: false,
    isExpired: false,
  },
  {
    id: 16,
    title: "Beginner's Pilates",
    host: "Chloe Walker",
    rating: 4.4,
    description: "Start your Pilates journey with easy-to-follow exercises.",
    tags: ["Pilates", "Beginner", "Flexibility", "Core Strength", "Fitness"],
    image: eventPic2,
    scheduledTime: "2025-02-06T15:00:00",
    isEnrolled: false,
    isStarted: false,
    isExpired: false,
  },
  {
    id: 17,
    title: "Zumba Dance Party",
    host: "Michael Hall",
    rating: 4.7,
    description: "Dance to the beat of lively music with Zumba!",
    tags: ["Zumba", "Dance", "Cardio", "Fitness", "Fun"],
    image: eventPic1,
    scheduledTime: "2025-02-07T16:00:00",
    isEnrolled: true,
    isStarted: false,
    isExpired: false,
  },
  {
    id: 18,
    title: "Intro to Meditation",
    host: "Madison Young",
    rating: 4.5,
    description:
      "Learn the basics of meditation to calm your mind and reduce stress.",
    tags: [
      "Meditation",
      "Mindfulness",
      "Relaxation",
      "Mental Health",
      "Wellness",
    ],
    image: eventPic2,
    scheduledTime: "2025-02-08T17:00:00",
    isEnrolled: false,
    isStarted: false,
    isExpired: false,
  },
  {
    id: 19,
    title: "Advanced Running Techniques",
    host: "Daniel Perez",
    rating: 4.9,
    description:
      "Take your running to the next level with advanced training techniques.",
    tags: ["Running", "Endurance", "Fitness", "Cardio", "Training"],
    image: eventPic1,
    scheduledTime: "2025-02-09T18:00:00",
    isEnrolled: true,
    isStarted: false,
    isExpired: false,
  },
  {
    id: 20,
    title: "Healthy Habits for Life",
    host: "Ella King",
    rating: 4.7,
    description:
      "Adopt healthy habits to maintain a balanced and energetic lifestyle.",
    tags: [
      "Healthy Habits",
      "Wellness",
      "Nutrition",
      "Mental Health",
      "Fitness",
    ],
    image: eventPic2,
    scheduledTime: "2025-02-10T19:00:00",
    isEnrolled: false,
    isStarted: false,
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

const staticStylesExploreEvents = {
  boxContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", // Auto-fill grid with responsive column size
    gap: "16px", // Gap between items
  },
  cardStyle: { display: "flex", flexDirection: "column" },
  cardImage: {
    width: "100%",
    height: "200px", // Fixed height for the image
    objectFit: "cover",
  },
};

interface ExploreEventsProps {
  viewMode: "explore" | "browse";
}

const ExploreEvents = ({ viewMode }: ExploreEventsProps) => {
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
  // const viewMode = "explore";

  return (
    <Container maxWidth={false} sx={{ padding: "16px" }}>
      {/* Masonry Grid Container */}
      {viewMode === "explore" ? (
        <Box sx={staticStylesExploreEvents?.boxContainer}>
          {events.map((event) =>
            getCard(event, handlePopoverOpen, viewMode, theme)
          )}
        </Box>
      ) : (
        <Grid container spacing={2} sx={staticStyles?.container?.grid}>
          {events.map((event) => (
            <Grid item xs={12} sm={14} md={6} key={event?.id}>
              {getCard(event, handlePopoverOpen, viewMode, theme)}
            </Grid>
          ))}
        </Grid>
      )}

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
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
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
          <Box sx={{ textAlign: "right", marginTop: "8px" }}>
            <IconButton onClick={handlePopoverClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </Popover>
    </Container>
  );
};

export default ExploreEvents;
function getCard(
  event: {
    id: number;
    title: string;
    host: string;
    rating: number;
    description: string;
    tags: string[];
    image: string;
    scheduledTime: string;
    isEnrolled: boolean;
    isStarted: boolean;
    isExpired: boolean;
  },
  handlePopoverOpen: (
    event: React.MouseEvent<HTMLElement>,
    tags: string[]
  ) => void,
  viewMode: string,
  theme: Theme
) {
  return (
    <Card
      key={event.id}
      sx={
        viewMode === "explore"
          ? staticStylesExploreEvents?.cardStyle
          : [
              staticStyles?.container?.cardContainer(theme),
              dynamicStyles?.container?.cardContainer,
            ]
      }
    >
      <Box
        component="img"
        src={event.image}
        sx={
          viewMode === "explore"
            ? staticStylesExploreEvents?.cardImage
            : [
                staticStyles?.container?.cardMediaContainer,
                dynamicStyles?.container?.cardMediaContainer,
              ]
        }
      />
      <CardContent sx={staticStyles?.container?.cardContentContainer}>
        {/* Event Title */}
        <Box sx={staticStyles?.container?.contentHeader}>
          <Typography variant="h6" sx={staticStyles?.typography?.boldText}>
            {event?.title}
          </Typography>
          <Button variant="contained" sx={staticStyles?.button?.enrollButton}>
            Enroll
          </Button>
        </Box>
        {/* <Typography variant="h6">{event.title}</Typography> */}
        <Typography variant="body2" color="text.secondary">
          Hosted by: {event.host}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={staticStyles?.typography.scheduleText}
        >
          Scheduled for: {formatDate(event?.scheduledTime)}
        </Typography>
        {/* Event Rating */}
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

        {/* Event Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: "8px" }}
        >
          {event.description}
        </Typography>

        {/* Tags */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginTop: "8px",
          }}
        >
          {event.tags.slice(0, 5).map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              variant="outlined"
              color="primary"
            />
          ))}
          {event.tags.length > 5 && (
            <Button
              onClick={(e) => handlePopoverOpen(e, event.tags)}
              sx={{ textTransform: "none", fontSize: "12px" }}
              color="primary"
            >
              ...More
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
