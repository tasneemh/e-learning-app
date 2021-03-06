import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Notes from "./Notes";
import Login from "./Login";

export default function Header(props) {

  return (
    <section className="header">
      <img
        className="header_logo"
        src = {process.env.PUBLIC_URL + "/images/logo.png"}
        alt = ""
      />

      <Router>
        {/** NavBar-- since Navbar will be shown on all 3 pages it is outsde the Route component*/}
        <Navbar />
        {/**Home, Notes & create note are rerouted using react-router-dom. The path will take to each of the component */}
        <Route path="/" exact>
          {/**Home -- since we dont want home page to render on every page so we specify that home is an exact component*/}
          <Home />
        </Route>
        <Route path="/notes">
          {/** Notes*/}
          <Notes />
        </Route>
        <Route path="/login">
          {/** login*/}
          <Login />
        </Route>
      </Router>

    </section>
  );
}