import { Box, Container, TextField, Typography } from "@mui/material";
import React from "react";

const Options: React.FC = () => {
  return (
    <Container
      sx={{
        paddingTop: 4,
        paddingBottom: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: { xs: "column", sm: "row" }, // Stack content on smaller screens
        flex: 0.7,
      }}
      maxWidth={false}
    >
      {/* Left side - Description */}
      <Box
        sx={{
          flex: 1,
          marginBottom: { xs: 2, sm: 0 },
          display: {
            xs: "none",
            sm: "block",
          },
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: { xs: "center", sm: "left" } }}
        >
          Discover Amazing Events Near You
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ marginTop: 1, textAlign: { xs: "center", sm: "left" } }}
        >
          Explore various activities, from yoga to cooking classes. Find the
          perfect event to match your interests and stay active.
        </Typography>
      </Box>

      {/* Right side - Search Box */}
      <Box
        sx={{
          flex: 0.4,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search for events..."
          fullWidth
          sx={{
            width: "100%",
            // maxWidth: 400,
            padding: "0 16px",
          }}
        />
      </Box>
    </Container>
  );
};

export default Options;
