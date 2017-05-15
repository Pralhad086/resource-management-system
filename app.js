var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;

app.use('/', express.static('WebContent'));

app.get('/showresource', function (req, res) {
  MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
    if (err) throw err

    db.collection('resources').find().toArray(function (err, result) {
      if (err) throw err
      res.send(result);
      db.close();
    });
  });
});

app.get('/save', function (req, res) {
  console.log(req.query);
  res.send(req.query);
  var document = req.query;
  MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
    if (err) throw err
    db.collection('resources').insertOne(document, function(err, r){
      db.close();
    });
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
