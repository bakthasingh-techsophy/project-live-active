import {
    backgroundPic7
} from "@assets/index";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Replace with the actual image path or URL for the background image

const CTABanner = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${backgroundPic7})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "70vh", // Adjust height for the CTA banner
        textAlign: "center",
        color: "#fff",
        position: "relative",
        padding: { xs: "2rem 1rem", sm: "4rem 2rem", md: "5rem 4rem" }, // Adjust padding for different screen sizes
        // borderRadius: "8px",
        // boxShadow: 3,
      }}
    >
      {/* Overlay to make the text more visible */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          //   background:"#",
          background: "rgba(0, 0, 0,0.6)",
          //   background:
          // "radial-gradient(circle at 50% 50%, rgba(255, 255, 0, 0) 0%, rgba(0, 188, 212, 0) 70%, rgba(18, 18, 18, 0.65) 100%)", // Semi-transparent black overlay
        //   borderRadius: "8px",
        }}
      />

      {/* Content */}
      <Box sx={{ position: "relative", zIndex: 1, width: "100%" }}>
        <Typography
          variant={isSmallScreen ? "h5" : "h3"}
          sx={{
            fontWeight: 600,
            fontSize: {
              lg: "4.5rem",
              md: "4rem",
              sm: "3rem",
              xs: "1.7rem",
            },
            color: "primary.contrastText",
            marginBottom: "1rem",
            lineHeight: 1.3,
            textShadow: "1px 0 black",
          }}
        >
          Ready to Transform?
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: {
              lg: "2rem",
              md: "2rem",
              sm: "1.5rem",
              xs: "1.1rem",
            },
            lineHeight: 1.3,
            mb: 2,
          }}
        >
          Join us today for a healthier lifestyle!
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 400,
            fontSize: isSmallScreen ? "1rem" : "1.2rem",
            color: "#fff",
            marginBottom: "2rem",
            lineHeight: 1.5,
          }}
        >
          Start your fitness journey today and discover the best classes,
          personalized plans, and expert coaching.
        </Typography>

        {/* CTA Button */}
        <Button
          variant="contained"
          color="primary"
          sx={{
            padding: "12px 24px",
            fontWeight: "bold",
            borderRadius: "8px",
            textTransform: "none",
            fontSize: isSmallScreen ? "1rem" : "1.2rem",
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
          onClick={() => {
            // Your CTA button action
            console.log("CTA Button Clicked!");
          }}
        >
          Get Started Now
        </Button>
      </Box>
    </Box>
  );
};

export default CTABanner;
