import UserPreferencesModal from "@features/UserPreferencesModal";
import { Box, Button, Container, Typography } from "@mui/material";
import React, { useState } from "react";

const staticStyles = {
  container: {
    mainContainer: {
      paddingTop: 4,
      paddingBottom: 4,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    headerContainer: {
      flex: 1,
      position: "relative",
    },
  },
  buttons: {
    modalButton: {
      bgcolor: "primary.main",
      color: "primary.contrast",
      borderRadius: 50,
      "&: hover": {
        bgcolor: "primary.dark",
      },
    },
  },
  typography: {
    h1: {
      fontWeight: "bold",
      textAlign: "center",
      color: "primary.main",
    },
    h2: {
      marginTop: 1,
      textAlign: "center",
    },
  },
};

const dynamicStyles = {
  container: {
    headerContainer: {
      py: { xs: 4, sm: 4, md: 6, lg: 6 },
    },
  },
  typography: {
    h1: {
      fontSize: {
        xs: "1.5rem",
        sm: "1.5rem",
        md: "2rem",
        lg: "2rem",
      },
    },
    h2: {
      fontSize: {
        xs: "1rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "1.5rem",
      },
    },
  },
};

const WellnessHeader: React.FC = () => {
  const [userModalOpen, setUserModalOpen] = useState<boolean>(false);

  return (
    <Container sx={[staticStyles?.container?.mainContainer]} maxWidth={false}>
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
          Customize Your Wellness Journey
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={[staticStyles?.typography?.h2, dynamicStyles?.typography?.h2]}
        >
          Explore and manage your wellness preferences to match your lifestyle.
        </Typography>
      </Box>
      <Button
        type="submit"
        variant="contained"
        sx={staticStyles?.buttons?.modalButton}
        onClick={() => {
          setUserModalOpen(true);
        }}
      >
        Customize your Preferences
      </Button>
      <UserPreferencesModal open={userModalOpen} setOpen={setUserModalOpen} />
    </Container>
  );
};

export default WellnessHeader;
