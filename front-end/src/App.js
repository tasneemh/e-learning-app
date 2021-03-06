
import { useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';


function App() {
  const [state, setState] = useState({
    learners: []
  });


  axios.get('/learners')
    .then(response => {
      setState(prev => ({
        ...prev,
        learners: response.data.learners
      }));

    })
    .catch(error => {
      console.log(error);
    });*/

  const displayLearners = state.learners.map(learner => {
    return (<div>{learner.first_name}</div>);
  });

  return (
    <div className="App">
      {state.learners && displayLearners}
      <Header />
    </div>
  );
}

export default App;
