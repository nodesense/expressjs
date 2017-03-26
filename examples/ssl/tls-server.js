var tls = require('tls');
var fs = require('fs');

var options = {
   key  : fs.readFileSync('server.key'),
   cert : fs.readFileSync('server.crt')
};

var server = tls.createServer(options, function (res) {
   res.write('Hello World!');
   res.pipe(res);
}).listen(8000);