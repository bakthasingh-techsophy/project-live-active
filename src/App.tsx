import ResponsiveToolbar from "@features/ResponsiveToolbar";
import { BrowserRouter, useLocation } from "react-router-dom";
import "./App.css";

import Navigator from "@components/Navigator";
import Notification from "@components/notification";
import Footer from "@features/Footer";
import { Box } from "@mui/material";
import { pushNotification } from "@redux/slices/loadingSlice";
import { RootState } from "@redux/store";
import { AppRoutes } from "@utils/AppRoutes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const menuItems = [
  { label: "My Dashboard", link: AppRoutes?.DASHBOARD, isLoginRequired: true },
  // { label: "My Wellness", link: AppRoutes?.WELLNESS, isLoginRequired: true },
  {
    label: "Browse Events",
    link: AppRoutes?.BROWSE_EVENTS,
    isLoginRequired: false,
  },
  {
    label: "Coaches & Nutrition",
    link: AppRoutes?.COACHES_AND_NUTRITION,
    isLoginRequired: false,
  },
  // { label: "My Progress", link: "/progress", isLoginRequired: false },
];

function AppContent() {
  const dispatch = useDispatch();
  const { notification } = useSelector((state: RootState) => state?.loading);
  const [currentLocation, setCurrentLocation] = useState<any>("");
  const currentUrlLocation = useLocation();

  const closeNotification = () => {
    dispatch(
      pushNotification({
        ...notification,
        isOpen: false,
      })
    );
  };

  useEffect(() => {
    setCurrentLocation(currentUrlLocation?.pathname);
  }, [currentUrlLocation?.pathname]);

  return (
    <Box className="App">
      <Notification
        isOpen={notification?.isOpen}
        type={notification?.type}
        message={notification?.message}
        handleClose={closeNotification}
      />
      {!currentLocation?.startsWith(AppRoutes?.DASHBOARD) && (
        <ResponsiveToolbar menuItems={menuItems} />
      )}
      <Navigator />
      {!currentLocation?.startsWith(AppRoutes?.DASHBOARD) && <Footer />}
    </Box>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
