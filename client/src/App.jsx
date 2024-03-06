import "./App.css";
import Navbar from "./Components/Navbar";
import DisasterRegForm from "./Pages/DisasterRegForm";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import RescuerRegForm from "./Pages/RescuerRegForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/disaster/report" element={<DisasterRegForm />} />
        <Route path="/rescuer/register" element={<RescuerRegForm />} />
      </Routes>
    </Router>
  );
}

export default App;
