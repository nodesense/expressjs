var express = require("express");
var ejs = require("ejs");
var path = require("path");

var csrf = require('csurf'); 

var   session = require('express-session');
var cookieParser = require("cookie-parser");


var bodyParser = require("body-parser");


var passport = require('passport');
var passportLocal =  require('passport-local');

var http = require('http');


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

app.use("/node_modules", express.static(__dirname + "/node_modules"));


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());


app.use(cookieParser('fDgfaRT243FDFrAS')); 

app.use(session({secret: 'fadsyg234lkjifasfds', saveUninitialized: true, resave: true,  secure: true}));



var products_api = require("./api/products");
app.use("/api",products_api);

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


var server = http.createServer(app)
var io = require('socket.io').listen(server);


server.listen(8080, "0.0.0.0", function(err){
    console.log("callback");

    if (err)
        console.log("error listen ", err);
});

console.log("server started with nodemon");

var pseudoArray = ['admin']; 

var users = 0; //count the users

io.sockets.on('connection', function (socket) { // First connection
	users += 1; // Add 1 to the count
	reloadUsers(); // Send the count to all the users
	socket.on('message', function (data) { // Broadcast the message to all
		if(pseudoSet(socket))
		{
			var transmit = {date : new Date().toISOString(), pseudo : socket.nickname, message : data};
			socket.broadcast.emit('message', transmit);
			console.log("user "+ transmit['pseudo'] +" said \""+data+"\"");
		}
	});
	socket.on('setPseudo', function (data) { // Assign a name to the user
		if (pseudoArray.indexOf(data) == -1) // Test if the name is already taken
		{
			pseudoArray.push(data);
			socket.nickname = data;
			socket.emit('pseudoStatus', 'ok');
			console.log("user " + data + " connected");
		}
		else
		{
			socket.emit('pseudoStatus', 'error') // Send the error
		}
	});
	socket.on('disconnect', function () { // Disconnection of the client
		users -= 1;
		reloadUsers();
		if (pseudoSet(socket))
		{
			console.log("disconnect...");
			var pseudo;
			pseudo = socket.nickname;
			var index = pseudoArray.indexOf(pseudo);
			pseudo.slice(index - 1, 1);
		}
	});
});

function reloadUsers() { // Send the count of the users to all
	io.sockets.emit('nbUsers', {"nb": users});
}
function pseudoSet(socket) { // Test if the user has a name
	var test;
	if (socket.nickname == null ) test = false;
	else test = true;
	return test;
}


module.exports = app;