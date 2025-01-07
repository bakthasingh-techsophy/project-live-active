import { Box, Drawer } from "@mui/material";
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

const Profile = () => {
  const [activeMenu, setActiveMenu] = useState(0);
  const [activeSubMenu, setActiveSubMenu] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };

  return (
    <Box sx={{ display: "flex", gap: 4, padding: 4, alignItems: "center" }}>
      <Box
        sx={{
          display: {
            lg: "flex",
            md: "flex",
            sm: "none",
            xs: "none",
          },
        }}
      >
        <ProfileDrawer
          menuOptions={menuOptions}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          activeSubMenu={activeSubMenu}
          setActiveSubMenu={setActiveSubMenu}
        />
      </Box>
      <ChevronRightIcon
        onClick={() => toggleDrawer(true)}
        sx={{
          display: {
            lg: "none",
            md: "none",
            sm: "flex",
            xs: "flex",
          },
        }}
      />
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => toggleDrawer(false)}
        sx={{ width: "100%", position: "relative" }}
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
      <Box
        sx={{
          flex: 1,
          p: 2,
        }}
      >
        {activeMenu !== null &&
          activeSubMenu !== null &&
          menuOptions[activeMenu].subMenu[activeSubMenu].component()}
      </Box>
    </Box>
  );
};

export default Profile;
