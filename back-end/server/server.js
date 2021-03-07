//importing express
const express = require('express');
//importing middleware for node
const morgan = require('morgan');
//importing cors to enable cors
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
//importing pool i.e.database 
const pool = require('../sqldb/db');
const sqldbHelpers = require('../sqldb/dbHelpers/learners')(pool);
//importing mongoDb
const mongodbSetup = require('../mongodb/db');

//creating express server
const app = express();
const PORT = 9001;

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

app.get("/learners", (request, response) => {
  sqldbHelpers.getAllLearners().then(learners => {
    response.json({ learners });
  });
});

app.post("/user", (request, response) => {
  const newUser = request.body.data;
  const hashedPassword = bcrypt.hashSync(newUser.password, 10);
  newUser.password = hashedPassword;
  sqldbHelpers.saveNewUser(newUser);
});

mongodbSetup((monogodb) => {
  app.get("/test", async (request, response) => {
    //passing collection named documents
    const result = await monogodb.collection('documents').find().toArray();
    response.json(result);
  });
});

// express server listening to PORT
app.listen(PORT, () => {
  console.log(`back-end server listening on port ${PORT}`);
});









