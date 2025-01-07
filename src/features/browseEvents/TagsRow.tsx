import { Box, Container, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { Cancel } from "@mui/icons-material"; // Only cross mark

interface TagsRowProps {
  tags: string[];
  selectedTags: string[];
  toggleTag: (tag: string) => void;
}

const TagsRow: React.FC<TagsRowProps> = ({ tags, selectedTags, toggleTag }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "nowrap", // Ensure all tags stay in a single row
        overflowX: "auto", // Allow horizontal scrolling
        width: "100%",
        gap: 1, // Space between tags
        padding: 1, // Padding for better spacing
        "&::-webkit-scrollbar": {
          display: "none", // Hide the scrollbar in WebKit browsers
        },
      }}
    >
      {tags.map((tag, index) => {
        const isSelected = selectedTags.includes(tag); // Check if the tag is selected

        return (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1, // Space between tag text and icon
              border: `1px solid ${theme.palette.primary.main}`, // Border color change on selection
              borderRadius: "1000px",
              padding: "4px 12px",
              backgroundColor: "transparent", // Background color change on selection
              cursor: "pointer",
              "&:hover": { background: theme.palette.primary.light },
              transition: "all 0.3s",
            }}
            onClick={() => toggleTag(tag)} // Toggle tag selection
          >
            <Typography
              variant="body2"
              color={"primary"} // Text color change on selection
              sx={{
                whiteSpace: "nowrap", // Prevent text wrapping
                fontWeight: isSelected ? 800 : 0,
              }}
            >
              {tag}
            </Typography>

            {/* Show cross mark (❌) only when selected */}
            {isSelected && (
              <Cancel
                sx={{ color: theme.palette.primary.main, fontSize: "1.2rem" }}
              /> // Cross mark when selected
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default function TagsDisplay() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]); // State to track selected tags
  const tags = [
    "Yoga",
    "Morning",
    "Beginner",
    "Relaxation",
    "Breathwork",
    "HIIT",
    "Strength",
    "Cardio",
    "Fitness",
    "Endurance",
    "Nutrition",
    "Cooking",
    "Healthy",
    "Meal Prep",
    "Wellness",
    "Mindfulness",
  ];

  // Toggle the selection state of a tag
  const toggleTag = (tag: string) => {
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(tag)) {
        // Deselect tag if already selected
        return prevSelectedTags.filter((t) => t !== tag);
      } else {
        // Select tag if not already selected
        return [...prevSelectedTags, tag];
      }
    });
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TagsRow
        tags={tags}
        selectedTags={selectedTags}
        toggleTag={toggleTag} // Pass toggle function to handle tag selection
      />
    </Container>
  );
}
