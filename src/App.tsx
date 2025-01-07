import ResponsiveToolbar from "@features/ResponsiveToolbar";
import Home from "@pages/Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Profile from "@pages/Profile";
import BrowseEvents from "@pages/BrowseEvents";

const menuItems = [
  { label: "Browse Events", link: "/events" },
  { label: "Fit Coach", link: "/fit-coach" },
  { label: "Fit Feast", link: "/fit-feast" },
  { label: "Fitpass-TV", link: "/fitpass-tv" },
];

function App() {
  return (
    <BrowserRouter>
      <ResponsiveToolbar menuItems={menuItems} />
      <Routes>
        {/* Define routes for each page */}
        <Route path="/" element={<Navigate to='/my-profile' />} />
        <Route path="/studios" element={<>Studios</>} />
        <Route path="/events" element={<BrowseEvents />} />
        <Route path="/fit-coach" element={<>Fit coa</>} />
        <Route path="/fit-feast" element={<>Feast</>} />
        <Route path="/fitpass-tv" element={<>TV</>} />
        <Route path="/my-profile" element={<Profile />} />
        {/* Optionally, you can define a default route */}
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
