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

  return { getAllLearners };
};