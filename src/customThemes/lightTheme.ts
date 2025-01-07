import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',  // Set to light mode
    primary: {
      main: '#DA4444',  // Red
      light: '#fa9090b9',  // Light red
      dark: '#A32929',   // Dark red
    },
    secondary: {
      main: '#0F4FBD',  // Blue
      light: '#4C77D9',  // Light blue
      dark: '#0C3870',   // Dark blue
    },
    background: {
      default: '#FFFFFF',  // Light background (for light theme)
      paper: '#F5F5F5',    // Paper background (for light theme)
    },
    text: {
      primary: '#000000',  // Dark text (for light theme)
      secondary: '#555555', // Secondary text (for light theme)
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    // MuiAppBar: {
    //   styleOverrides: {
    //     root: {
    //       boxShadow: 'none',
    //     },
    //   },
    // },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          // padding: '8px 16px',
          // borderRadius: '20px',
        },
      },
    },
  },
});

export default lightTheme;
