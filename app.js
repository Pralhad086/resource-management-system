var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var dbConnectString = 'mongodb://localhost:27017/test';

app.use(function(req, res, next) { //allow cross origin requests
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', express.static('WebContent'));
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json());

app.get('/showresource', function(req, res) {
  MongoClient.connect(dbConnectString, function(err, db) {
    if (err) throw err

    db.collection('resources').find().toArray(function(err, result) {
      if (err) throw err
      res.send(result);
      db.close();
    });
  });
});

//multers disk storage settings
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function(req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '_' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
  }
});

//multer upload settings
var upload = multer({storage: storage}).fields([{ name: 'emp_pic', maxCount: 1 },{ name: 'emp_resume', maxCount: 1 }]);

app.post('/save', upload, function(req, res) {
  //console.log(req.files);
  //console.log(req.body.emp_data);
  var document = JSON.parse(req.body.emp_data);
  // console.log('++++ Normal Form data +++')
  // console.log(document);

  for (var attrname in req.files) {
    document[attrname] = req.files[attrname];
  }

  // console.log('+++ Data after adding file fields to it +++');
  // console.log(document);

  MongoClient.connect(dbConnectString, function(err, db) {
    if (err) {
      res.send(err);
      return;
    }
    db.collection('resources').insertOne(document, function(err, r) {
        if(err) {
          res.send(err);
          return;
        }
        res.json({
          code: 0,
          desc: r,
        });
        db.close();
    });
  });
});

/** API path that will upload the files */
app.post('/upload', function(req, res) {
  console.log(req);
  upload(req, res, function(err) {
    if (err) {
      res.json({
        error_code: 1,
        err_desc: err
      });
      return;
    }
    res.json({
      error_code: 0,
      err_desc: null
    });
  });
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});
