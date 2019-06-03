var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const app = express()


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


// First you need to create a connection to the db
const con = mysql.createConnection({
  host: 'localhost',
  user: 'test',
  password: 'test',
  database: 'mobileappbooks'
});

con.connect((err) => {
  if (err) {
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

con.end((err) => {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});

 const insert = () =>









module.exports = router;


// INSERT INTO `book`(book_id, title, year, author_id)
// VALUES (1, "Documentum Content Management Foundations : EMC Proven Professional ", '2007',"1");

// INSERT INTO `book`(book_id, title, year, author_id)
// VALUES (2, "Endangered Nature ", '2005',"1");

// INSERT INTO `book`(book_id, title, year, author_id)
// VALUES (3, "Documentum 6.5 Content Management Foundations", '1990',"1");

// '
// 'UPDATE `book`
// SET
//     (title: "A Time to Kill", year: 1909),
//     (title: "The Firm", year: 1991),
//     (title: "The Pelican Bries", year: 1992),
//     (title: "The Client", year: 1993),
//     (title: "The Chamber", year: 1994),
//     (title: "The Rainmaker", year: 1995),
//     (title: "The Runway Jury", year: 1996),
//     (title: "The partner", year: 1997),
//     (title: "The StreetLawyer", year: 1998),
//     (title: "The Testament", year: 1999),
//     (title: "The Brethren", year: 2000),
//     (title: "A Painted House", year: 2001),
//     (title: "Skipping Christmas", year: 2001),
//     (title: "The summons", year: 2002),
//     (title: "The King of Torts", year: 2000),
//     (title: "Bleacherst", year: 2003),
//     (title: "The Last Juror", year: 2004),
//     (title: "The Broker", year: 2005),
//     (title: "Paying For Pizza", year: 2007),
//     (title: "The Appeal", year: 2008),
//     (title: "The Associate", year: 2009),
//     (title: "The Confession", year: 2010)},
//     (title: "The Litigators", year: 2011),
//     (title: "Calico Joe", year: 2012),
//     (title: "The Racketeer", year: 2012),
//     (title: "Sycamore Row", year: 2013),
//     (title: "Gray Mountain", year: 2014)
//   WHERE `author_id` = 3;