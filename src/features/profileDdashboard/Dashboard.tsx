import lightTheme from "@customThemes/lightTheme";
import AdminEventManagement from "@features/administration/AdminEventManagement";
import ProfileInformation from "@features/profile/ProfileInformation";
import UserPreferences from "@features/profile/UserPreferences";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import HistoryIcon from "@mui/icons-material/History";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import UpdateIcon from "@mui/icons-material/Update";
import MyWellness from "@pages/MyWellness";
import { pushNotification } from "@redux/slices/loadingSlice";
import { getUserDetails } from "@services/userManagementService";
import {
  AppProvider,
  NavigateOptions,
  Navigation,
  Router,
  Session,
} from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { AppRouteQueryValues, AppRoutes } from "@utils/AppRoutes";
import { CONSTANTS } from "@utils/constants";
import { getLocalStorageItem } from "@utils/encrypt";
import { NotificationTypes } from "@utils/types";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import ExploreEvents from "../common/ExploreEvents";
import { LiveActiveBrand } from "./Branding";

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
    segment: AppRouteQueryValues.MY_EVENTS,
    title: "My Events",
    icon: <DashboardCustomizeIcon />,
    children: [
      {
        segment: "upcoming",
        title: "Upcoming Events",
        icon: <UpdateIcon />,
      },
      {
        segment: "past",
        title: "Past Events",
        icon: <HistoryIcon />,
      },
    ],
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
  } else if (currentPath.includes("/dashboard/my-events")) {
    currentPath = currentPath.replace("/dashboard", "") || "/my-events";
  } else if (currentPath.includes("/dashboard/admin")) {
    currentPath = currentPath.replace("/dashboard", "") || "/admin";
  }

  return currentPath;
};

const Dashboard = () => {
  const sampleSession = {
    user: {
      name: "",
      email: "",
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
          <ExploreEvents
            viewMode="explore"
            selectedTags={[]}
            searchText={""}
            handleEditEvent={function (): void {
              throw new Error("Function not implemented.");
            }}
            selectedEvent={undefined}
            setSelectedEvent={() => {}}
          />
        );
      case "/" +
        AppRouteQueryValues.MY_EVENTS +
        "/" +
        AppRouteQueryValues.UPCOMING:
        return <MyWellness viewMode="explore" timePeriod="upcoming" />;
      case "/" + AppRouteQueryValues.MY_EVENTS + "/" + AppRouteQueryValues.PAST:
        return <MyWellness viewMode="explore" timePeriod="past" />;
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
      sx={{
        "& .MuiSvgIcon-root": {
          display: "none",
        },
        "& .MuiButtonBase-root": {
          background: "black",
        },
      }}
    >
      <DashboardLayout>
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
