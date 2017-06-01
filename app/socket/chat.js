module.exports = function(server) {
    console.log("chat initialized");
    
    var io = require('socket.io').listen(server);

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

}
