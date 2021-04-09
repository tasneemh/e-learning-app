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

//creating express server
const app = express();
const PORT = 9001;

app.use(morgan('dev'));
app.use(cors({origin: true, credentials: true}));
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
app.post("/addnewsubstitute", (request, response) => {
  const user = request.body.data;
  sqldbHelpers.addNewSubstitute(user).then(
    user => {
      if (!user) {
        response.send({ error: "error" });
        return;
      }
      response.send({ message: "Succesfully provided access rights" });
    })
    .catch(error => response.send(error));
});

app.post("/getregistereduser", (request, response) => {
  const registeredUser = request.body.data;
  sqldbHelpers.getUserData(registeredUser).then(
    user => {
      if (!user) {
        response.send({ error: "error" });
        return;
      }
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

app.get("/learner/:learnerid/checkduplicatecourse/:courseid", (request, response) => {
  const learnerId = request.params.learnerid;
  const courseId = request.params.courseid;
  sqldbHelpers.checkDuplicateCourseForLearner(learnerId, courseId).then(
    data => {
      if (data.length > 0) {
        response.send({ message: "You have already enrolled for this course!" });
        return;
      } else {
        response.send({ message: "" });
      }
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

app.get("/educator/:id/courseswithaccessrights", (request, response) => {
  const educatorId = request.params.id;
  sqldbHelpers.getAllCoursesForEducatorWithAccessRights(educatorId).then(
    course => {
      if (!course) {
        response.send([]);
        return;
      }
      response.send(course);
    })
    .catch(error => response.send(error));
});

app.get("/learner/:id/courses", (request, response) => {
  const learnerId = request.params.id;
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

app.get("/:id/getalleducators", (request, response) => {
  const educatorId = request.params.id;
  sqldbHelpers.getAllEducators(educatorId).then(
    educatorsArr => {
      if (!educatorsArr) {
        response.send({ message: "no educators" });
        return;
      }
      response.send(educatorsArr);
    })
    .catch(error => response.send(error));
});

// express server listening to PORT
app.listen(PORT, () => {
  console.log(`back-end server listening on port ${PORT}`);
});









