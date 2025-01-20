import { Box, Container, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { Cancel } from "@mui/icons-material"; // Only cross mark

interface TagsRowProps {
  tags: string[];
  selectedTags: string[];
  toggleTag: (tag: string) => void;
}

interface TagsDisplayProps {
  selectedTags: any;
  setSelectedTags: any;
}

const staticStyles = {
  container: {
    mainContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    tagsContainer: {
      display: "flex",
      flexWrap: "nowrap",
      overflowX: "auto",
      width: "100%",
      gap: 1,
      padding: 1,
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    tagContainer: (theme: any) => ({
      display: "flex",
      alignItems: "center",
      gap: 1,
      border: `1px solid ${theme?.palette?.primary?.main}`,
      borderRadius: "1000px",
      padding: "4px 12px",
      backgroundColor: "transparent",
      cursor: "pointer",
      "&:hover": { background: theme?.palette?.primary?.light },
      transition: "all 0.3s",
    }),
  },
  typography: {
    tagTitle: (isSelected: any) => ({
      whiteSpace: "nowrap",
      fontWeight: isSelected ? 800 : 0,
    }),
  },
  button: {
    cancelButton: (theme: any) => ({
      color: theme?.palette?.primary?.main,
      fontSize: "1.2rem",
    }),
  },
};

const TagsRow: React.FC<TagsRowProps> = ({ tags, selectedTags, toggleTag }) => {
  const theme = useTheme();

  return (
    <Box sx={staticStyles?.container?.tagsContainer}>
      {tags?.map((tag, index) => {
        const isSelected = selectedTags?.includes(tag);

        return (
          <Box
            key={index}
            sx={staticStyles?.container?.tagContainer(theme)}
            onClick={() => toggleTag(tag)}
          >
            <Typography
              variant="body2"
              color={"primary"}
              sx={staticStyles?.typography?.tagTitle(isSelected)}
            >
              {tag}
            </Typography>

            {isSelected && <Cancel sx={staticStyles?.button?.cancelButton} />}
          </Box>
        );
      })}
    </Box>
  );
};

const TagsDisplay = ({ selectedTags, setSelectedTags }: TagsDisplayProps) => {
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
    setSelectedTags((prevSelectedTags: any) => {
      if (prevSelectedTags?.includes(tag)) {
        return prevSelectedTags?.filter((t: any) => t !== tag);
      } else {
        return [...prevSelectedTags, tag];
      }
    });
  };

  return (
    <Container maxWidth={false} sx={staticStyles?.container?.mainContainer}>
      <TagsRow tags={tags} selectedTags={selectedTags} toggleTag={toggleTag} />
    </Container>
  );
};

export default TagsDisplay;
