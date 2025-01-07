import { Box, Typography, useTheme } from "@mui/material";

interface ProfileDrawerProps {
  menuOptions: any;
  activeMenu: any;
  setActiveMenu: any;
  activeSubMenu: any;
  setActiveSubMenu: any;
  toggleDrawer?: any;
}
const ProfileDrawer = ({
  menuOptions,
  activeMenu,
  setActiveMenu,
  activeSubMenu,
  setActiveSubMenu,
}: //   toggleDrawer,
ProfileDrawerProps) => {
  const theme = useTheme();

  const currentDate = new Date();
  const timeInIST = currentDate.toLocaleString("en-IN", {
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
      sx={{
        borderRadius: 4,
        p: 2,
        boxShadow: {
          lg: 2,
          md: 2,
          sm: 0,
          xs: 0,
        },
        display: "inline-block",
        background: {
          lg: "#f8fafc",
          md: "#f8fafc",
          sm: "transparent",
          xs: "transparent",
        },
      }}
    >
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Box
          component="img"
          sx={{
            width: 80,
            height: "auto",
            maxWidth: 400,
            borderRadius: 2,
            boxShadow: 3,
            objectFit: "cover",
          }}
          src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1736166081~exp=1736169681~hmac=a297d30d973c08702b35a0851731605fb05bd8e053d4ad26b679b705cb2f46c5&w=740"
          alt="Random Image"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body2" sx={{ textTransform: "uppercase" }}>
            Hi 👋, {greeting}
          </Typography>
          <Typography sx={{ textTransform: "capitalize", fontWeight: 600 }}>
            Pavan Kola
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            sx={{
              textTransform: "capitalize",
              color: "primary.main",
              cursor: "pointer",
            }}
            onClick={handleLogoutClick}
          >
            Logout
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 2,
          gap: 2,
        }}
      >
        {menuOptions.map((menuOption: any, menuIndex: any) => (
          <Box
            key={menuIndex}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                bgcolor: "transparent",
                color: "black",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              <menuOption.icon />
              {menuOption.heading}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              {menuOption.subMenu.map((subMenuItem: any, subMenuIndex: any) => (
                <Box
                  key={subMenuIndex}
                  onClick={() => handleSubMenuClick(menuIndex, subMenuIndex)}
                  sx={{
                    bgcolor:
                      activeMenu === menuIndex && activeSubMenu === subMenuIndex
                        ? theme.palette.primary.main
                        : "transparent",
                    color:
                      activeMenu === menuIndex && activeSubMenu === subMenuIndex
                        ? "white"
                        : "black",
                    textTransform: "none",
                    cursor: "pointer",
                    padding: "0.5rem 1rem",
                    borderRadius: 2,
                  }}
                >
                  {subMenuItem.subHeading}
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProfileDrawer;
