// const findDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('post');
//   // Find some documents
//   collection.findOne({'user': 'liuzeyu', 'id': '00001'}).toArray(function(err, docs) {
//     assert.equal(err, null);
//     console.log("Found the following records");
//     console.log(docs);
//     callback(docs);
//   });
// }

// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

// // Connection URL
// const url = 'mongodb://localhost:27017/blogDB';

// // Database Name
// const dbName = 'blogDB';

// // Use connect method to connect to the server
// MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
// assert.equal(null, err);
// console.log("Connected correctly to server");

// const db = client.db(dbName);

// findDocuments(db, function() {
//   client.close();
// });
// });

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/blogDB';

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db('blogDB');
    var whereStr = {'user': 'liuzeyu', 'id': '00001'};  // 查询条件
    dbo.collection("post").find(whereStr).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});
