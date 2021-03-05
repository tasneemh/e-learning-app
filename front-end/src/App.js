//importing axios 
import axios from 'axios';
//importing useState hook
import { useState } from 'react';
import './App.css';

function App() {
  const [state, setState] = useState({
    learners: [],
  });
  //GET request to get info about learners table from backend(express)
  axios.get(`http://localhost:8000`)
    .then((response) => {
      setState(prev =>({...prev, learners: response.data.learners}));
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <div className="App">
      <div>{state.learners}</div>
    </div>
  );
}

export default App;
