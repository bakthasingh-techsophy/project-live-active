import lightTheme from "@customThemes/lightTheme";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import {
  AppProvider,
  NavigateOptions,
  Navigation,
  Router,
  Session,
} from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { AppRouteQueryValues, AppRoutes } from "@utils/AppRoutes";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LiveActiveBrand } from "./Branding";
import ExploreEvents from "../common/ExploreEvents";
import ProfileInformation from "@features/profile/ProfileInformation";
import UserPreferences from "@features/profile/UserPreferences";
import { getUserDetails } from "@services/userManagementService";
import { getLocalStorageItem } from "@utils/encrypt";
import { CONSTANTS } from "@utils/constants";
import { pushNotification } from "@redux/slices/loadingSlice";
import { NotificationTypes } from "@utils/types";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import AdminEventManagement from "@features/administration/AdminEventManagement";

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
    children: [
      {
        segment: "details",
        title: "Details",
        icon: <ManageAccountsIcon />,
      },
      {
        segment: "preferences",
        title: "Preferences",
        icon: <SettingsAccessibilityIcon />,
      },
    ],
  },
  {
    kind: "page",
    segment: AppRouteQueryValues.ADMIN,
    title: "Admin",
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

const getCurrentLocation = (): string => {
  const location = useLocation();
  let currentPath = location.pathname;

  if (currentPath.includes("/dashboard/explore-events")) {
    currentPath = currentPath.replace("/dashboard", "") || "/explore-events";
  } else if (currentPath.includes("/dashboard/profile")) {
    currentPath = currentPath.replace("/dashboard", "") || "/profile";
  } else if (currentPath.includes("/dashboard/admin")) {
    currentPath = currentPath.replace("/dashboard", "") || "/admin";
  }

  return currentPath;
};

const Dashboard = () => {
  const sampleSession = {
    user: {
      name: "Bharat Kashyap",
      email: "bharatkashyap@outlook.com",
      image: "",
    },
  };
  const dispatch = useDispatch();
  const userId = getLocalStorageItem(CONSTANTS?.USER_ID) || "";
  const [session, setSession] = React.useState<Session | null>(sampleSession);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession(sampleSession);
      },
      signOut: () => {
        localStorage.clear();
        navigate(AppRoutes?.HOME);
        setSession(null);
      },
    };
  }, []);

  const dashboardRouter = useCustomRouter(getCurrentLocation());
  const navigate = useNavigate();
  const getCurrentPage = () => {
    switch (dashboardRouter.pathname) {
      case "/" + AppRouteQueryValues.EXPLORE_EVENTS:
        return (
          <ExploreEvents viewMode="explore" selectedTags={[]} searchText={""} />
        );
      case "/" +
        AppRouteQueryValues.PROFILE +
        "/" +
        AppRouteQueryValues.DETAILS:
        return <ProfileInformation subHeading={"Profile Details"} />;
      case "/" +
        AppRouteQueryValues.PROFILE +
        "/" +
        AppRouteQueryValues.PREFERENCES:
        return <UserPreferences subHeading={"User Preferences"} />;
      case "/" + AppRouteQueryValues.ADMIN:
        return <AdminEventManagement />;
      case "/":
        navigate(AppRoutes.HOME);
        return <></>;
    }
  };

  const fetchUserDetails = async () => {
    try {
      setIsLoading(true);

      const getUserResponse = await getUserDetails(userId);

      if (getUserResponse?.success) {
        setIsLoading(false);
        setUserDetails(getUserResponse?.data);
      } else {
        setIsLoading(false);
        dispatch(
          pushNotification({
            isOpen: true,
            message:
              getUserResponse?.message ||
              CONSTANTS.API_RESPONSE_MESSAGES.USER_DETAILS_FETCH_FAILURE,
            type: NotificationTypes.ERROR,
          })
        );
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      dispatch(
        pushNotification({
          isOpen: true,
          message: CONSTANTS.API_RESPONSE_MESSAGES.USER_DETAILS_FETCH_FAILURE,
          type: NotificationTypes.ERROR,
        })
      );
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (userDetails) {
      const updatedSession = {
        user: {
          name: `${userDetails?.firstName} ${userDetails?.lastName}`,
          email: userDetails?.emailId,
          image: userDetails?.photoUrl || "",
        },
      };

      setSession(updatedSession);
    }
  }, [userDetails]);

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={LiveActiveBrand}
      theme={lightTheme}
      router={dashboardRouter}
      authentication={authentication}
      session={session}
    >
      <DashboardLayout sx={{ padding: 4 }}>
        {isLoading ? (
          <ClipLoader color={"primary.main"} loading={isLoading} size={24} />
        ) : (
          getCurrentPage()
        )}
      </DashboardLayout>
    </AppProvider>
  );
};

export default Dashboard;
