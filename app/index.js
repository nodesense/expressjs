const express = require("express");
const path = require("path");

var csrf = require('csurf'); 

var session = require('express-session');
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
 
var cors = require("cors");

var mongoose = require("mongoose");

var production = {
    "mongo": 'mongodb://localhost/productsdb'
}

var development = {
    "mongo": 'mongodb://localhost/productsdb'
}

var test = {
    "mongo": 'mongodb://localhost/testdb'
}

const logger = require("./config/logger");
logger.info("start logging here");


var app = express();

var config = development;

if (process.env.NODE_ENV === "test"){
    config = test;
}

app.disable('etag') ;

require("./config/access-log")(app);
require("./config/view-engine")(app);
require("./config/database")(app);
 
app.use(cookieParser('fDgfaRT243FDFrAS')); 

require("./config/session")(app);

app.use("/assets", express.static(__dirname + "/assets"));

app.use("/node_modules", express.static(__dirname + "/node_modules"));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());


app.use(cors())

var products_api = require("./api/products");
app.use("/api",products_api);

 
app.use(csrf({cookie:true}));

var initializePassport = require("./passport-auth")
initializePassport(app);
 
var User = mongoose.model("User");

app.use(function(req, res, next){
    res.locals.user = req.user;
    
    console.log("Second middleware ", req.user );
    next();
})


var home = require("./controllers/home");
var products = require("./controllers/products");
var auth = require("./controllers/auth");
var cart = require("./controllers/cart");

app.use(home);
app.use(products);
app.use(auth);
app.use(cart);

  

app.use(function(error, req, res, next) {
    console.log("Errors ", error);

    //FIXME: log with call stack
    logger.error(error);

    res.status(500)
        .render("errors/internal-error", {
            stack: error.stack
        })
    //handle error
})
 

module.exports = app;    