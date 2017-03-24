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


//must takes four arguments
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
}) 

app.use(function (req, res, next) {
  console.log('Time Start:', Date.now())
  next()
  console.log('Time End:', Date.now())
})

//serve the files from public folder
app.use(express.static("public"));

//serve the files through /static url from current dir/public folder
app.use('/static', express.static(path.join(__dirname, 'public')))


app.get("/", function(req, res){
    res.send("hello");
})

//all variables
console.log(process.argv);

// print process.argv
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});



app.listen(3000, function(status){
    console.log(status);
})