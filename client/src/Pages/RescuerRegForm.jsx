import React from "react";
import "../styles/RescuerRegForm.css";

function RescuerRegForm() {
  return (
    <div className="registration-div">
      <h1 className="registration-heading">Register as Rescuer</h1>
      <div className="input-div">
        <h3 className="attribute-div">Name</h3>
        <input type="text" />
      </div>
      <div className="input-div">
        <h3 type="email" className="attribute-div">
          Email
        </h3>
        <input type="text" />
      </div>
      <div className="input-div">
        <h3 className="attribute-div">Phone</h3>
        <input type="text" />
      </div>
      <div className="location-input-div">
        <h3 className="attribute-div">Location</h3>
        <input type="text" placeholder="City" />
        <input type="text" placeholder="State" />
        <input type="text" placeholder="Country" />
      </div>
      <button className="submit-button">Let's register</button>
    </div>
  );
}

export default RescuerRegForm;
