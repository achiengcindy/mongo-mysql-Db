var express = require('express');
var router = express.Router();
//You require the mongodb package and you get the MongoClient object from it.
const mongo = require('mongodb');

const getLibraryCollection = () => {
  return new Promise((resolve, reject) => {
    // You require the mongodb package and you get the MongoClient object from it.
    const mongoClient = mongo.MongoClient
    // connect to the local db
    const url = 'mongodb://localhost:27018/'
    mongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
      const dbo = db.db('mobileappbooks');
      if (err) {
        reject(err);
        return;
      }
      console.log("using mobileappbooks database!");
      // get ciollection
      const collection = dbo.collection('library')
      collection.find({}).toArray((err, result) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result);
        // db.close();
      })
    });
  });
}



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET list oof authors. */
router.get('/authorlist', (req, res) => {
  getLibraryCollection().then(authorList => {
    if (authorList.length) {
      res.render('authorslist', { authorslist: authorList });
    }
    else {
      res.send("No Document")
    }
  }).catch(err => {
    throw err;
  });
});

/* Find Author Grashina and add books. */
router.get('/grashina', (req, res) => {
  // You require the mongodb package and you get the MongoClient object from it.
  const mongoClient = require('mongodb').MongoClient
  // connect to the local db
  const url = 'mongodb://localhost:27018/'
  mongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
    const dbo = db.db('mobileappbooks');
    if (err) throw err;
    console.log("using mobileappbooks database!");
    var myobj = [
      { title: "A Time to Kill", year: 1909 },
      { title: "The Firm", year: 1991 },
      { title: "The Pelican Bries", year: 1992 },
      { title: "The Client", year: 1993 },
      { title: "The Chamber", year: 1994 },
      { title: "The Rainmaker", year: 1995 },
      { title: "The Runway Jury", year: 1996 },
      { title: "The partner", year: 1997 },
      { title: "The StreetLawyer", year: 1998 },
      { title: "The Testament", year: 1999 },
      { title: "The Brethren", year: 2000 },
      { title: "A Painted House", year: 2001 },
      { title: "Skipping Christmas", year: 2001 },
      { title: "The summons", year: 2002 },
      { title: "The King of Torts", year: 2000 },
      { title: "Bleacherst", year: 2003 },
      { title: "The Last Juror", year: 2004 },
      { title: "The Broker", year: 2005 },
      { title: "Paying For Pizza", year: 2007 },
      { title: "The Appeal", year: 2008 },
      { title: "The Associate", year: 2009 },
      { title: "The Confession", year: 2010 },
      { title: "The Litigators", year: 2011 },
      { title: "Calico Joe", year: 2012 },
      { title: "The Racketeer", year: 2012 },
      { title: "Sycamore Row", year: 2013 },
      { title: "Gray Mountain", year: 2014 }
    ]
    // get collection
    const collection = dbo.collection('library')
    collection.updateOne(
      { "author": "John Grishan" },
      { $set: { books: myobj } },
      { upsert: true });

      res.send('hello world!');
  });
});



/* GET list of Books associated with author. */
router.get('/booklist', (req, res) => {
  // You require the mongodb package and you get the MongoClient object from it.
  const mongoClient = require('mongodb').MongoClient
  // connect to the local db
  const url = 'mongodb://localhost:27018/'
  mongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
    const dbo = db.db('mobileappbooks');
    if (err) throw err;
    console.log("using mobileappbooks database!");
    // get collection
    const collection = dbo.collection('library')
    collection.find({}).toArray((err, authorList) => {
      if (err) throw err;
      else if (authorList.length) {
        const bookList = (authorList || [])
          .map(author =>
            (author.books || [])
              .map(book =>
                Object.assign(book, { author: author.author })))

        const allBooks = [].concat.apply([], bookList)
        res.render('booklist', { booklist: allBooks });
      }
      else { res.send("No Document") }
      db.close();

    });

  });
});

/* GET list of Books. */
router.get('/newbook', (req, res) => {
  // You require the mongodb package and you get the MongoClient object from it.
  const mongoClient = require('mongodb').MongoClient
  // connect to the local db
  const url = 'mongodb://localhost:27018/'
  mongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
    const dbo = db.db('mobileappbooks');
    if (err) throw err;
    console.log("using mobileappbooks database!");
    // get ciollection
    const collection = dbo.collection('library')
    collection.find({}).toArray((err, result) => {
      if (err) throw err;
      else if (result.length) {
        res.render('newbook', { title: 'Add New Book', authorslist: result });
      }
      else { res.send("No authors") }
      db.close();
    });

  });
});

// add a book on the web interface

router.post('/addbook', function (req, res) {
  // You require the mongodb package and you get the MongoClient object from it.
  const mongodb = require('mongodb')
  const mongoClient = mongodb.MongoClient

  // connect to the local db
  const url = 'mongodb://localhost:27018/'
  mongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
    const dbo = db.db('mobileappbooks');
    if (err) throw err;
    console.log("using mobileappbooks database!");
    // get ciollection
    const collection = dbo.collection('library')
    collection.updateOne(
      { "_id": new mongodb.ObjectID(req.body.author) },
      { $push: { books: { title: req.body.title, year: req.body.year } } },
      { upsert: true });

    res.redirect('/newbook');
  });
});

module.exports = router;



