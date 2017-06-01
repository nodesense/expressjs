var mysql      = require('mysql');
const async = require("async");
const jsonfile = require("jsonfile");

const DB_NAME = 'nodesense_db';

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : ''
});

var dbConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : `${DB_NAME}`
});

var parseArgs = require('minimist')
var options = parseArgs(process.argv.slice(2));
console.dir(options);

console.log("test now");

function dropDatabase() {
    connection.query(`drop database ${DB_NAME}`, function (error, results, fields) {
    if (error) throw error;
    console.log('database dropped');
    });
}
 

const CREATE_PRODUCT_TABLE_QUERY = `
CREATE TABLE Products (
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(255) NOT NULL,
     weight CHAR(20),
     year INT,
     price FLOAT,
     released DATE,
     brandId INT,
     featured BIT,
     PRIMARY KEY (id),
     FOREIGN KEY (brandId)
        REFERENCES Brands(id)
) ENGINE=INNODB;
`

const CREATE_BRAND_TABLE_QUERY = `
CREATE TABLE Brands (
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255),
     PRIMARY KEY (id)
) ENGINE=INNODB; 
`

const CREATE_STATE_TABLE_QUERY = `
CREATE TABLE States (
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(255) NOT NULL,
     code CHAR(100) NOT NULL,
     PRIMARY KEY (id)
) ENGINE=INNODB; 
`


const CREATE_CITY_TABLE_QUERY = `
CREATE TABLE Cities (
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(255) NOT NULL,
     stateId INT,
     PRIMARY KEY (id),

     FOREIGN KEY (stateId)
     REFERENCES States(id)
) ENGINE=INNODB; 
`



const CREATE_STORE_TABLE_QUERY = `
CREATE TABLE Stores (
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(255) NOT NULL,

     email VARCHAR(255),
     phone VARCHAR(255),

     featured BIT,

     cityId INT,
     stateId INT,
     PRIMARY KEY (id),


     FOREIGN KEY (stateId)
     REFERENCES States(id),

     FOREIGN KEY (cityId)
     REFERENCES Cities(id)
) ENGINE=INNODB; 
`


const CREATE_BRAND_STORE_TABLE_QUERY = `
CREATE TABLE brands_stores (
     id INT NOT NULL AUTO_INCREMENT,
     
     brandId INT,
     storeId INT,
     PRIMARY KEY (id),



     FOREIGN KEY (brandId)
     REFERENCES Brands(id),

     FOREIGN KEY (storeId)
     REFERENCES Stores(id)
) ENGINE=INNODB; 
`

function createDatabase(callback) {
    connection.query(`create database IF NOT EXISTS ${DB_NAME}`, function (error, results, fields) {
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
    console.log(query);
    dbConnection.query(query, function (error, results, fields) {
        if (error) {
            console.log("error in creating database ", error);
            throw error;
        }
 
        console.log("created table");
            callback(error, results);
    });
}

  if (options.create) {
            
        async.series([
            createDatabase,
            
            function (callback) {
                createTable(CREATE_STATE_TABLE_QUERY, callback)
            },

            function (callback) {
                createTable(CREATE_CITY_TABLE_QUERY, callback)
            },

            function (callback) {
                createTable(CREATE_STORE_TABLE_QUERY, callback)
            },

            function (callback) {
                createTable(CREATE_BRAND_TABLE_QUERY, callback)
            },

            function (callback) {
                createTable(CREATE_PRODUCT_TABLE_QUERY, callback)
            },

            function (callback) {
                createTable(CREATE_BRAND_STORE_TABLE_QUERY, callback)
            },
        ])
  }

function insertStateQuery(obj, callback) {
    
    var query = `insert into states(id, name, code) values(?,?,?)`;

    
    dbConnection.query(query, [obj.id, obj.name, obj.code], function (error, results, fields) {
        if (error) {
            console.log("error in creating database ", error);
            throw error;
        }
 
        console.log("inserted  state ", obj.id, obj.name);

        callback(error, results);
    });
}


function insertCityQuery(obj, callback) {
    
        console.log("inserting  city ", obj.id, obj.name);

    var query = `insert into cities(id, name, stateId) values(?,?,?)`;

    
    dbConnection.query(query, [obj.id, obj.name, obj.stateId], function (error, results, fields) {
        if (error) {
            console.log("error in creating database ", error);
            throw error;
        }
 
        console.log("inserted  city ", obj.id, obj.name);


        callback(error, results);
    });
}


function insertBrandQuery(obj, callback) {
    
        console.log("inserting  brand ", obj.id, obj.name);

    var query = `insert into brands(id, name) values(?,?)`;

    
    dbConnection.query(query, [obj.id, obj.name], function (error, results, fields) {
        if (error) {
            console.log("error in creating database ", error);
            throw error;
        }
 
        console.log("inserted  brand ", obj.id, obj.name);


        callback(error, results);
    });
}


function insertProductQuery(obj, callback) {
    
        console.log("inserting  product ", obj.id, obj.name, obj.year);

 

    var query = `insert into products(id, name, 
                                      weight, year,
                                      brandId, featured, 
                                      price, released ) values(?,?,?,?,?,?,?,?)`;

    
    dbConnection.query(query, [obj.id, obj.name, 
                                obj.weight, obj.year, 
                                obj.brandId, false,
                              
                              300 + Math.ceil(Math.random() * 100),

                              new Date (2010 + Math.ceil(Math.random() * 8),
                                        1 + Math.ceil(Math.random() * 12),
                                        1 )
                              ], function (error, results, fields) {
        if (error) {
            console.log("error in inserting product  ", error);
            throw error;
        }
 
        console.log("inserted  product ", obj.id, obj.name);


        callback(error, results);
    });
}
 
 

const path = require("path");

if (options.load) {

   var data =  jsonfile.readFileSync(path.join(__dirname, "db.json"));
   console.log("products ", data.products.length);
   console.log("brands ", data.brands.length);
  
   
   async.map(data.states, insertStateQuery, function(err, results) {
           async.map(data.cities, insertCityQuery, function(err, results) {

                 async.map(data.brands, insertBrandQuery, function(err, results) {
                     
                     async.map(data.products, insertProductQuery, function(err, results) {

                 
                    });
                 
                 });
                 
           });

   });
    
   /*
    for (let brand of data.brands) {
       console.log(brand);
    }

    for (let product of data.products) {
       console.log(product);
    }

    for (let city of data.cities) {
       console.log(city);
    }

    for (let state of data.states) {
       console.log(state);
    }
    */
   
}
