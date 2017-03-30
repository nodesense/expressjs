var express = require("express");
var ejs = require("ejs");
var path = require("path");
var csrf = require('csurf'); 
var   session = require('express-session');
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var cors = require("cors");


var mongoose = require("mongoose");
require("./models/product");
require("./models/user");

var products = require("./controllers/products");
var auth = require("./controllers/auth");
var cart = require("./controllers/cart");


var app = express();

var production = {
    "mongo": 'mongodb://localhost/productsdb'
}

var development = {
    "mongo": 'mongodb://localhost/productsdb'
}

var test = {
    "mongo": 'mongodb://localhost/testdb'
}

var config = development;

if (process.env.NODE_ENV === "test"){
    config = test;
}

mongoose.connect(config.mongo);


app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
//set views directory
app.set('views', path.join(__dirname, 'views'));

app.use("/assets", express.static(__dirname + "/assets"));

app.use("/node_modules", express.static(__dirname + "/node_modules"));

app.disable('etag') ;

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());



app.use(cors())



app.use(cookieParser('fDgfaRT243FDFrAS')); 

const MongoStore = require('connect-mongo')(session);


app.use(session({
    secret: 'fadsyg234lkjifasfds', saveUninitialized: true, 
    resave: true,  
    secure: true,

    store: new MongoStore({ url: 'mongodb://localhost/sessions' })
}));



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



var http=require("http");
var server = http.createServer(app)
var io = require('socket.io').listen(server);


if (process.env.NODE_ENV !== "test"){
    server.listen(8080, "0.0.0.0", function(err){
    console.log("callback");

    if (err)
        console.log("error listen ", err);
    });
}


console.log("server started with nodemon");
var users_online = {};


io.sockets.on('connection', function (socket) { // First connection
	
    console.log("Client connected");

    socket.on("user-id", function(data){
        console.log(data);
        users_online[data] = socket;
        socket.id = data;
    })

	socket.on('message', function (data) { // Broadcast the message to all
        console.log("message ", data);
		socket.broadcast.emit('message', data);
	}); 
	socket.on('disconnect', function () { // Disconnection of the client

        console.log("disconnected");
		  
	});
});

/*
app.listen(8080, "0.0.0.0", function(err){
    console.log("callback");

    if (err)
        console.log("error listen ", err);
});
*/
console.log("server started with nodemon");

module.exports = app;