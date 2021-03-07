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
    // const db = client.db(dbName);
    // const collection = db.collection('documents');
    // // Insert some documents
    // collection.insertMany([
    // {a : 1}, {a : 2}, {a : 3}
    // ]);
    callback(client.db(dbName));
  });
}  

module.exports = mongodbSetup;