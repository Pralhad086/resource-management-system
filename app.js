var express = require('express')
var app = express()
var MongoClient = require('mongodb').MongoClient

app.use('/', express.static('WebContent'))

app.get('/showresource', function (req, res) {
  MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
    if (err) throw err

    db.collection('resources').find().toArray(function (err, result) {
      if (err) throw err
      res.send(result)
    })
  })
})



app.listen(8888, function () {
  console.log('Example app listening on port 8888!')
})
