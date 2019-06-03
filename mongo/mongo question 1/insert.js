const mongoClient = require('mongodb').MongoClient
// connect to the local db
const url = 'mongodb://localhost:27017/'
mongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  const dbo = db.db('mobileappbooks2');
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
  // get collectionmongod

  const collection = dbo.collection('library')
  collection.updateOne(
    { "author": "John Grishan" },
    { $set: { books: myobj } },
    { upsert: true });


    db.close();
});