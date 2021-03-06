const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'educational_web_app';

//connecting to mongoDb
const mongodbSetup = (callback) => {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) =>{
    if(err) throw new Error(err);
    console.log("monogodb connected successfully to server");
    callback(client.db(dbName));
  });
}  

module.exports = mongodbSetup;