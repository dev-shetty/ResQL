import React, { useEffect, useState } from "react";

import Disaster from "../Components/Disaster";
import RequestDonation from "../Components/DonateAndRescue";
import Navbar from "../Components/Navbar";

import "../styles/Home.css";

function Home() {
  const [disasters, setDisasters] = useState(null);

  async function getDisasters() {
    const response = await fetch("http://localhost:5000/disaster");
    const data = await response.json();
    if (response.ok) {
      setDisasters(data);
    } else {
      setDisasters(null);
    }

    console.log(data);
  }

  useEffect(() => {
    getDisasters();
  }, []);

  return (
    <div className="home-page">
      <Navbar />
      <RequestDonation />
      <div>
        <h1 className="disaster-header">
          <span className="live-dot"></span>Live Disasters
        </h1>
        <div className="disaster-list">
          {disasters ? (
            disasters.disasters.map((disaster) => (
              <Disaster key={disaster.id} disaster={disaster} />
            ))
          ) : (
            <p>No Disasters Available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
