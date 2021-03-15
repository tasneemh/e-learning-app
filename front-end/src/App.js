import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Notes from "./components/Notes";
import Login from "./components/Login";
import Register from "./components/Register";
import Educator from "./components/Educator";
import Learner from "./components/Learner";
import CourseForm from "./components/CourseForm";
import CourseDetails from "./components/CourseDetails";

function App() {
  const [state, setState] = useState({
    learners: [],
  });

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          {/**Home, Notes & create note are rerouted using react-router-dom. The path will take to each of the component */}
          <Route path="/" exact>
            {/**Home -- since we dont want home page to render on every page so we specify that home is an exact component*/}
            <Home />
          </Route>
          <Route path="/notes">
            {/** Notes*/} <Notes />
          </Route>
          <Route path="/login">
            {/** login*/} <Login />
          </Route>
          <Route path="/register">
            {/** register*/} <Register />
          </Route>
          <Route path="/educator">
            {/** educator*/} <Educator />
          </Route>
          <Route path="/educator-createnewcourses">
            {/** educator/courses/createnewcourse*/}
            <CourseForm />
          </Route>
          <Route path="/learner">
            {/** learner*/} <Learner />
          </Route>
          <Route path="/learner-coursedetails">
            {/** learner*/} <CourseDetails />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
