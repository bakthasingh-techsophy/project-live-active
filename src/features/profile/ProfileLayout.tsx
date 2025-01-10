import { Box, Drawer, IconButton } from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";
import ProfileInformation from "@features/profile/ProfileInformation";
import UserPreferences from "@features/profile/UserPreferences";
import ProfileDrawer from "@features/profile/ProfileDrawer";

const menuOptions = [
  {
    icon: WorkOutlineIcon,
    heading: "Account Details",
    subMenu: [
      {
        subHeading: "Profile Information",
        component: () => (
          <ProfileInformation subHeading={"Profile Information"} />
        ),
      },
    ],
  },
  {
    icon: SettingsIcon,
    heading: "Settings",
    subMenu: [
      {
        subHeading: "Preferences",
        component: () => <UserPreferences subHeading={"Preferences"} />,
      },
    ],
  },
];

const staticStyles = {
  container: {
    mainContainer: {
      display: "flex",
      padding: 4,
      alignItems: "start",
      minHeight: "80%",
      gap: 3,
    },
    drawer: { width: "100%", position: "relative" },
    componentContainer: {
      flex: 1,
      p: 1,
    },
  },
  typography: {},
  button: {
    drawerButton: {
      cursor: "pointer",
      marginLeft: -2,
      alignSelf: "center",
      backgroundColor: "rgb(128, 128, 128,0.1)",
      padding: "2rem 0rem",
      borderRadius: 2,
    },
  },
};
const dynamicStyles = {
  container: {
    mainContainer: {
      gap: {
        lg: "4",
        md: "4",
        sm: "1",
        xs: "1",
      },
    },
    menuBar: {
      display: {
        lg: "flex",
        md: "flex",
        sm: "none",
        xs: "none",
      },
    },
  },
  typography: {},
  button: {
    drawerButton: {
      display: {
        lg: "none",
        md: "none",
        sm: "flex",
        xs: "flex",
      },
    },
  },
};

const ProfileLayout = () => {
  const [activeMenu, setActiveMenu] = useState(0);
  const [activeSubMenu, setActiveSubMenu] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };

  return (
    <Box
      sx={[
        staticStyles?.container?.mainContainer,
        dynamicStyles?.container?.mainContainer,
      ]}
    >
      <Box sx={dynamicStyles?.container?.menuBar}>
        <ProfileDrawer
          menuOptions={menuOptions}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          activeSubMenu={activeSubMenu}
          setActiveSubMenu={setActiveSubMenu}
        />
      </Box>
      <IconButton
        sx={[
          staticStyles?.button?.drawerButton,
          dynamicStyles?.button?.drawerButton,
        ]}
        onClick={() => toggleDrawer(true)}
      >
        <ChevronRightIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => toggleDrawer(false)}
        sx={staticStyles?.container?.drawer}
      >
        <ProfileDrawer
          menuOptions={menuOptions}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          activeSubMenu={activeSubMenu}
          setActiveSubMenu={setActiveSubMenu}
          toggleDrawer={toggleDrawer}
        />
      </Drawer>
      <Box sx={staticStyles?.container?.componentContainer}>
        {activeMenu !== null &&
          activeSubMenu !== null &&
          menuOptions[activeMenu]?.subMenu[activeSubMenu]?.component()}
      </Box>
    </Box>
  );
};

export default ProfileLayout;
