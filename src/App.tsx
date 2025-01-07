import ResponsiveToolbar from "@features/ResponsiveToolbar";
import Home from "@pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
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
        <Route path="/events" element={<BrowseEvents />} />
        <Route path="/fit-coach" element={<>Fit coa</>} />
        <Route path="/fit-feast" element={<>Feast</>} />
        <Route path="/fitpass-tv" element={<>TV</>} />
        {/* Optionally, you can define a default route */}
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
