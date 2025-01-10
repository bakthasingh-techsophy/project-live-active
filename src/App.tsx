import ResponsiveToolbar from "@features/ResponsiveToolbar";
import BrowseEvents from "@pages/BrowseEvents";
import LandingPage from "@pages/LandingPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import Footer from "@features/Footer";
import Profile from "@pages/Profile";
import MyWellness from "@pages/MyWellness";
import Nutrition from "@pages/Nutrition";
import MyProgress from "@pages/MyProgress";

const menuItems = [
  { label: "My Wellness", link: "/wellness" },
  { label: "Browse Events", link: "/events" },
  { label: "Coaches & Nutrition", link: "/coaches-nutrition" },
  { label: "My Progress", link: "/progress" },
];

function App() {
  return (
    <BrowserRouter>
      <ResponsiveToolbar menuItems={menuItems} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<Navigate to="/" />} />
        {/* Optionally, you can define a default route */}
        <Route path="/events" element={<BrowseEvents />} />
        <Route path="/wellness" element={<MyWellness />} />
        <Route path="/coaches-nutrition" element={<Nutrition />} />
        <Route path="/progress" element={<MyProgress />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
