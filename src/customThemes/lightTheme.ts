import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light", // Set to light mode
    primary: {
      main: "#00a86b", 
      light: "#00a86a27", 
      dark: "#169757", 
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#677c27", // Blue
      light: "#4c76d98c", // Light blue
      dark: "#5a7017", // Dark blue
    },
    background: {
      default: "#FFFFFF", // Light background (for light theme)
      paper: "#F5F5F5", // Paper background (for light theme)
    },
    text: {
      primary: "#000000", // Dark text (for light theme)
      secondary: "#555555", // Secondary text (for light theme)
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
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
          textTransform: "none",
          // padding: '8px 16px',
          // borderRadius: '20px',
        },
      },
    },
  },
});

export default lightTheme;
