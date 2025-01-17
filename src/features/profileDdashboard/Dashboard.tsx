import React, { useEffect, useState } from "react";
import {
  AppProvider,
  Branding,
  NavigateOptions,
  Navigation,
  Router,
  Session,
} from "@toolpad/core/AppProvider";
import { DashboardLayout, SidebarFooterProps } from "@toolpad/core/DashboardLayout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { Avatar, Box, Button, ButtonProps, Divider, ListItemIcon, ListItemText, MenuItem, MenuList, Stack, Typography } from "@mui/material";
import { laLogo } from "@assets/index";
import lightTheme from "@customThemes/lightTheme";
import Profile from "@pages/Profile";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppRouteQueries,
  AppRouteQueryParams,
  AppRouteQueryValues,
  AppRoutes,
} from "@utils/AppRoutes";
import { Account, AccountPopoverFooter, AccountPreview, AccountPreviewProps } from "@toolpad/core/Account";

// Define the navigation items
const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main Navigation",
  },
  {
    kind: "page",
    segment: AppRouteQueryValues.EXPLORE_EVENTS,
    title: "Explore Events",
    icon: <DashboardIcon />,
  },
  {
    kind: "page",
    segment: AppRouteQueryValues.PROFILE,
    title: "Profile",
    icon: <PersonIcon />,
  },
  {
    kind: "page",
    segment: AppRouteQueryValues.SETTINGS,
    title: "Settings",
    icon: <SettingsIcon />,
  },
];

// Custom Router Hook with searchParams
const useCustomRouter = (initialPath: string): Router => {
  const [pathname, setPathname] = useState<string>(initialPath);
  const searchParams = new URLSearchParams(); // You can modify this as needed
  const navigate = useNavigate();

  const customNavigation = (url: string | URL, _options?: NavigateOptions) => {
    navigate(AppRoutes.DASHBOARD + `${url}`);
    setPathname(url as string); // Update the pathname when navigating
  };

  return {
    pathname,
    searchParams, // Add searchParams here
    navigate: customNavigation,
  };
};
const SignInButton = (props: ButtonProps) => (
  <Button {...props}>Sign In</Button>
);

const SignOutButton = (props: ButtonProps) => (
  <Button {...props}>Sign Out</Button>
);

// const AccountPreview = () => (
//   <Box>
//     <p>Welcome, User!</p>
//     {/* Render user profile info */}
//   </Box>
// );

const accounts = [
  {
    id: 1,
    name: 'Bharat Kashyap',
    email: 'bharatkashyap@outlook.com',
    image: 'https://avatars.githubusercontent.com/u/19550456',
    projects: [
      {
        id: 3,
        title: 'Project X',
      },
    ],
  },
  {
    id: 2,
    name: 'Bharat MUI',
    email: 'bharat@mui.com',
    color: '#8B4513', // Brown color
    projects: [{ id: 4, title: 'Project A' }],
  },
];

function AccountSidebarPreview(props: AccountPreviewProps & { mini: boolean }) {
  const { handleClick, open, mini } = props;
  return (
    <Stack direction="column" p={0}>
      <Divider />
      <AccountPreview
        variant={mini ? 'condensed' : 'expanded'}
        handleClick={handleClick}
        open={open}
      />
    </Stack>
  );
}

const createPreviewComponent = (mini: boolean) => {
  function PreviewComponent(props: AccountPreviewProps) {
    return <AccountSidebarPreview {...props} mini={mini} />;
  }
  return PreviewComponent;
};

function SidebarFooterAccount({ mini }: SidebarFooterProps) {
  const PreviewComponent = React.useMemo(() => createPreviewComponent(mini), [mini]);
  return (
    <Account
      slots={{
        preview: PreviewComponent,
        popoverContent: SidebarFooterAccountPopover,
      }}
      slotProps={{
        popover: {
          transformOrigin: { horizontal: 'left', vertical: 'bottom' },
          anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
          disableAutoFocus: true,
          slotProps: {
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: (theme) =>
                  `drop-shadow(0px 2px 8px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.32)'})`,
                mt: 1,
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  bottom: 10,
                  left: 0,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translate(-50%, -50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          },
        },
      }}
    />
  );
}
function SidebarFooterAccountPopover() {
  return (
    <Stack direction="column">
      <Typography variant="body2" mx={2} mt={1}>
        Accounts
      </Typography>
      <MenuList>
        {accounts.map((account) => (
          <MenuItem
            key={account.id}
            component="button"
            sx={{
              justifyContent: 'flex-start',
              width: '100%',
              columnGap: 2,
            }}
          >
            <ListItemIcon>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  fontSize: '0.95rem',
                  bgcolor: account.color,
                }}
                src={account.image ?? ''}
                alt={account.name ?? ''}
              >
                {account.name[0]}
              </Avatar>
            </ListItemIcon>
            <ListItemText
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%',
              }}
              primary={account.name}
              secondary={account.email}
              primaryTypographyProps={{ variant: 'body2' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </MenuItem>
        ))}
      </MenuList>
      <Divider />
      <AccountPopoverFooter>
        <SignOutButton />
      </AccountPopoverFooter>
    </Stack>
  );
}

const Dashboard = () => {

  const demoSession = {
    user: {
      name: 'Bharat Kashyap',
      email: 'bharatkashyap@outlook.com',
      image: 'https://avatars.githubusercontent.com/u/19550456',
    },
  };
  const [session, setSession] = React.useState<Session | null>(demoSession);
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession(demoSession);
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);
  // Use the custom router
  const dashboardRouter = useCustomRouter("/explore-events");
  const navigate = useNavigate();
  const currentUrlLocation = useLocation();
  const [currentRederingComponent, setCurrentRederingComponent] = useState<any>(
    <Box>Welcome to the Dard!</Box>
  );
  const getCurrentPage = () => {
    switch (dashboardRouter.pathname) {
      case "/" + AppRouteQueryValues.EXPLORE_EVENTS:
        return <>Dashboard</>;
      case "/" + AppRouteQueryValues.PROFILE:
        return <>PRofile</>;
      case "/" + AppRouteQueryValues.SETTINGS:
        return <>Settings</>;
      case "/":
        navigate(AppRoutes.HOME);
        return <></>;
    }
  };

  const branding: Branding = {
    title: "Live Active",
    logo: (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box
          component={"img"}
          src={laLogo}
          sx={{
            width: "40px",
            alignSelf: "center",
            justifySelf: "center",
          }}
        />
      </Box>
    ),
    homeUrl: "/",
  };

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={branding}
      theme={lightTheme}
      router={dashboardRouter}
      authentication={authentication}
      session={session}
      
    >
      <DashboardLayout
       slots={{ toolbarAccount: () => null, sidebarFooter: SidebarFooterAccount }}
        
        // slotProps={{
        //   // Define the slotProps for the toolbarAccount slot
        //   toolbarAccount: {
        //     slots: {
        //       signInButton: Button, // Customize this if needed
        //       signOutButton: Button, // Customize this if needed
        //       preview: AccountPreview, // Pass AccountPreview component here
        //     },
        //     slotProps: {
        //       signInButton: {
        //         onClick: () => alert("Sign In Clicked"), // Handle sign-in action
        //       },
        //       signOutButton: {
        //         onClick: () => alert("Sign Out Clicked"), // Handle sign-out action
        //       },
        //     },
        //   },
        // }}
      >
        {getCurrentPage()}
      </DashboardLayout>
    </AppProvider>
  );
};

export default Dashboard;
