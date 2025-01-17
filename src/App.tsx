import ResponsiveToolbar from "@features/ResponsiveToolbar";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

import Footer from "@features/Footer";
import Navigator from "@components/Navigator";
import { useDispatch, useSelector } from "react-redux";
import { pushNotification } from "@redux/slices/loadingSlice";
import { Box } from "@mui/material";
import Notification from "@components/notification";
import { RootState } from "@redux/store";

const menuItems = [
  { label: "My Wellness", link: "/wellness" },
  { label: "Browse Events", link: "/events" },
  { label: "Coaches & Nutrition", link: "/coaches-nutrition" },
  // { label: "My Progress", link: "/progress" },
];

function AppContent() {
  const dispatch = useDispatch();
  const { notification } = useSelector((state: RootState) => state.loading);

  const closeNotification = () => {
    dispatch(
      pushNotification({
        ...notification,
        isOpen: false,
      })
    );
  };

  return (
    <Box className="App">
      <Notification
        isOpen={notification.isOpen}
        type={notification.type}
        message={notification.message}
        handleClose={closeNotification}
      />
      <ResponsiveToolbar menuItems={menuItems} />
      <Navigator />
      <Footer />
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
