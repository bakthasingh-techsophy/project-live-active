import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthFormModal from "./login/LoginModal";

interface ResponsiveToolbarProps {
  menuItems: { label: string; link: string }[];
}

const ResponsiveToolbar = ({ menuItems }: ResponsiveToolbarProps) => {
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null); // Track selected menu item
  const navigate = useNavigate();

  // Handle opening the drawer for small screens
  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };

  const handleNavigation = (link: string, label: string) => {
    setSelectedMenu(label); // Set the clicked menu item as selected
    navigate(link);
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen((prev) => !prev);
    setIsDrawerOpen(false);
  };

  return (
    <>
      {isLoginModalOpen && (
        <AuthFormModal open={isLoginModalOpen} setOpen={setIsLoginModalOpen} />
      )}
      <AppBar position="sticky" color="default">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 16px",
          }}
        >
          {/* Logo on the left */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => handleNavigation("/", "Home")}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: theme.palette.primary.main }}
            >
              Live Active
            </Typography>
          </Box>

          {/* Menu in the center (hidden on mobile) */}
          <Box
            sx={{
              justifyContent: "center",
              alignItems: "center",
              display: {
                lg: "flex",
                md: "flex",
                sm: "none",
                xs: "none",
              },
            }}
          >
            {menuItems.map((item) => (
              <Button
                key={item.label}
                sx={{
                  color: (theme) => theme.palette.text.primary,
                  textTransform: "uppercase",
                  marginLeft: "20px", // Optional: adds spacing between buttons
                  fontWeight: "bold",
                  padding: "8px 18px",
                  borderRadius: "8px",
                  backgroundColor:
                    selectedMenu === item.label ? "#12121211" : "transparent", // Apply background to selected item
                  "&:hover": {
                    background: "#12121211",
                  },
                  whiteSpace: "nowrap",
                }}
                onClick={() => handleNavigation(item.link, item.label)} // Pass both link and label
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginRight: 2, whiteSpace: "nowrap" }}
                onClick={() => handleNavigation("/my-profile", "Profile")}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                }}
                onClick={handleLoginClick}
              >
                Login
              </Button>
            </Box>

            <IconButton
              sx={{
                display: { xs: "block", md: "none" },
                color: theme.palette.primary.main,
              }}
              onClick={() => toggleDrawer(true)} // Open Drawer
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>

        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={() => toggleDrawer(false)}
          sx={{ width: "100%", position: "relative" }}
        >
          <Box
            sx={{
              width: "100vw",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              padding: "16px",
              justifyContent: "start",
              alignItems: "stretch",
            }}
          >
            {/* Drawer header with logo and close button */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: theme.palette.primary.main }}
              >
                Live Active
              </Typography>
              <IconButton onClick={() => toggleDrawer(false)} color="primary">
                <CloseIcon />
              </IconButton>
            </Box>

            <Divider sx={{ marginY: 2 }} />

            {/* Menu Items */}
            {menuItems.map((item) => (
              <Box key={item.label}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingY: 1,
                    backgroundColor:
                      selectedMenu === item.label
                        ? theme.palette.primary.light
                        : "transparent", // Apply background to selected item in drawer
                  }}
                >
                  <Button
                    sx={{
                      textTransform: "uppercase",
                      width: "100%",
                      color: selectedMenu === item.label ? "white" : "inherit", // Change text color when selected
                    }}
                    onClick={() => handleNavigation(item.link, item.label)} // Pass both link and label
                  >
                    {item.label}
                  </Button>
                  <ArrowForwardIcon sx={{ fontSize: 18 }} />
                </Box>
                <Divider />
              </Box>
            ))}

            <Box sx={{ mt: 2, marginBottom: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  width: "100%",
                  padding: "10px 0",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  display: {
                    sm: "none",
                    xs: "block",
                  },
                }}
                onClick={handleLoginClick}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Drawer>
      </AppBar>
    </>
  );
};

export default ResponsiveToolbar;
