import lightTheme from "@customThemes/lightTheme";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  AppProvider,
  NavigateOptions,
  Navigation,
  Router,
  Session,
} from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { AppRouteQueryValues, AppRoutes } from "@utils/AppRoutes";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LiveActiveBrand } from "./Branding";
import ExploreEvents from "../common/ExploreEvents";

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

const Dashboard = () => {
  const demoSession = {
    user: {
      name: "Bharat Kashyap",
      email: "bharatkashyap@outlook.com",
      image: "https://avatars.githubusercontent.com/u/19550456",
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
  const getCurrentPage = () => {
    switch (dashboardRouter.pathname) {
      case "/" + AppRouteQueryValues.EXPLORE_EVENTS:
        return <ExploreEvents viewMode="browse" />;
      case "/" + AppRouteQueryValues.PROFILE:
        return <>PRofile</>;
      case "/" + AppRouteQueryValues.SETTINGS:
        return <>Settings</>;
      case "/":
        navigate(AppRoutes.HOME);
        return <></>;
    }
  };

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={LiveActiveBrand}
      theme={lightTheme}
      router={dashboardRouter}
      authentication={authentication}
      session={session}
    >
      <DashboardLayout>{getCurrentPage()}</DashboardLayout>
    </AppProvider>
  );
};

export default Dashboard;
