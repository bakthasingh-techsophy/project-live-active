import Dashboard from "@features/profileDdashboard/Dashboard";
import BrowseEvents from "@pages/BrowseEvents";
import LandingPage from "@pages/LandingPage";
import MyProgress from "@pages/MyProgress";
import MyWellness from "@pages/MyWellness";
import Nutrition from "@pages/Nutrition";
import { AppRoutes } from "@utils/AppRoutes";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
const Navigator = () => {
  return (
    <Routes>
      <Route path={AppRoutes.HOME} element={<LandingPage />} />
      {/* <Route
        path={AppRoutes.OTHERS}
        element={<Navigate to={AppRoutes.PROFILE_DASHBOARD} />}
      /> */}
      {/* Optionally, you can define a default route */}
      <Route
        path={AppRoutes.WELLNESS}
        element={
          <ProtectedRoute>
            <MyWellness viewMode="browse" timePeriod="upcoming" />
          </ProtectedRoute>
        }
      />
      <Route path={AppRoutes.BROWSE_EVENTS} element={<BrowseEvents />} />
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
        path={AppRoutes.DASHBOARD + "/*"}
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Navigator;
