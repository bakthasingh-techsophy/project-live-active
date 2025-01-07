import { Box, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const testContactUs = [
  {
    heading: "Benefits of Exercise",
    content:
      "Regular physical activity can improve your overall health, help manage weight, reduce the risk of chronic diseases, and improve mental health by releasing endorphins.",
  },
  {
    heading: "Climate Change Impact",
    content:
      "Climate change refers to long-term shifts in temperature and weather patterns. Its impact includes rising sea levels, extreme weather events, and loss of biodiversity.",
  },
];
const testContactUsLinks = [
  {
    heading: "Products",
    subMenu: [
      {
        subHeading: "Fitpass",
        route: "/fit-pass",
      },
      {
        subHeading: "Fitfeast",
        route: "/fit-feast",
      },
    ],
  },
  {
    heading: "About Us",
    subMenu: [
      {
        subHeading: "About",
        route: "/about",
      },
      {
        subHeading: "Team",
        route: "/team",
      },
    ],
  },
  {
    heading: "Products",
    subMenu: [
      {
        subHeading: "Fitpass",
        route: "/fit-pass",
      },
      {
        subHeading: "Fitfeast",
        route: "/fit-feast",
      },
    ],
  },
  {
    heading: "Quick Links",
    subMenu: [
      {
        subHeading: "Events",
        route: "/events",
      },
      {
        subHeading: "Fit Coach",
        route: "/fit-coach",
      },
      {
        subHeading: "Fit Feast",
        route: "/fit-feast",
      },
    ],
  },
];

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (link: string) => {
    navigate(link);
  };

  return (
    <Box
      sx={{
        bgcolor: "#000",
        padding: "2rem 4rem",
        gap: 4,
        display: "flex",
        flexDirection: "column",
        "& *": {
          color: "#fff",
        },
      }}
    >
      <Box
        sx={{
          gap: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {testContactUs?.map((test) => (
          <Box
            sx={{
              gap: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6">{test?.heading}</Typography>
            <Typography>{test?.content}</Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {testContactUsLinks?.map((test) => (
          <Box
            sx={{
              gap: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6">{test?.heading}</Typography>
            <Box
              sx={{
                gap: 0.5,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {test?.subMenu?.map((testSubMenu) => (
                <Typography
                  variant="body1"
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleNavigation(testSubMenu?.route)}
                >
                  {testSubMenu?.subHeading}
                </Typography>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      <Divider
        sx={{
          backgroundColor: "#EAECF0",
        }}
      />
      <Typography
        sx={{
          textAlign: "center",
        }}
      >
        © 2025 Live Active, Inc. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
