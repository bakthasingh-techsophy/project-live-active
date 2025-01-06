import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { keyframes } from '@mui/system';

// Define a fade-in animation for the title and subtitle
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Define a grow animation for the button
const growButton = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const Welcome: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: 'primary.main',
        padding: 3,
        animation: `${fadeIn} 1.5s ease-out`,
      }}
    >
      <Typography
        variant="h3"
        color="white"
        sx={{
          animation: `${fadeIn} 1s ease-out 0.3s forwards`,
          fontWeight: 'bold',
        }}
      >
        Welcome to Live Active!
      </Typography>
      <Typography
        variant="body1"
        color="white"
        sx={{
          animation: `${fadeIn} 1s ease-out 0.6s forwards`,
          fontWeight: 'normal',
          marginBottom: 3,
        }}
      >
        Your journey to a healthier life begins here.
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        sx={{
          animation: `${growButton} 1.5s infinite alternate`,
          padding: '12px 30px',
          fontSize: '18px',
          '&:hover': {
            transform: 'scale(1.1)',
            transition: 'transform 0.3s ease-out',
          },
        }}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default Welcome;
