import "./NavBar.css";
import fire from "./fire";
import {useHistory} from "react-router-dom";

export default function NavBar(props) {
  const loggedIn = props.loggedIn;
  const history = useHistory();

  const handleLogOutClick = () => {
    fire.auth().signOut();
    props.validate(false);
    history.push("/");
  }

  return (
    <nav className="navbar">
    <ul>
      <li><a className="active" href="/">Home</a></li>
      {!loggedIn && <li><a href="/login">Login</a></li>}
      {loggedIn && <li><button className="logout-btn" onClick={handleLogOutClick}>Logout</button></li>}
    </ul>
    </nav>
  );
}