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
    console.log("inside save function", newUser);
    if(newUser.userType === "educator"){
      console.log("educator yes");
    }else if(newUser.userType === "learner"){
      console.log("learner yes");
    }
    //quering db for info
    /*return pool.query(`SELECT * FROM learners;`).then(response => {
      return response.rows;
    }).catch(error => {
      console.log(error);
    });*/
  };

  return { getAllLearners, saveNewUser };
};