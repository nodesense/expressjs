var express = require("express");

var app = express();

//This expects file name to be .ejs
//app.set('view engine', 'ejs');

var ejs =  require('ejs');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

var path = require("path");
//set views directory
app.set('views', path.join(__dirname, 'pages'));

var cookieParser = require("cookie-parser");

var bodyParser = require("body-parser");

// parses x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser("secret"));

var cookies = require("./cookies");
app.use(cookies);

var headers = require("./headers");
app.use(headers);

var response = require("./response");
app.use(response);

var routing = require("./routing");
app.use(routing);

var ejs_ = require("./ejs");
app.use(ejs_);
 
app.use(function (req, res, next) {
  console.log('Time Start:', Date.now())
  next()
  console.log('Time End:', Date.now())
})


app.get("/", function(req, res){
    res.send("hello");
})

app.listen(3000, function(status){
    console.log(status);
})