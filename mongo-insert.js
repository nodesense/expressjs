var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
 
var insertUsers = function(db, callback) {
   var collection = db.collection('users');
  // Insert some documents 
  collection.insertMany([
     {
       username: 'admin',
       password: 'admin'
     },
     {
       username: 'staff',
       password: 'staff'
     },
     {
       username: 'user',
       password: 'user'
     }
  ], function(err, result) {
     console.log("Inserted 3 users into the document collection");
    callback(result);
  })

}
var insertDocuments = function(db, callback) {
  // Get the documents collection 
  var collection = db.collection('products');
  // Insert some documents 
  collection.insertMany([
     {
       name: 'iphone',
       year: 2010
     },
     {
       name: 'moto',
       year: 2015
     },
     {
       name: 'nexus',
       year: 2016
     }
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the document collection");
    callback(result);
  });
}

// Connection URL 
var url = 'mongodb://localhost:27017/products';
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
 
  insertUsers(db, function() {
    db.close();
  });
});
