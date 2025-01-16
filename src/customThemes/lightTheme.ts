import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light", // Set to light mode
    primary: {
      main: "#00a86b",
      light: "#00a86a27",
      dark: "#008643",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#677c27",
      light: "#819447",
      dark: "#5a7017",
    },
    background: {
      default: "#FFFFFF",
      paper: "#F5F5F5",
    },
    text: {
      primary: "#121212",
      secondary: "#555555",
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
