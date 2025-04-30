import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import DetailPage from "./components/DetailPage";
import AgeGroupDetails from "./components/AgeGroupDetails";
import SOPPage from "./components/SOPPage"; // ✅ import the SOP page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/details/:status" element={<DetailPage />} />
        <Route path="/age-details/:age" element={<AgeGroupDetails />} />
        <Route path="/sop" element={<SOPPage />} /> {/* ✅ new route for smart forecast */}
      </Routes>
    </Router>
  );
}

export default App;
