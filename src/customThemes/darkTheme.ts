import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',  // Set to dark mode
    primary: {
      main: '#DA4444',  // Red
      light: '#FF6B6B',  // Light red
      dark: '#A32929',   // Dark red
    },
    secondary: {
      main: '#0F4FBD',  // Blue
      light: '#4C77D9',  // Light blue
      dark: '#0C3870',   // Dark blue
    },
    background: {
      default: '#121212',  // Dark background (for dark theme)
      paper: '#1E1E1E',    // Paper background (for dark theme)
    },
    text: {
      primary: '#FFFFFF',  // Light text (for dark theme)
      secondary: '#B0B0B0', // Secondary text (for dark theme)
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          padding: '8px 16px',
          borderRadius: '20px',
        },
      },
    },
  },
});

export default darkTheme;
