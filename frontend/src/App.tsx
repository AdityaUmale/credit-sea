import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ReportDetailsPage from "./pages/ReportDetailsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reports/:id" element={<ReportDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
