module.exports = (pool) => {
  const getAllLearners = () => {
    //quering db for info
    return pool.query(`SELECT * FROM learners;`).
      then(response => {
        return response.rows;
      }).catch(error => {
        console.log(error);
      });
  };

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
    const { courseName, courseCode, courseDescription, courseImageUrl, courseMaterialUrl, educatorId } = course;
    return pool.query(`
      INSERT INTO courses(name, code, description, image_url, material_url) VALUES($1, $2, $3, $4, $5) RETURNING *;`,
      [courseName, courseCode, courseDescription, courseImageUrl, courseMaterialUrl])
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

  return { getAllLearners, saveNewUser, saveCourse };
};