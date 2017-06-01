var mysql      = require('mysql');
const async = require("async");

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : ''
});


var dbConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database :'nodesense_db'
});


var parseArgs = require('minimist')
var options = parseArgs(process.argv.slice(2));
console.dir(options);

console.log("test now");

function dropDatabase() {
    connection.query('drop database nodesense_db', function (error, results, fields) {
    if (error) throw error;
    console.log('database dropped');
    });
}

const CREATE_PRODUCT_TABLE_QUERY = `
CREATE TABLE Products (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    weight varchar(50),
    year int,
    brandId int,
    price float,
    released date,
    featured bit,
    stock int, 
    PRIMARY KEY (id)
)`


const CREATE_BRANDS_TABLE = `

CREATE TABLE Brands (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    description varchar(255),
    PRIMARY KEY (ID)
);
`




function createDatabase(callback) {
    connection.query('create database nodesense_db', function (error, results, fields) {
        if (error) {
            console.log("error in creating database ", error);
            throw error;
        }

        console.log("Create database done")

        dbConnection.connect(function(err) {
            console.log("connecting to db done"); 
            callback(err);
        })


        
    });
}



connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);

  if (options.drop) {
      dropDatabase();
  }



});



function createTable(query, callback) {
    dbConnection.query(query, function (error, results, fields) {
        if (error) {
            console.log("error in creating database ", error);
            throw error;
        }
 
        console.log("created table");

            callback(err, results);
        


        
    });
}



  if (options.create) {
            
        async.series([
            createDatabase,
            function (callback) {
                createTable(CREATE_PRODUCT_TABLE_QUERY, callback)
            },
            function (callback) {
                createTable(CREATE_BRANDS_TABLE, callback)
            }
        ])
  }
