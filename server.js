//var app = require("./app/index");

//this looks for index.js file
var app = require("./app");

var http=require("http");

//express application
var server = http.createServer(app)

//socket.io application
require("./app/socket/chat") (server);

if (process.env.NODE_ENV !== "test"){
    server.listen(8080, "0.0.0.0", function(err){
   
    if (err)
        console.error("Could not listen ", err);
        return;
    });

    console.log("callback ", server.address());
}