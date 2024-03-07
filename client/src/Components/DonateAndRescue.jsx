import React from "react";
import "../styles/DonateAndRescue.css";
import { Link } from "react-router-dom";

function DonateAndRescue() {
  return (
    <div className="donate-and-rescue-section">
      <div className="donate-section">
        <p>Help us to overcome the disaster</p>
        <p>Your contribution makes a huge difference!</p>
        <Link to="/">
          <button className="button">Contribute for a cause</button>
        </Link>
      </div>
      <div className="rescuer-registration-section">
        <p>Join us in the mission</p>
        <p>Register as a Rescuer!</p>
        <Link to="/rescuer/register">
          <button className="button">Register as a Rescuer</button>
        </Link>
      </div>
    </div>
  );
}

export default DonateAndRescue;
