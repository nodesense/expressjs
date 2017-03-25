var express = require("express");
var ejs = require("ejs");
var path = require("path");

var csrf = require('csurf'); 

var   session = require('express-session');
var cookieParser = require("cookie-parser");


var bodyParser = require("body-parser");


var passport = require('passport');
var passportLocal =  require('passport-local');


var app = express();

var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/productsdb');

require("./models/product");
require("./models/user");

app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
//set views directory
app.set('views', path.join(__dirname, 'views'));

app.use("/assets", express.static(__dirname + "/assets"));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());


app.use(cookieParser('fDgfaRT243FDFrAS')); 

app.use(session({secret: 'fadsyg234lkjifasfds', saveUninitialized: true, resave: true,  secure: true}));


app.use(csrf({cookie:true}));


app.use(passport.initialize());
app.use(passport.session());
 
 var User = mongoose.model("User");

var Strategy = require('passport-local').Strategy;

passport.use(new Strategy(
  function(username, password, cb) {
        console.log(username, password);

        User.findOne({username: username}, 
           function(err, user){
               //if user not present
            if (err) {
                cb(err, false);
                return;
            }

            if (user.password != password) {
                cb("password not matched", false);
                return;
            }

            console.log("valid user");
            cb(null, user);

        })

  })
)

passport.serializeUser(function(user, cb) {
    console.log("serializeUser")
  cb(null, user.username);
});

passport.deserializeUser(function(username, cb) {
 console.log("deserializeUser")

  User.findOne({'username':username}, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});


app.use(function(req, res, next){
    res.locals.user = req.user;
    
    console.log("Second middleware ", req.user );
    next();
})


var home = require("./controllers/home");
var products = require("./controllers/products");
var auth = require("./controllers/auth");

app.use(home);
app.use(products);
app.use(auth);
 

app.get("/hello", function(req, res){
    res.set("Content-Type", "text/html");
    
    res.write("<h2>Line 1</h2>");
    res.write("<h2>Second Line</h2>");
    res.end();
})

app.get("/status", function(req, res){
    res.status(404).send("File not found");
})

app.get("/send-status", function(req, res){
    res.sendStatus(500);
})


app.get("/jsondata", function(req, res){
    console.log(req.headers);

    console.log("user agent", 
            req.headers["user-agent"])

    res.set("X-TOKEN", "TOKEN32432432");
    res.removeHeader("X-Powered-By");
    res.json({name: 'iphone2',
                year: 2010});
})

//localhost:8080/query?key=100&name=krish
app.get("/query", function(req, res){
    res.send(req.query.name);
})

app.all("/", function(req, res, next) {
    console.log(req.method, req.path, req.customData);

    next();
})


app.use(function(error, req, res, next) {
    console.log("Errors ", error);
    res.status(500)
        .render("errors/internal-error", {
            stack: error.stack
        })
    //handle error
})


/*
app.get("/products", function(req, res){
    res.json({name: 'iphone'});
})

app.post("/products", function(req, res){
    console.log("body ", req.body);

    res.send(req.body);
})

//products/view/10
app.get ("/products/view/:id", function(req, res){
    res.send(req.params.id);
})
*/


app.listen(8080, "0.0.0.0", function(err){
    console.log("callback");

    if (err)
        console.log("error listen ", err);
});

console.log("server started with nodemon");