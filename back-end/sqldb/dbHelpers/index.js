module.exports = (pool) => {

  const saveNewUser = (newUser) => {
    const { firstname, lastname, email, password, usertype } = newUser;
    if (usertype === "educator") {
      console.log("educator yes");
      return pool.query(`
      INSERT INTO educators(first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING *;`,
        [firstname, lastname, email, password])
        .then(data => {
          data.rows[0]['usertype'] = "educator";
          return data.rows[0];
        }).catch(error => {
          return error;
        });
    } else if (usertype === "learner") {
      console.log("learner yes");
      return pool.query(`
      INSERT INTO learners(first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING *;`,
        [firstname, lastname, email, password])
        .then(data => {
          data.rows[0]['usertype'] = "learner";
          return data.rows[0];
        }).catch(error => {
          return error;
        });
    }
  };

  const saveCourse = (course) => {
    const { courseName, courseCode, courseDescription, courseImageUrl, courseMaterialUrl, educatorId, imageFileFormat, materialFileFormat } = course;
    return pool.query(`
      INSERT INTO courses(name, code, description, image_url, material_url, image_file_format, material_file_format) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
      [courseName, courseCode, courseDescription, courseImageUrl, courseMaterialUrl, imageFileFormat, materialFileFormat])
      .then(data => {
        console.log("data", data);
        const courseId = data.rows[0].id;
        return pool.query(`
      INSERT INTO educators_courses(educator_id, course_id) VALUES($1, $2) RETURNING *;`,
          [educatorId, courseId])
          .then(data => {
            console.log("insertion into bridge table", data);
          });
      })
      .catch(error => {
        return error;
      });
  };

  const enrollCourse = (id) => {
    console.log("id", id);
    return pool.query(`
    INSERT INTO learners_courses(learner_id, course_id) VALUES($1, $2) RETURNING *;`,
      [id.learnerid, id.courseid])
      .then(data => {
        return data.rows[0];
      })
      .catch(error => {
        return error;
      });
  };

  const getAllCoursesForEducator = (educatorId) => {
    return pool.query(`
    SELECT courses.* FROM courses 
    JOIN educators_courses ON courses.id = educators_courses.course_id 
    JOIN educators ON educators.id = educators_courses.educator_id 
    WHERE educators.id = $1`, [educatorId])
      .then(response => {
        return response.rows;
      }).catch(error => {
        console.log(error);
      });
  };

  const getUserData = (user) => {
    return pool.query(`
    SELECT *, 'educator' AS source FROM educators WHERE email = $1
    UNION ALL
    SELECT *, 'learner' AS source FROM learners WHERE email = $1`, [user.email])
      .then(response => {
        return response.rows[0];
      }).catch(error => {
        console.log(error);
      });
  };

  const getAllCoursesForLearner = () => {
    return pool.query(`
    SELECT courses.id AS course_id, courses.*, educators.id AS educator_id, educators.* FROM courses 
    JOIN educators_courses ON courses.id = educators_courses.course_id 
    JOIN educators ON educators.id = educators_courses.educator_id 
    ORDER BY courses.created_at DESC`)
      .then(response => {
        console.log("response", response.rows);
        return response.rows;
      }).catch(error => {
        console.log(error);
      });
  };

  const getRegisteredCoursesForLearner = (learnerId) => {
    return pool.query(`
    SELECT courses.*, learners_courses.date_of_enrollment AS enrollment FROM courses 
    JOIN learners_courses ON courses.id = learners_courses.course_id 
    JOIN learners ON learners.id = learners_courses.learner_id 
    WHERE learners.id = $1`, [learnerId])
      .then(response => {
        console.log("response in get registered course for learner", response.rows);
        return response.rows;
      }).catch(error => {
        console.log(error);
      });
  };

  const getNumLearnersForCourses = (educatorId) => {
    return pool.query(`
    SELECT courses.id AS course_id, courses.name AS course_name, COUNT(learners_courses.learner_id) AS num_learners 
    FROM educators_courses
    LEFT JOIN courses ON educators_courses.course_id = courses.id
    LEFT JOIN learners_courses ON courses.id = learners_courses.course_id
    WHERE educators_courses.educator_id = $1
    GROUP by courses.id
    ORDER by courses.created_at;`, [educatorId])
      .then(response => {
        return response.rows;
      }).catch(error => {
        console.log(error);
      });
  };

  const getTotalLearnersAndCoursesForEducator = (educatorId) => {
    return pool.query(`
    SELECT educators_courses.educator_id AS educator_id, COUNT(DISTINCT educators_courses.course_id) AS total_courses, 
    COUNT(DISTINCT learners_courses.learner_id) AS total_learners FROM educators_courses
    LEFT JOIN learners_courses ON educators_courses.course_id = learners_courses.course_id
    WHERE educators_courses.educator_id = $1
    GROUP BY educators_courses.educator_id;`, [educatorId])
      .then(response => {
        return response.rows[0];
      }).catch(error => {
        console.log(error);
      });
  };

  return { saveNewUser, saveCourse, getAllCoursesForEducator, getUserData, getAllCoursesForLearner, enrollCourse, getRegisteredCoursesForLearner, getNumLearnersForCourses, getTotalLearnersAndCoursesForEducator };
};