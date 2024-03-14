import React from "react";
import "../styles/DonationForm.css";
import { displayRandomImage } from "../displayRandomImage";

function DonationForm() {
  return (
    <div className="donation-section">
      <h1 className="donation-heading">Lend Your Help!</h1>
      <div className="image-list">
        <img src={displayRandomImage()} className="disaster-image" />
        <img src={displayRandomImage()} className="disaster-image" />
        <img src={displayRandomImage()} className="disaster-image" />
        <img src={displayRandomImage()} className="disaster-image" />
        <img src={displayRandomImage()} className="disaster-image" />
      </div>
      <div className="input-div">
        <h3 className="attribute-div">Organisation name</h3>
        <select className="options-list">
          <option value="ORG1A234" className="option">
            Relief Foundation
          </option>
          <option value="ORG5I678" className="option">
            Helping Hands NGO
          </option>
          <option value="ORG9E123" className="option">
            Emergency Aid Society
          </option>
          <option value="ORG4U567" className="option">
            Disaster Relief Alliance
          </option>
          <option value="ORGS9123" className="option">
            Humanitarian Group
          </option>
        </select>
      </div>
      <div className="input-div">
        <h3 className="attribute-div">Amount</h3>
        <input type="number" />
      </div>
      <button className="donate-button">Donate</button>
    </div>
  );
}

export default DonationForm;
