var socket = io.connect();

var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

//console.log("hello");

btn.addEventListener('click', function(){
    //console.log("got data");
    socket.emit('chat', { 
        handle: handle.value, 
        message: message.value,
        last: "last"
    });
    //console.log("got data");
    //console.log(data);
});

message.addEventListener('keypress', function(){
    //if(message != ""){
    socket.emit('typing', handle.value);
    //}
});

//name.innerHTML = "HHHEEELLLLLLOOO";

socket.on('chat', function(data){
    console.log(data);
    feedback.innerHTML = "";
    output.innerHTML += "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});

socket.on('typing', function(data){
    feedback.innerHTML = "<p><em>" + data + " is typing...";
});