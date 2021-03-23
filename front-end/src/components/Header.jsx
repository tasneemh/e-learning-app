//import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./NavBar";
import "./Header.css";

export default function Header() {
  return (
    <section className="header">
      <img className="logo" src="/images/logo.png"/>
      <NavBar />
    </section>
  );
}
