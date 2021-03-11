import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h4><a href="/">Home</a></h4>
      <h4><a href="/notes">Notes</a></h4>
      <h4><a href="/login">Login</a></h4>
    </nav>
    
    );
}