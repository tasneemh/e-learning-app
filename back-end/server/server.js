//importing express
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
//importing pool i.e.database 
const pool = require('../db/db');
const dbHelpers = require('../db/dbHelpers/index')(pool);
//creating express server
const app = express();
const PORT = 8000;

app.use(morgan('dev'));
app.use(cors());

//creating a route
app.get("/", (request, response) => {
  dbHelpers.getAllLearners().then(learners => {
    response.json({ learners });
  });
});

//server listening to PORT
app.listen(PORT, () => {
  console.log(`back-end server listening on port ${PORT}`);
});



