//pg for hooking up connection to our database with express
//importing Pool
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'development',
  password: 'development',
  database: 'educational_web_app',
  port: 5432,

});

pool.connect((err) => {
  if (err) throw new Error(err);
})

console.log("db connection establishing...");
//exporting pool in 
module.exports = pool;