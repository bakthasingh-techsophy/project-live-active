import { userDp } from "@assets/index";
import { Box, Typography } from "@mui/material";

interface ProfileDrawerProps {
  menuOptions: any;
  activeMenu: any;
  setActiveMenu: any;
  activeSubMenu: any;
  setActiveSubMenu: any;
  toggleDrawer?: any;
}

const staticStyles = {
  container: {
    menuBox: {
      borderRadius: 4,
      p: 2,
      display: "inline-block",
    },
    profileImage: {
      width: 80,
      height: "auto",
      maxWidth: 400,
      borderRadius: 2,
      boxShadow: 3,
      objectFit: "cover",
    },
    userInfoContainer: {
      display: "flex",
      flexDirection: "column",
    },
    logoutText: {
      textTransform: "capitalize",
      fontWeight: 600,
      cursor: "pointer",
    },
    menuContainer: {
      display: "flex",
      flexDirection: "column",
      padding: 2,
      gap: 2,
    },
    menuOption: {
      display: "flex",
      flexDirection: "column",
      gap: 1,
    },
    menuHeading: {
      display: "flex",
      alignItems: "center",
      gap: 1,
      bgcolor: "transparent",
      color: "black",
      textTransform: "uppercase",
      fontWeight: 600,
    },
    subMenuOptionsContainer: {
      display: "flex",
      flexDirection: "column",
      gap: 0.5,
    },
    subMenuOption: {
      textTransform: "none",
      cursor: "pointer",
      padding: "0.5rem 1rem",
      borderRadius: 2,
    },
    profileDetailsContainer: { display: "flex", gap: 2, mb: 2 },
  },
  typography: {
    greetHeader: {
      textTransform: "uppercase",
    },
  },
};

const dynamicStyles = {
  container: {
    menuBox: {
      boxShadow: {
        lg: 2,
        md: 2,
        sm: 0,
        xs: 0,
      },
      background: {
        lg: "#f8fafc",
        md: "#f8fafc",
        sm: "transparent",
        xs: "transparent",
      },
    },
    subMenuOption: (isActive: boolean) => ({
      bgcolor: isActive ? "primary.main" : "transparent",
      color: isActive ? "white" : "black",
    }),
  },
};

const ProfileDrawer = ({
  menuOptions,
  activeMenu,
  setActiveMenu,
  activeSubMenu,
  setActiveSubMenu,
}: ProfileDrawerProps) => {
  const currentDate = new Date();
  const timeInIST = currentDate?.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
  const currentHour = new Date(timeInIST).getHours();

  let greeting = "";
  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  const handleLogoutClick = () => {
    // Logout logic
  };

  const handleSubMenuClick = (menuIndex: any, subMenuIndex: any) => {
    setActiveMenu(menuIndex);
    setActiveSubMenu(subMenuIndex);
  };

  return (
    <Box
      id="menuBox"
      sx={[staticStyles?.container?.menuBox, dynamicStyles?.container?.menuBox]}
    >
      <Box sx={staticStyles?.container?.profileDetailsContainer}>
        <Box
          component="img"
          sx={staticStyles?.container?.profileImage}
          src={userDp}
          alt="Random Image"
        />
        <Box sx={staticStyles?.container?.userInfoContainer}>
          <Typography
            variant="body2"
            sx={staticStyles?.typography?.greetHeader}
          >
            Hi 👋, {greeting}
          </Typography>
          <Typography sx={staticStyles?.container?.logoutText}>
            Pavan Kola
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            sx={staticStyles?.container?.logoutText}
            onClick={handleLogoutClick}
          >
            Logout
          </Typography>
        </Box>
      </Box>
      <Box sx={staticStyles?.container?.menuContainer}>
        {menuOptions?.map((menuOption: any, menuIndex: any) => (
          <Box key={menuIndex} sx={staticStyles?.container?.menuOption}>
            <Typography sx={staticStyles?.container?.menuHeading}>
              <menuOption.icon />
              {menuOption?.heading}
            </Typography>

            <Box sx={staticStyles?.container?.subMenuOptionsContainer}>
              {menuOption?.subMenu?.map(
                (subMenuItem: any, subMenuIndex: any) => (
                  <Box
                    key={subMenuIndex}
                    onClick={() => handleSubMenuClick(menuIndex, subMenuIndex)}
                    sx={[
                      staticStyles?.container?.subMenuOption,
                      dynamicStyles?.container?.subMenuOption(
                        activeMenu === menuIndex &&
                          activeSubMenu === subMenuIndex
                      ),
                    ]}
                  >
                    {subMenuItem?.subHeading}
                  </Box>
                )
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProfileDrawer;
