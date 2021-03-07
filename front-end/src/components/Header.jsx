//import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Navbar";

export default function Header() {

  return (
    <section className="header">
      <img
        className="logo"
        src="/images/logo.png"
        alt=""
      />
      <Navbar/>
    </section>
  );
}