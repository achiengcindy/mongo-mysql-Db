const mysql = require('mysql');

// First you need to create a connection to the db
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'test',
    password: 'test',
    database: 'mobileappbooks'
});


/**
 * All books published before 2000 by any author
 */
connection.query("SELECT * FROM book WHERE year < 2000;", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
});



/**
 * All Books Published By Grishna
 */
connection.query("SELECT * FROM mobileappbooks.book WHERE author_id in (SELECT author_id from author where first_name like '%grisham%' or last_name like '%grisham%');", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
});



/**
 * All Books Not Published By Grishma
 */
connection.query("SELECT * FROM book WHERE author_id NOT IN (SELECT author_id from author where first_name like '%grisham%' or last_name like '%grisham%');", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
});





/**
 * All Books Published between 2000 and 2009 By any Author
 */
connection.query("SELECT * FROM book WHERE year >= 2000 AND year<=2009;", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
});


/**
 * Number of  Books Published after 2009
 */
connection.query("SELECT COUNT(*) FROM book WHERE year > 2009;", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
});










connection.end();

