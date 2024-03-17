import React from "react";
import { SquareUser, MapPin, Mail, Phone, Fingerprint } from "lucide-react";
import "../styles/Profile.css";
import { useAuth } from "../context/auth-provider";

function Profile() {
  const { auth } = useAuth();
  return (
    <div className="parent-div">
      <div className="profile-div">
        <div className="pic-and-name">
          <SquareUser size={200} strokeWidth={1.5} />
          <h2>{auth.name}</h2>
          <p>{auth?.type}</p>
        </div>
        <div className="user-details">
          <div className="icon-and-details">
            <Fingerprint />
            <p>{auth.id}</p>
          </div>
          <div className="icon-and-details">
            <Mail />
            <p>{auth.email}</p>
          </div>
          <div className="icon-and-details">
            <Phone />
            <p>{auth.phone}</p>
          </div>
          <div className="icon-and-details">
            <MapPin />
            <p>
              {auth.city}, {auth.state}, {auth.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
