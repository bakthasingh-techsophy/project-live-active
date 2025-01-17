import BrowseEvents from "@pages/BrowseEvents";
import LandingPage from "@pages/LandingPage";
import MyProgress from "@pages/MyProgress";
import MyWellness from "@pages/MyWellness";
import Nutrition from "@pages/Nutrition";
import Profile from "@pages/Profile";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
const Navigator = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<Navigate to="/" />} />
      {/* Optionally, you can define a default route */}
      <Route path="/events" element={<BrowseEvents />} />
      <Route path="/wellness" element={<MyWellness />} />
      <Route path="/coaches-nutrition" element={<Nutrition />} />
      <Route path="/progress" element={<MyProgress />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Navigator;
