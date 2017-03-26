var fs = require('fs');
var https = require('https');
var app = require('express')();
var options = {
   key  : fs.readFileSync('server.key'),
   cert : fs.readFileSync('server.crt')
};

app.get('/', function (req, res) {
   res.send('Hello World!');
});

https.createServer(options, app).listen(3000, function () {
   console.log('Started!');
});