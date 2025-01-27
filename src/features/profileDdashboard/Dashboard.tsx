import lightTheme from "@customThemes/lightTheme";
import AdminEventManagement from "@features/administration/AdminEventManagement";
import MyEvents from "@features/myEvents/MyEvents";
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
import { pushNotification } from "@redux/slices/loadingSlice";
import { getUserDetails } from "@services/userManagementService";
import {
  AppProvider,
  Navigation,
  Router,
  Session,
} from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import {
  AppRouteQueryValues,
  AppRoutes,
  AppRoutesCombination,
  AppSubRouteCombinations,
  AppSubRoutes,
} from "@utils/AppRoutes";
import { CONSTANTS } from "@utils/constants";
import { getLocalStorageItem, setLocalStorageItem } from "@utils/encrypt";
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
    segment: AppRouteQueryValues?.EXPLORE_EVENTS,
    title: "Explore Events",
    icon: <DashboardIcon />,
  },
  {
    kind: "page",
    segment: AppRouteQueryValues?.MY_EVENTS,
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
    segment: AppRouteQueryValues?.PROFILE,
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
];

const NAVIGATION_ADMIN: Navigation = [
  {
    kind: "page",
    segment: AppRouteQueryValues?.ADMIN,
    title: "Admin",
    icon: <SettingsIcon />,
  },
];

// Custom Router Hook with searchParams
const useCustomRouter = (initialPath: string): Router => {
  const [pathname, setPathname] = useState<string>(initialPath);
  const searchParams = new URLSearchParams(); // You can modify this as needed
  const navigate = useNavigate();

  const customNavigation = (url: string | URL) => {
    navigate(AppRoutes?.DASHBOARD + `${url}`);
    setPathname(url as string); // Update the pathname when navigating
  };

  return {
    pathname,
    searchParams, // Add searchParams here
    navigate: customNavigation,
  };
};

const getCurrentLocation = (isAdmin: boolean, location: any): string => {
  let currentPath = location?.pathname;

  if (currentPath?.includes("/dashboard/explore-events")) {
    let replacablePath = "/explore-events";
    if (isAdmin) {
      replacablePath = "/admin";
    }
    currentPath = currentPath?.replace("/dashboard", "") || replacablePath;
  } else if (currentPath?.includes("/dashboard/profile")) {
    currentPath = currentPath?.replace("/dashboard", "") || "/profile";
  } else if (currentPath?.includes("/dashboard/my-events")) {
    currentPath = currentPath?.replace("/dashboard", "") || "/my-events";
  } else if (currentPath?.includes("/dashboard/admin")) {
    currentPath = currentPath?.replace("/dashboard", "") || "/admin";
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [session, setSession] = React.useState<Session | null>(sampleSession);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [currentNavigation, setCurrentNavigation] = useState<Navigation>([]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dashboardRouter = useCustomRouter(
    getCurrentLocation(isAdmin, location)
  );
  const navigate = useNavigate();
  const getCurrentPage = () => {
    switch (dashboardRouter?.pathname) {
      case AppSubRoutes?.EXPLORE_EVENTS:
        return (
          <ExploreEvents
            page={AppSubRoutes?.EXPLORE_EVENTS}
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
      case AppSubRouteCombinations.MY_EVENTS_UPCOMMING:
        return (
          <MyEvents sectionPath={AppSubRouteCombinations.MY_EVENTS_UPCOMMING} />
        );
      case AppSubRouteCombinations.MY_EVENTS_PAST:
        return (
          <MyEvents sectionPath={AppSubRouteCombinations.MY_EVENTS_PAST} />
        );
      case AppSubRouteCombinations.PROFILE_DETAILS:
        return <ProfileInformation subHeading={"Profile Details"} />;
      case AppSubRouteCombinations.PROFILE_PREFERENCES:
        return <UserPreferences subHeading={"User Preferences"} />;
      case AppSubRoutes?.ADMIN:
        if (isAdmin) {
          return <AdminEventManagement />;
        } else {
          navigate(AppRoutes?.HOME);
          return <></>;
        }
      case "/":
        navigate(AppRoutes?.HOME);
        return <></>;
    }
  };

  const fetchUserDetails = async () => {
    try {
      setIsLoading(true);

      const getUserResponse = await getUserDetails(userId);

      if (getUserResponse?.success) {
        if (getUserResponse?.data?.roles?.includes(CONSTANTS?.LA_ADMIN_ROLE)) {
          setIsAdmin(true);
          await setLocalStorageItem(
            CONSTANTS?.USER_ROLE,
            CONSTANTS?.LA_ADMIN_ROLE
          );
        }
        setIsLoading(false);
        setUserDetails(getUserResponse?.data);
      } else {
        setIsLoading(false);
        dispatch(
          pushNotification({
            isOpen: true,
            message:
              getUserResponse?.message ||
              CONSTANTS?.API_RESPONSE_MESSAGES?.USER_DETAILS_FETCH_FAILURE,
            type: NotificationTypes?.ERROR,
          })
        );
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      dispatch(
        pushNotification({
          isOpen: true,
          message: CONSTANTS?.API_RESPONSE_MESSAGES?.USER_DETAILS_FETCH_FAILURE,
          type: NotificationTypes?.ERROR,
        })
      );
    }
  };

  useEffect(() => {
    fetchUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      if (userDetails?.roles?.includes(CONSTANTS?.LA_ADMIN_ROLE)) {
        setIsAdmin(true);
        setCurrentNavigation([...NAVIGATION_ADMIN]);
      } else {
        setIsAdmin(false);
        setCurrentNavigation([...NAVIGATION]);
      }
      setSession(updatedSession);
    }
  }, [userDetails]);

  return (
    <AppProvider
      navigation={currentNavigation}
      // navigation={isAdmin ? [...NAVIGATION_ADMIN] : NAVIGATION}
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
