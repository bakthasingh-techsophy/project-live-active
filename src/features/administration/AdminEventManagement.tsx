import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { emptyBinPic } from '@assets/index';

// You can replace this path with the actual path to your image

const AdminEventManagement: React.FC = () => {
  const handleAddEvent = () => {
    // Handle the logic to add an event (e.g., navigate to a form or open a modal)
    console.log('Add Event button clicked');
  };

  return (
    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box sx={{ textAlign: 'center' }}>
        {/* Display the image to represent emptiness */}
        <Box sx={{ marginBottom: 4 }}>
          <img
            src={emptyBinPic}
            alt="No Events"
            style={{ maxWidth: '300px', width: '100%', height: 'auto' }}
          />
        </Box>
        
        {/* Message */}
        <Typography variant="h4" gutterBottom>
          No Events Yet
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          It looks like you don't have any events at the moment. To get started, you can create your first event by clicking the button below.
        </Typography>

        {/* Button to add an event */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleAddEvent}
          sx={{
            marginTop: '20px',
            padding: '15px 30px',
            fontSize: '16px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#0069d9',
              boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.2)',
            }
          }}
        >
          Add Event
        </Button>
      </Box>
    </Container>
  );
};

export default AdminEventManagement;
