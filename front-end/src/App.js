
import { useState } from 'react';
import axios from 'axios';
import './App.css';

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
    });

  const displayLearners = state.learners.map(learner => {
    return (<div>{learner.first_name}</div>);
  });

  return (
    <div className="App">
      {state.learners && displayLearners}
    </div>
  );
}

export default App;
