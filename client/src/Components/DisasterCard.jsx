import React from "react";
import { displayRandomImage } from "../displayRandomImage.js";
import "../styles/DisasterCard.css";
import { XSquare } from "lucide-react";

function DisasterCard({ showDisasterCard, setShowDisasterCard, disaster }) {
  const handleClick = () => {
    setShowDisasterCard(false);
  };

  return (
    <section>
      <div className="disaster-card">
        <div className="close-button" onClick={handleClick}>
          <XSquare />
        </div>
        <img src={displayRandomImage()} className="disaster-image" />
        <h1 className="disaster-name">{disaster.name}</h1>
        <h3>Disaster ID: {disaster.id}</h3>
        <p>
          {disaster.city}, {disaster.state}, {disaster.country}
        </p>
        <p>Type: {disaster.type}</p>
        <p>Date: {disaster.date}</p>
        <p>Severity: {disaster.severity}</p>
        <p>People Affected: {disaster.people_affected}</p>
        <p className="disaster-description">
          Disaster description: {disaster.description}
        </p>
        <p>Reported by: {disaster.authority_id}</p>
      </div>
    </section>
  );
}

export default DisasterCard;
