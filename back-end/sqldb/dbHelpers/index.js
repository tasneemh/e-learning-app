//importing pool from db/index.js
module.exports = (pool) => {
  const getAllLearners = () => {
    //quering db for info
    return pool.query(`SELECT * FROM learners;`).then(response => {
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
      INSERT INTO educators(first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING *;`, [firstname, lastname, email, password]).then(data => {
        data.rows[0]['usertype'] = "educator";
        return data.rows[0];
      }).catch(error => {
        return error;
      });
    } else if (usertype === "learner") {
      console.log("learner yes");
      return pool.query(`
      INSERT INTO learners(first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING *;`, [firstname, lastname, email, password]).then(data => {
        data.rows[0]['usertype'] = "learner";
        return data.rows[0];
      }).catch(error => {
        return error;
      });
    }
  };

  return { getAllLearners, saveNewUser };
};