//importing express
const express = require('express');
//importing middleware for node
const morgan = require('morgan');
//importing cors to enable cors
const cors = require('cors');
const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
//importing pool i.e.database 
const pool = require('../sqldb/db');
const sqldbHelpers = require('../sqldb/dbHelpers/index')(pool);
//importing mongoDb
const mongodbSetup = require('../mongodb/db');

//creating express server
const app = express();
const PORT = 9001;

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post("/savenewuser", (request, response) => {
  const newUser = request.body.data;
  const hashedPassword = bcrypt.hashSync(newUser.password, 10);
  newUser.password = hashedPassword;
  sqldbHelpers.saveNewUser(newUser).then(
    user => {
      if (!user) {
        response.send({ error: "error" });
        return;
      }
      response.send({ user: { firstname: user.first_name, lastname: user.last_name, email: user.email, id: user.id, usertype: user.usertype } });
    })
    .catch(error => response.send(error));
});

app.post("/getregistereduser", (request, response) => {
  console.log("request", request.body.data);
  const registeredUser = request.body.data;
  sqldbHelpers.getUserData(registeredUser).then(
    user => {
      if (!user) {
        response.send({ error: "error" });
        return;
      }
      console.log("user", user);
      response.send({ user: { firstname: user.first_name, lastname: user.last_name, email: user.email, id: user.id, usertype: user.source } });
    })
    .catch(error => response.send(error));
});

app.post("/uploadcourse", (request, response) => {
  const course = request.body.course;
  sqldbHelpers.saveCourse(course).then(
    course => {
      if (!course) {
        response.send({ error: "error" });
        return;
      }
      response.send(course);
    })
    .catch(error => response.send(error));
});

app.post("/enrollcourse", (request, response) => {
  const id = request.body.data;
  sqldbHelpers.enrollCourse(id).then(
    data => {
      if (!data) {
        response.send({ error: "error" });
        return;
      }
      response.send(data);
    })
    .catch(error => response.send(error));
});

app.get("/educator/:id/learnersforcourses", (request, response) => {
  const educatorId = request.params.id;
  sqldbHelpers.getNumLearnersForCourses(educatorId).then(
    data => {
      if (!data) {
        response.send({ message: "no available data" });
        return;
      }
      response.send(data);
    })
    .catch(error => response.send(error));
});

app.get("/educator/:id/totallearnersandcourses", (request, response) => {
  const educatorId = request.params.id;
  sqldbHelpers.getTotalLearnersAndCoursesForEducator(educatorId).then(
    data => {
      if (!data) {
        response.send({ message: "no available data" });
        return;
      }
      response.send(data);
    })
    .catch(error => response.send(error));
});

app.get("/educator/:id/courses", (request, response) => {
  const educatorId = request.params.id;
  sqldbHelpers.getAllCoursesForEducator(educatorId).then(
    course => {
      if (!course) {
        response.send({ message: "no courses" });
        return;
      }
      response.send(course);
    })
    .catch(error => response.send(error));
});



app.get("/learner/:id/courses", (request, response) => {
  const learnerId = request.params.id;
  console.log("learnerid", request.params.id);
  sqldbHelpers.getRegisteredCoursesForLearner(learnerId).then(
    courses => {
      if (!courses) {
        response.send({ message: "no courses" });
        return;
      }
      response.send(courses);
    })
    .catch(error => response.send(error));
});

app.get("/allcoursesforlearner", (request, response) => {
  sqldbHelpers.getAllCoursesForLearner().then(
    courses => {
      if (!courses) {
        response.send({ message: "no courses" });
        return;
      }
      response.send(courses);
    })
    .catch(error => response.send(error));
});

/*mongodbSetup((monogodb) => {
  app.get("/test", async (request, response) => {
    //passing collection named documents
    const result = await monogodb.collection('documents').find().toArray();
    response.json(result);
  });
});*/

// express server listening to PORT
app.listen(PORT, () => {
  console.log(`back-end server listening on port ${PORT}`);
});









