import React from "react";
import { Box, Typography } from "@mui/material";
import NavigationDrawer from "@components/NavigationDrawer";

const NavigationSidebar: React.FC = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <NavigationDrawer />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          padding: 3,
          height: "100vh",
        }}
      >
        <Typography variant="h4">Welcome to Live-Active</Typography>
        <Typography variant="body1">
          Here you can manage all your events, users, and settings.
        </Typography>
      </Box>
    </Box>
  );
};

export default NavigationSidebar;
