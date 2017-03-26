
//Socket.io
var socket = io.connect();
socket.on('connect', function() {
	console.log('connected');

	socket.emit('setPseudo', "Krish" + Math.ceil(Math.random() * 1000));

	
});
socket.on('nbUsers', function(msg) {
	$("#nbUsers").html(msg.nb);
});
socket.on('message', function(data) {
	addMessage(data['message'], data['pseudo'], new Date().toISOString(), false);
	console.log(data);
});

socket.on('pseudoStatus', function(data){
	console.log('pseudoStatus', data);		 
})
	

//Help functions
function sentMessage() {
	 
	var message = $("#messageInput").val();
	 console.log(message);
		 
	socket.emit('message', message);
	addMessage(message, "Me", new Date().toISOString(), true);
	$("#messageInput").val(''); 
}

function addMessage(msg, pseudo, date, self) {
	//alert(msg, pseudo);

	if(self) var classDiv = "row message self";
	else var classDiv = "row message";

	$("#chatEntries").append('<div class="'+classDiv+'"><p class="infos"><span class="pseudo">'+pseudo+'</span>, <time class="date" title="'+date+'">'+date+'</time></p><p>' + msg + '</p></div>'); 
}
 

$(document).ready(function(){
	$("#submit").bind("click", sentMessage);
})