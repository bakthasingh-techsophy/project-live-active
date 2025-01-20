import { eventPic1, eventPic2, cardPic1 } from "@assets/index";
import { useTheme } from "@mui/material";
import React, { useState } from "react";

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

interface EventsComponentProps {
  viewMode: "explore" | "browse";
}
const EventsComponent = ({ viewMode }: EventsComponentProps) => {
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
  return <div>EventsComponent</div>;
};

export default EventsComponent;
