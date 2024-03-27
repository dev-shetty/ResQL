import React from "react";
import "../styles/DisasterRegForm.css";

function DisasterRegForm() {
  return (
    <div className="registration-div">
      <h1 className="registration-heading">Report a disaster</h1>
      <div className="input-div">
        <h3 className="attribute-div">Disaster name</h3>
        <input type="text" />
      </div>
      <div className="input-div">
        <h3 className="attribute-div">Description</h3>
        <input type="text" />
      </div>
      <div className="input-div">
        <h3 className="attribute-div">Date</h3>
        <input type="text" />
      </div>
      <div className="location-input-div">
        <h3 className="attribute-div">Location</h3>
        <input type="text" placeholder="City" />
        <input type="text" placeholder="State" />
        <input type="text" placeholder="Country" />
      </div>
      <div className="input-div">
        <h3 className="attribute-div">People affected</h3>
        <input type="text" />
      </div>
      <div className="input-div">
        <h3 className="attribute-div">Severity</h3>
        <input type="text" />
      </div>
      <button>Report</button>
    </div>
  );
}

export default DisasterRegForm;

{
  /*"id": "D8I9S1A2",
      "authority_id": "M4N5O6P7",
      "type": "Drought",
      "name": "Mulky Drought",
      "description": "Persistent drought conditions in Mulky causing water scarcity.",
      "date": "2024-05-19T18:30:00.000Z",
      "city": "Mulky",
      "state": "Karnataka",
      "country": "India",
      "people_affected": 2000,
      "severity": 10 */
}
