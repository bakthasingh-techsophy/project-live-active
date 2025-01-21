import { laLogo, userDp } from "@assets/index";
import ConfirmationPopup from "@components/ConfirmationPopup";
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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { isTokenExpired } from "@utils/tokenUtils";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthFormModal from "./login/LoginModal";
import {
  AppRouteQueries,
  AppRouteQueryParams,
  AppRouteQueryValues,
  AppRoutes,
  AppRoutesCombination,
} from "@utils/AppRoutes";

interface ResponsiveToolbarProps {
  menuItems: { label: string; link: string; isLoginRequired: boolean }[];
}

const staticStyles = (theme: any) => ({
  container: {
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
      padding: "0 16px",
    },
    logoHolder: {
      display: "flex",
      alignItems: "center",
      "&:hover": {
        cursor: "pointer",
      },
    },
    toolbarItems: {
      justifyContent: "center",
      alignItems: "center",
    },
    actionButtonsContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      innerContainer: { display: "flex", alignItems: "center", gap: 4 },
    },
    drawerContainer: { width: "100%", position: "relative" },
    drawer: {
      width: "100vw",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      padding: "16px",
      justifyContent: "start",
      alignItems: "stretch",
    },
    drawerHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    drawerItems: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingY: 1,
    },
    drawerLoginContainer: { mt: 2, marginBottom: 2 },
    profileImage: {
      width: 40,
      height: "auto",
      maxWidth: 400,
      borderRadius: 50,
      boxShadow: 3,
      objectFit: "cover",
      cursor: "pointer",
      transition: "transform 0.1s ease-in-out",
      "&:hover": {
        transform: "scale(1.04)",
      },
    },
  },
  typography: {
    logo: {
      fontWeight: 700,
      background: `linear-gradient(90deg, ${theme?.palette?.primary?.main}, ${theme?.palette?.secondary?.main})`,
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      color: "transparent",
      fontSize: { xs: "2rem", sm: "2.5rem", md: "2rem" },
    },
    drawerHeader: { fontWeight: 700, color: theme?.palette?.primary?.main },
  },
  button: {
    toolbarItem: {
      color: theme?.palette?.text?.primary,
      textTransform: "uppercase",
      marginLeft: "20px",
      fontWeight: "bold",
      padding: "8px 18px",
      borderRadius: "8px",
      "&:hover": {
        background: "rgb(22, 151, 87,0.3)",
      },
      whiteSpace: "nowrap",
    },
    loginBtn: {
      background: theme?.palette?.secondary?.main,
      "&:hover": {
        background: theme?.palette?.secondary?.dark,
      },
    },
    menuBtn: {
      color: theme?.palette?.primary?.main,
      ml: 2,
    },
    drawerItemButton: {
      textTransform: "uppercase",
      width: "100%",
    },
    drawerLoginBtn: {
      width: "100%",
      padding: "10px 0",
      borderRadius: "8px",
      fontWeight: "bold",
    },
  },
  icons: {
    drawerToggleIcon: { fontSize: 18 },
  },
  divider: { marginY: 2 },
});

const dynamicStyles = {
  container: {
    toolbarItems: {
      display: {
        lg: "flex",
        md: "flex",
        sm: "none",
        xs: "none",
      },
    },
  },
  typography: {
    logo: {
      fontSize: { xs: "2rem", sm: "2.5rem", md: "2rem" },
    },
  },
  button: {
    loginBtn: {
      display: {
        xs: "none",
        sm: "block",
      },
    },
    menuBtn: {
      display: { xs: "flex", md: "none" },
    },
    drawerLoginBtn: {
      display: {
        sm: "none",
        xs: "block",
      },
    },
  },
};

