//jshint esversion:6

const express = require('express');
const socket = require('socket.io');

const app = new express();

app.use(express.static("public"));

app.get('/', function(request,response){
    response.sendFile(__dirname + '/index.html');
});

var server = app.listen(process.env.PORT || 9000, function(){
    console.log("Server running on port 9000");
});

var io = socket(server);

io.on('connection', function(socket){
    console.log("Made socket connection");

    socket.on('chat', function(data){
        console.log(data);
        io.sockets.emit('chat', data);
    });
    //console.log(data);

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});

