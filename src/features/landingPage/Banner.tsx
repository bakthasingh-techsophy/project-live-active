import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface BannerProps {
  backgroundImage: string;
  heading: React.ReactNode;
  tagline: React.ReactNode;
  actionButtons: React.ReactNode; // Expecting button components here
}

const Banner = ({ backgroundImage, heading, tagline, actionButtons }: BannerProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start", // Align left for larger screens
        alignItems: "center", // Vertically center the content
        height: "100vh", // Full height of the viewport
        backgroundImage: `url(${backgroundImage})`, // Dynamic background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "0 16px",
        color: theme.palette.text.primary, // Text color from theme
        textAlign: {
          xs: "center", // Center text on small screens
          sm: "left", // Align text to the left on medium and larger screens
        },
        position: "relative", // Positioning for overlay
      }}
    >
      {/* Overlay for better text visibility */}
      <Box
        sx={{
          position: "absolute", // Overlay on top of the background
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: {
            lg: "linear-gradient(90deg, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 0.23) 28%, rgba(18, 18, 18, 0) 40%)",
            md: "linear-gradient(90deg, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 0.23) 28%, rgba(18, 18, 18, 0) 40%)",
            sm: "#1212122f",
          }, // Dark overlay to improve text visibility
        }}
      />

      <Box
        sx={{
          textAlign: {
            lg: "left",
            md: "left",
            sm: "center",
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "start", // Center the content vertically
          justifyContent: "center",
          gap: 3,
          position: "relative", // Ensuring the content stays above the overlay
          zIndex: 1,
          flex: {
            lg: 0.4,
            md: 0.6,
            sm: 1,
            xs: 1,
          },
          p: {
            lg: 8,
            md: 8,
            sm: 4,
            xs: 0,
          },
        }}
      >
        {/* Big Heading */}
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            fontSize: {
              xs: "1.9rem",
              lg: "4rem",
              md: "3rem",
              sm: "3.5rem",
            },
            color: "#fff",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
            marginBottom: 2,
            lineHeight: 1.2,
          }}
        >
          {heading}
        </Typography>

        {/* Tagline */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            fontSize: {
              xs: "0.9rem",
              sm: "1.2rem",
            },
            color: "#fff",
            marginBottom: 3,
            lineHeight: 1.5,
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
          }}
        >
          {tagline}
        </Typography>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: {
              lg: "start",
              md: "start",
              sm: "center",
              xs: "center",
            },
            alignItems: "center",
            width: "100%",
          }}
        >
          {actionButtons}
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
