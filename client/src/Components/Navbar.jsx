import React from "react";
import "../styles/Navbar.css";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <div className="navbar-section">
        <h1 className="navbar-title">ResQL</h1>
        <div className="searchbar">
          <Search />
          <input type="text" placeholder="Search" className="searchbar-input" />
        </div>
        <Link to="/login">
          <h2 className="login">Login</h2>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
