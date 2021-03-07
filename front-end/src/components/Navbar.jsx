import React from "react";

//import browser-router
//importing Link
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar bg-dark container">
      {/** after configuring route in App component, render Link component directed to different routes*/}
      <h4><Link className="link" to="/">Home</Link></h4>
      <h4><Link className="link" to="/notes">Notes</Link></h4>
      <button><Link className="link" to="/login">Login</Link></button>
    </nav>
    );
}