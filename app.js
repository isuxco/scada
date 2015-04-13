var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


io.on('connection', function(){ console.log("Usuario conectado") });
server.listen(3000);
console.log("APP INICIADA");