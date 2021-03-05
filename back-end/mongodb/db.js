const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

const mongodbSetup = (callback) => {
  MongoClient.connect(url, function(err, client) {
    console.log("monogodb connected successfully to server");
    callback(client.db(dbName));
  });
}  

module.exports = mongodbSetup;