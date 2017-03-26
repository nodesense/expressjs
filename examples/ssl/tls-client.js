var tls = require('tls');
var fs = require('fs');

var options = {
   key  : fs.readFileSync('server.key'),
   cert : fs.readFileSync('server.csr')
};

var client = tls.connect(8000, options, function () {
   console.log(client.authorized ? 'Authorized' : 'Not authorized');
});

client.on('data', function (data) {
   console.log(data.toString());
   client.end();
});