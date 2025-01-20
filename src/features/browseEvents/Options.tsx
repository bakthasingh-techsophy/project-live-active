import { Box, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const staticStyles = {
  container: {
    mainContainer: {
      paddingTop: 4,
      paddingBottom: 4,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flex: 0.7,
    },
    headerContainer: {
      flex: 1,
    },
    searchContainer: {
      flex: 0.4,
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      width: "100%",
    },
    textField: {
      width: "100%",
      padding: "0 16px",
    },
  },
  typography: {
    h1: { fontWeight: "bold" },
    h2: { marginTop: 1 },
  },
  button: {},
};
const dynamicStyles = {
  container: {
    mainContainer: {
      flexDirection: { xs: "column", sm: "row" },
    },
    headerContainer: {
      marginBottom: { xs: 2, sm: 0 },
      display: {
        xs: "none",
        sm: "block",
      },
    },
  },
  typography: {
    h1: { textAlign: { xs: "center", sm: "left" } },
    h2: { textAlign: { xs: "center", sm: "left" } },
  },
};

interface OptionsProps {
  searchText: any;
  setSearchText: any;
}

const Options = ({ searchText, setSearchText }: OptionsProps) => {
  const [localSearchText, setLocalSearchText] = useState(searchText);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchText(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setSearchText(localSearchText);
    }
  };

  return (
    <Container
      sx={[
        staticStyles?.container?.mainContainer,
        dynamicStyles?.container?.mainContainer,
      ]}
      maxWidth={false}
    >
      {/* Left side - Description */}
      <Box
        sx={[
          staticStyles?.container?.headerContainer,
          dynamicStyles?.container?.headerContainer,
        ]}
      >
        <Typography
          variant="h5"
          sx={[staticStyles?.typography?.h1, dynamicStyles?.typography?.h1]}
        >
          Discover Amazing Events Near You
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={[staticStyles?.typography?.h2, dynamicStyles?.typography?.h2]}
        >
          Explore various activities, from yoga to cooking classes. Find the
          perfect event to match your interests and stay active.
        </Typography>
      </Box>

      {/* Right side - Search Box */}
      <Box sx={staticStyles?.container?.searchContainer}>
        <TextField
          variant="outlined"
          placeholder="Search for events..."
          fullWidth
          sx={staticStyles?.container?.textField}
          value={localSearchText}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
      </Box>
    </Container>
  );
};

export default Options;
