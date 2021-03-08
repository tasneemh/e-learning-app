
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Home from "./components/Home";
import Notes from "./components/Notes";
import Login from "./components/Login";
import Register from "./components/Register";
import Educator from './components/Educator';
import Learner from "./components/Learner";
import EducatorCourses from "./components/EducatorCourses";
import CourseForm from "./components/CourseForm";

function App() {
  const [state, setState] = useState({
    learners: []
  });

  /*axios.get('/learners')
    .then(response => {
      setState(prev => ({
        ...prev,
        learners: response.data.learners
      }));

    })
    .catch(error => {
      console.log(error);
    });

  const displayLearners = state.learners.map(learner => {
    return (<div>{learner.first_name}</div>);
  });*/

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
            {/** Notes*/}
            <Notes />
          </Route>
          <Route path="/login">
            {/** login*/}
            <Login />
          </Route>
          <Route path="/register"> 
            {/** register*/}
            <Register />
          </Route>
           {/**<Redirect from="/old-path" to="/new-path" /> */}
          <Route path="/educator">
            {/** educator*/}
            <Educator />
          </Route>
          <Route path="/courses">
            {/** educator/courses*/}
            <EducatorCourses />
          </Route>
          <Route path="/createnewcourses">
            {/** educator/courses/createnewcourse*/}
            <CourseForm />
          </Route>
          <Route path="/learner">
            {/** learner*/}
            <Learner />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
