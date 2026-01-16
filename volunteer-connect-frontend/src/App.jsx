// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Opportunities from "./pages/Opportunities";
import Organization from "./pages/Organization";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import Nav from "./components/Nav";

function App() {
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
      </Routes>
    </Router>
  );
}

export default App;
