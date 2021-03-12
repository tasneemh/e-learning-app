import "./SideBar.css";
import Button from "./Button";
import { useHistory } from "react-router-dom";

export default function SideBar(props) {
  console.log("props in sidebar", props);
  return (
    <section className="sidebar">
      <div className="profile">
        <div className="message">Hello</div>
        <div className="overlay"></div>
      </div>
      <Button />
    </section>);
} 