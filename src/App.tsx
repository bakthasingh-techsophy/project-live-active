import ResponsiveToolbar from "@features/ResponsiveToolbar";
import { BrowserRouter, useLocation } from "react-router-dom";
import "./App.css";

import Footer from "@features/Footer";
import { useEffect, useState } from "react";
import Navigator from "@components/Navigator";
import { useDispatch, useSelector } from "react-redux";
import { pushNotification } from "@redux/slices/loadingSlice";
import { Box } from "@mui/material";
import Notification from "@components/notification";
import { RootState } from "@redux/store";
import { AppRoutes } from "@utils/AppRoutes";

const menuItems = [
  { label: "My Wellness", link: AppRoutes.WELLNESS },
  { label: "Browse Events", link: AppRoutes.BROWSE_EVENTS },
  { label: "Coaches & Nutrition", link: AppRoutes.COACHES_AND_NUTRITION },
  // { label: "My Progress", link: "/progress" },
];

function AppContent() {
  const dispatch = useDispatch();
  const { notification } = useSelector((state: RootState) => state.loading);
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
    setCurrentLocation(currentUrlLocation.pathname);
  }, [currentUrlLocation.pathname]);

  return (
    <Box className="App">
      <Notification
        isOpen={notification.isOpen}
        type={notification.type}
        message={notification.message}
        handleClose={closeNotification}
      />
      {currentLocation !== AppRoutes.PROFILE_DASHBOARD && (
        <ResponsiveToolbar menuItems={menuItems} />
      )}
      <Navigator />
      {currentLocation !== AppRoutes.PROFILE_DASHBOARD && <Footer />}
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
