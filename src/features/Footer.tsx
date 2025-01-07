import { Box, Divider, Link, Typography, useTheme } from "@mui/material";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column", // Stack content vertically on all devices
        background: theme.palette.background.default,
        padding: "2rem",
        "& *": {
          whiteSpace: "nowrap",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" }, // Column on small screens, row on larger ones
          justifyContent: "space-between", // Space between sections on larger screens
          alignItems: "flex-start", // Align the items at the top
          gap: { xs: "2rem", sm: "2rem", md: "4rem" },
        }}
      >
        {/* Left Section - Company Logo and Description */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              marginBottom: "1rem",
            }}
          >
            Live Active
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              lineHeight: 1.6,
              marginBottom: "1rem",
              maxWidth: "500px", // Limit width for readability
              whiteSpace: "wrap",
            }}
          >
            Empowering you to live healthier, balanced lives with expert
            fitness, wellness, and yoga programs.
          </Typography>
        </Box>

        {/* Right Section - Multiple Columns */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" }, // Column on small screens, row on larger ones
            gap: { xs: "2rem", sm: "2rem", md: "2rem" },
            flex: 2,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* About Us */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
                marginBottom: "1rem",
              }}
            >
              About Us
            </Typography>
            <Box>
              <Link
                href="/about"
                color="textSecondary"
                sx={{
                  textDecoration: "none",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                <Typography variant="body2">About Us</Typography>
              </Link>
              <Link
                href="/careers"
                color="textSecondary"
                sx={{
                  textDecoration: "none",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                <Typography variant="body2">Careers</Typography>
              </Link>
              <Link
                href="/team"
                color="textSecondary"
                sx={{
                  textDecoration: "none",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                <Typography variant="body2">Our Team</Typography>
              </Link>
            </Box>
          </Box>

          {/* Quick Links */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
                marginBottom: "1rem",
              }}
            >
              Quick Links
            </Typography>
            <Box>
              <Link
                href="/home"
                color="textSecondary"
                sx={{
                  textDecoration: "none",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                <Typography variant="body2">Home</Typography>
              </Link>
              <Link
                href="/services"
                color="textSecondary"
                sx={{
                  textDecoration: "none",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                <Typography variant="body2">Services</Typography>
              </Link>
              <Link
                href="/blog"
                color="textSecondary"
                sx={{
                  textDecoration: "none",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                <Typography variant="body2">Blog</Typography>
              </Link>
            </Box>
          </Box>

          {/* Resources */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
                marginBottom: "1rem",
              }}
            >
              Resources
            </Typography>
            <Box>
              <Link
                href="/privacy-policy"
                color="textSecondary"
                sx={{
                  textDecoration: "none",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                <Typography variant="body2">Privacy Policy</Typography>
              </Link>
              <Link
                href="/terms-conditions"
                color="textSecondary"
                sx={{
                  textDecoration: "none",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                <Typography variant="body2">Terms and Conditions</Typography>
              </Link>
            </Box>
          </Box>

          {/* Contact Us */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
                marginBottom: "1rem",
              }}
            >
              Contact Us
            </Typography>
            <Box>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary }}
              >
                1234 Fitness Lane
                <br />
                Wellness City, Country
                <br />
                Email: support@company.com
                <br />
                Phone: +1 (234) 567-8901
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ width: "100%", height: 1, margin: "1rem 0" }} />

      <Box
        sx={{
          textAlign: "center",
          padding: "1rem",
          // backgroundColor: theme.palette.background.default,
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: theme.palette.text.secondary, fontWeight: 800 }}
        >
          &copy; {new Date().getFullYear()} Live Active. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
