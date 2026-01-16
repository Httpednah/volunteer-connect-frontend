/**
 * This is the main router file. 
 * It maps URLs (like /login) to specific Page components.
 */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Opportunities from "./pages/Opportunities";
import Organization from "./pages/Organization";
import VolunteerDashboard from "./pages/VolunteerDashboard";

function App() {
  return (
    <Router>
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
