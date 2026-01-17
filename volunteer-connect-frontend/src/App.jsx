// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Opportunities from "./pages/Opportunities";
import Organization from "./pages/Organization";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import CreateOpportunity from "./pages/CreateOpportunity"; // ✅ ADD THIS
import Nav from "./components/Nav";

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="/dashboard" element={<VolunteerDashboard />} />
        <Route
          path="/create-opportunity"
          element={<CreateOpportunity />}
        /> {/* ✅ ADD THIS */}
      </Routes>
    </BrowserRouter>
  );
}
