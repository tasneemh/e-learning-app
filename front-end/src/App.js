import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Educator from "./components/Educator";
import Learner from "./components/Learner";
import CourseForm from "./components/CourseForm";
import CourseDetails from "./components/CourseDetails";
import AccessForm from "./components/AccessForm";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const validate = (isLoggedIn) => {
    setLoggedIn(isLoggedIn);
  };

  return (
    <div className="App">
      <Router>
        <Header validate={validate} loggedIn={loggedIn} />
        <Switch>
          {/**Home, Notes & create note are rerouted using react-router-dom. The path will take to each of the component */}
          <Route path="/" exact>
            {/**Home -- since we dont want home page to render on every page so we specify that home is an exact component*/}
            <Home />
          </Route>
          <Route path="/login">
            {/** login*/} <Login validate={validate} />
          </Route>
          <Route path="/register">
            {/** register*/} <Register />
          </Route>
          <Route path="/educator">
            {/** educator*/} <Educator validate={validate}/>
          </Route>
          <Route path="/educator-createnewcourses">
            {/** educator-createnewcourse*/}
            <CourseForm />
          </Route>
          <Route path="/educator-giveaccessrights">
            {/** educator-giveaccessrights*/}
            <AccessForm />
          </Route>
          <Route path="/learner">
            {/** learner*/} <Learner validate={validate}/>
          </Route>
          <Route path="/learner-coursedetails">
            {/** learner-coursedetails*/} <CourseDetails />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
