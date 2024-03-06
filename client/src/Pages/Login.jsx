import React from "react";
import "../styles/Login.css";
import { useState } from "react";

function Login() {
  const [user, setUser] = useState("Rescuer");
  return (
    <section className="login-wrapper">
      <div className="login-section">
        <h1 className="user-title">{user} Login</h1>

        <div className="login-type">
          <a className="user-change" onClick={() => setUser("Authority")}>
            Authority
          </a>
          <p>|</p>
          <a className="user-change" onClick={() => setUser("Rescuer")}>
            Rescuer
          </a>
          <p>|</p>
          <a className="user-change" onClick={() => setUser("Organisation")}>
            Organisation
          </a>
        </div>

        <input type="text" placeholder="username" />
        <input type="password" placeholder="password" />
        <button className="login-button">Login</button>
      </div>
    </section>
  );
}

export default Login;