const ResponsiveToolbar = ({ menuItems }: ResponsiveToolbarProps) => {
  const theme = useTheme();
  const customStaticStyles = staticStyles(theme);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const navigate = useNavigate();
  const currentUrlLocation = useLocation();
  const isTokenActive = !isTokenExpired();

  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };

  const handleNavigation = (link: string, label: string) => {
    setSelectedMenu(label);
    let tempLink = link;
    if (tempLink?.includes(AppRoutes?.DASHBOARD)) {
      tempLink = AppRoutesCombination?.DASHBOARD_EXPLORE_EVENTS;
    }

    navigate(tempLink);
  };

  const handleLoginClick = () => {
    openLoginModal();
    setIsDrawerOpen(false);
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen((prev) => !prev);
    setIsDrawerOpen(false);
  };

  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen((prev) => !prev);
    navigate(AppRoutes.HOME);
    window.location.reload();
    localStorage.clear();
  };

  const openLoginModal = () => {
    navigate(AppRouteQueries.AUTH_LOGIN);
  };

  const handleAuthModalClose = () => {
    const searchParams = new URLSearchParams(currentUrlLocation.search);
    searchParams.delete(AppRouteQueryParams.AUTH);
    navigate({ search: searchParams.toString() }, { replace: true });
  };

  useEffect(() => {
    const param = new URLSearchParams(currentUrlLocation.search).get(
      AppRouteQueryParams.AUTH
    );
    const isLoginModalOpen =
      param === AppRouteQueryValues.LOGIN ||
      param === AppRouteQueryValues.REGISTER;
    setIsLoginModalOpen(isLoginModalOpen);
  }, [currentUrlLocation?.search]);

  return (
    <>
      {isLoginModalOpen && (
        <AuthFormModal
          open={isLoginModalOpen}
          handleClose={handleAuthModalClose}
        />
      )}
      {isLogoutModalOpen && (
        <ConfirmationPopup
          open={isLogoutModalOpen}
          onClose={handleLogoutClick}
          onConfirm={handleLogoutConfirm}
          title={"Are you sure you want to Logout?"}
        />
      )}
      <AppBar position="sticky" color="default">
        <Toolbar sx={customStaticStyles?.container?.toolbar}>
          <Box
            sx={customStaticStyles?.container?.logoHolder}
            onClick={() => handleNavigation(AppRoutes.HOME, "Home")}
          >
            <Box component={"img"} src={laLogo} sx={{ width: 60 }} />
          </Box>

          {/* Menu in the center (hidden on mobile) */}
          <Box
            sx={[
              customStaticStyles?.container?.toolbarItems,
              dynamicStyles?.container?.toolbarItems,
            ]}
          >
            {menuItems?.map((item) =>
              item?.isLoginRequired && !isTokenActive ? null : (
                <Button
                  key={item?.label}
                  sx={[
                    customStaticStyles?.button?.toolbarItem,
                    {
                      backgroundColor:
                        selectedMenu === item?.label
                          ? "rgb(22, 151, 87,0.2)"
                          : "transparent",
                    },
                  ]}
                  onClick={() => handleNavigation(item?.link, item?.label)}
                >
                  {item?.label}
                </Button>
              )
            )}
          </Box>

          <Box sx={customStaticStyles?.container?.actionButtonsContainer}>
            <Box
              sx={
                customStaticStyles?.container?.actionButtonsContainer
                  ?.innerContainer
              }
            >
              <Button
                variant="contained"
                color="primary"
                sx={[
                  customStaticStyles?.button?.loginBtn,
                  dynamicStyles?.button?.loginBtn,
                ]}
                onClick={isTokenActive ? handleLogoutClick : handleLoginClick}
              >
                {isTokenActive ? "Logout" : "Login"}
              </Button>
            </Box>

            <IconButton
              sx={[
                customStaticStyles?.button?.menuBtn,
                dynamicStyles?.button?.menuBtn,
              ]}
              onClick={() => toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>

        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={() => toggleDrawer(false)}
          sx={customStaticStyles?.container?.drawerContainer}
        >
          <Box sx={customStaticStyles?.container?.drawer}>
            <Box sx={customStaticStyles?.container?.drawerHeader}>
              <Box component={"img"} src={laLogo} sx={{ width: 60 }} />
              <IconButton onClick={() => toggleDrawer(false)} color="primary">
                <CloseIcon />
              </IconButton>
            </Box>

            <Divider sx={customStaticStyles?.divider} />

            {/* Menu Items */}
            {menuItems?.map((item) => (
              <Box key={item?.label}>
                <Box
                  sx={[
                    customStaticStyles?.container?.drawerItems,
                    {
                      backgroundColor:
                        selectedMenu === item?.label
                          ? theme?.palette?.primary?.light
                          : "transparent",
                    },
                  ]}
                >
                  <Button
                    sx={[
                      customStaticStyles?.button?.drawerItemButton,
                      {
                        color:
                          selectedMenu === item?.label ? "white" : "inherit",
                      },
                    ]}
                    onClick={() => handleNavigation(item?.link, item?.label)}
                  >
                    {item?.label}
                  </Button>
                  <ArrowForwardIcon
                    sx={customStaticStyles?.icons?.drawerToggleIcon}
                  />
                </Box>
                <Divider />
              </Box>
            ))}

            <Box sx={customStaticStyles?.container?.drawerLoginContainer}>
              <Button
                variant="outlined"
                color="primary"
                sx={[
                  customStaticStyles?.button?.drawerLoginBtn,
                  dynamicStyles?.button?.drawerLoginBtn,
                ]}
                onClick={isTokenActive ? handleLogoutClick : handleLoginClick}
              >
                {isTokenActive ? "Logout" : "Login"}
              </Button>
            </Box>
          </Box>
        </Drawer>
      </AppBar>
    </>
  );
};

export default ResponsiveToolbar;
