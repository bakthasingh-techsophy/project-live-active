import BrowseEvents from "@pages/BrowseEvents";
import EventManagementPage from "@pages/EventManagementPage";
import LandingPage from "@pages/LandingPage";
import MyProgress from "@pages/MyProgress";
import MyWellness from "@pages/MyWellness";
import Nutrition from "@pages/Nutrition";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { AppRoutes } from "@utils/AppRoutes";
const Navigator = () => {
  return (
    <Routes>
      <Route path={AppRoutes.HOME} element={<LandingPage />} />
      <Route
        path={AppRoutes.OTHERS}
        element={<Navigate to={AppRoutes.HOME} />}
      />
      {/* Optionally, you can define a default route */}
      <Route path={AppRoutes.BROWSE_EVENTS} element={<BrowseEvents />} />
      <Route path={AppRoutes.WELLNESS} element={<MyWellness />} />
      <Route path={AppRoutes.COACHES_AND_NUTRITION} element={<Nutrition />} />
      <Route path={AppRoutes.PROGRESS} element={<MyProgress />} />
      {/* <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      /> */}
      <Route
        path={AppRoutes.PROFILE_DASHBOARD}
        element={
          <ProtectedRoute>
            <EventManagementPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Navigator;
