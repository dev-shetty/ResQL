import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import "./App.css"
import DisasterRegForm from "./Pages/DisasterRegForm"
import DonationForm from "./Pages/DonationForm"
import DonationPage from "./Pages/Donations"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import RescuerRegForm from "./Pages/RescuerRegForm"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/disaster/report" element={<DisasterRegForm />} />
        <Route path="/rescuer/register" element={<RescuerRegForm />} />
        <Route path="/donate" element={<DonationForm />} />
        <Route path="/donations" element={<DonationPage />} />
      </Routes>
    </Router>
  )
}

export default App
