var fs = require('fs');
fs.readFile(__dirname + '/pages/header.html', function (err, data) {
  if (err)
    throw err;
  if (data)
    console.log(data.toString('utf8'));
});


// Synchronous read: BAD
var data = fs.readFileSync(__dirname + '/pages/header.html');
console.log("Synchronous read: " + data.toString());