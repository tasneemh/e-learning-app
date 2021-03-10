//import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Navbar";
import "./Header.css";

export default function Header() {

  return (
    <section className="header">
      <img
        className="logo"
        src="/images/logo.png"
        height="100"
      />
      <Navbar/>
    </section>
  );
}