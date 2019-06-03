const mongo = require('mongodb');

const getLibraryCollection = (find = {}) => {
  return new Promise((resolve, reject) => {
    // You require the mongodb package and you get the MongoClient object from it.
    const mongoClient = mongo.MongoClient
    // connect to the local db
    const url = 'mongodb://localhost:27017/'
    mongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
      const dbo = db.db('mobileappbooks2');
      if (err) {
        reject(err);
        return;
      }
      console.log("using mobileappbooks database!");
      // get ciollection
      const collection = dbo.collection('library')
      collection.find(find).toArray((err, result) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result);
        // db.close();
      })
    });
  });
};

/**
 * All books published before 2000 by any author
 */
getLibraryCollection({ "books.year": { $lt: 2000 } })
  .then(authorList => {
    console.log(authorList);
  }).catch(err => {
    throw err;
  });


/**
* All books published by Grisham
*/
getLibraryCollection({ "books.year": { $lt: 2000 } })
  .then(authorList => {
    console.log(authorList);
  }).catch(err => {
    throw err;
  });


/**
* All books published by Grisham
*/
getLibraryCollection({ "author": "Grisham" })
  .then(authorList => {
    console.log(authorList);
  }).catch(err => {
    throw err;
  });

/**
* All books not published by Grisham
*/
getLibraryCollection({ "author": { $not: "Grisham" } })
  .then(authorList => {
    console.log(authorList);
  }).catch(err => {
    throw err;
  });

/**
* All books not published between 2000 and 2009
*/
getLibraryCollection({ "books.year": { $gt: 2000, $lt: 2009 } })
  .then(authorList => {
    console.log(authorList);
  }).catch(err => {
    throw err;
  });

/**
* All books not published after 2009
*/
  getLibraryCollection({ "books.year": { $gt: 2009 } })
  .then(authorList => {
    console.log(authorList);
  }).catch(err => {
    throw err;
  });