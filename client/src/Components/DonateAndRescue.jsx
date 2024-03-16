import React from "react";
import "../styles/DonateAndRescue.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-provider";

function DonateAndRescue() {
  const { auth } = useAuth();
  return (
    <div className="donate-and-rescue-section">
      <div className="donate-section">
        <p>Help us to overcome the disaster</p>
        <p>Your contribution makes a huge difference!</p>
        <Link to="/donate">
          <button className="button">Contribute for a cause</button>
        </Link>
      </div>
      {auth == null && (
        <div className="rescuer-registration-section">
          <p>Join us in the mission</p>
          <p>Register as a Rescuer!</p>
          <Link to="/rescuer/register">
            <button className="button">Register as a Rescuer</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default DonateAndRescue;
