import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import StarIcon from "@mui/icons-material/Star";
import MenuItemWithSubmenu from "./MenuItemWithSubmenu";

const NavigationDrawer: React.FC = () => {
  const [openEvents, setOpenEvents] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleToggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleToggleEvents = () => {
    setOpenEvents(!openEvents);
  };

  const handleToggleUsers = () => {
    setOpenUsers(!openUsers);
  };

  const handleToggleSettings = () => {
    setOpenSettings(!openSettings);
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={true}
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          height: "100%",
          boxSizing: "border-box",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: 2,
          bgcolor: "background.paper",
        }}
      >
        {/* Top Section */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Live-Active</Typography>
          <IconButton onClick={handleToggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Box>

        <Divider sx={{ margin: "8px 0" }} />

        {/* Menu Items */}
        <Box>
          {/* Dashboard Item */}
          <MenuItemWithSubmenu
            title="Dashboard"
            icon={<DashboardIcon />}
            open={false}
            onClick={() => {}}
            subMenus={[]}
          />

          {/* Events Menu */}
          <MenuItemWithSubmenu
            title="Events"
            icon={<EventIcon />}
            open={openEvents}
            onClick={handleToggleEvents}
            subMenus={["Upcoming Events", "Manage Events", "Event Categories"]}
          />

          {/* Users Menu */}
          <MenuItemWithSubmenu
            title="Users"
            icon={<PeopleIcon />}
            open={openUsers}
            onClick={handleToggleUsers}
            subMenus={["User Management", "Roles & Permissions"]}
          />

          {/* Settings Menu */}
          <MenuItemWithSubmenu
            title="Settings"
            icon={<SettingsIcon />}
            open={openSettings}
            onClick={handleToggleSettings}
            subMenus={["General Settings", "Account Settings"]}
          />

          {/* Premium Section */}
          <MenuItemWithSubmenu
            title="Premium"
            icon={<StarIcon />}
            open={false}
            onClick={() => {}}
            subMenus={[]}
          />
        </Box>
      </Box>
    </Drawer>
  );
};

export default NavigationDrawer;
