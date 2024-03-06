import React from "react";
import { MapPin } from "lucide-react";
import "../styles/Disaster.css";
import { displayRandomImage } from "../displayRandomImage.js";
import DisasterCard from "../Components/DisasterCard";
import { useState } from "react";

function Disaster({ disaster }) {
  const [showDisasterCard, setShowDisasterCard] = useState(false);

  const handleClick = () => {
    setShowDisasterCard(true);
  };

  return (
    <section>
      <div className="disaster-section" onClick={handleClick}>
        <img src={displayRandomImage()} className="disaster-image" />
        <h1 className="disaster-name">{disaster.name}</h1>
        <div className="location-section">
          <MapPin />
          <h2 className="location-name">
            {disaster.city}, {disaster.state}
          </h2>
        </div>
        <p className="severity-level">Severity: {disaster.severity}</p>
      </div>
      <div id="disaster-card-div">
        {showDisasterCard && (
          <DisasterCard
            showDisasterCard={showDisasterCard}
            setShowDisasterCard={setShowDisasterCard}
            disaster={disaster}
          />
        )}
      </div>
    </section>
  );
}

export default Disaster;
