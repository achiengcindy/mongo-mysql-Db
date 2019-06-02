var express = require('express');
var router = express.Router();

//You require the mongodb package and you get the MongoClient object from it.
const mongo = require('mongodb');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET list oof authors. */
router.get('/authorlist', (req, res) => {
  // You require the mongodb package and you get the MongoClient object from it.
  const mongoClient = require('mongodb').MongoClient
  // connect to the local db
  const url = 'mongodb://localhost:27018/'
  mongoClient.connect(url, { useNewUrlParser: true } , (err, db) => {
   const dbo = db.db('mobileappbooks'); 
    if (err) throw err;
    console.log("using mobileappbooks database!");
    // get ciollection
    const collection = dbo.collection('library')
    collection.find({}).toArray((err, result) => {
      if (err) throw err;
      else if (result.length) {
        res.render('authorslist', { authorslist: result });
      }
      else {res.send("No Document")}
      db.close();

    });


  });
});
    
    


module.exports = router;