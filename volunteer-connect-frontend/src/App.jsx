// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Opportunities from "./pages/Opportunities";
import Organization from "./pages/Organization";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import CreateOpportunity from "./pages/CreateOpportunity";
import Nav from "./components/Nav";

export default function App() {
  return (
    <BrowserRouter>
      {/* Navigation bar visible on all pages */}
      <Nav />

      {/* Routes */}
      <Routes>
        {/* Home / Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Opportunities */}
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/create-opportunity" element={<CreateOpportunity />} />

        {/* Organizations */}
        <Route path="/organization" element={<Organization />} />

        {/* Volunteer Dashboard */}
        <Route path="/dashboard" element={<VolunteerDashboard />} />

        {/* Optional: Add a 404 fallback route */}
        <Route
          path="*"
          element={
            <div style={{ padding: "2rem" }}>
              <h2>404 - Page Not Found</h2>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
