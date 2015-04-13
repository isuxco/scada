//Archivo server.js

//Este archivo corresponde al servidor.

//setup inicial

//var express = require('express');
//var app = express();

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose'); //Base de datos
var bodyParser = require('body-parser'); //Procesar peticiones POST
var methodOverride = require('method-override');

//var morgan = require('morgan'); //Loguear eventos
var querystring = require('querystring');
var port = 8080;

//Configuración

mongoose.connect('mongodb://localhost/isux');

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
//app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride())

//Modelos

var User = mongoose.model('users', {
	id: String,
	user: String,
	password: String,
	mail: String
});

var Measure = mongoose.model('measures',{
	id : String,
	value: String,
	//date: { type: Date, default: Date.now },
});

//Rutas del API

app.get("/api/users", function(req,res){
	User.find(function (err,users) {
		if (err)
			res.send(err)
		res.json(users);
	});
});

app.get("/api/measures", function(req,res){
	Measure.find(function (err,measures) {
		if (err)
			res.send(err)
		res.json(measures);
	});
});

app.post('/api/users', function (req,res){
	User.create({
		user: req.body.user,
		password: req.body.password,
		mail: req.body.mail,
		done: false
	}, function(err, user){
		if (err)
			res.send(err)
		}
	);
});

app.post('/api/measures', function (req,res){
	
	console.log("El Request:",  req.body);
	/* Measure.create({
		value: req.body.value,
		done: false
	}, function(err, user){
		if (err)
			res.send(err)
		}
	);*/
	req = {};
});

//Rutas para las vistas

app.get('*', function(req,res){
	res.sendfile('./public/index.html');
})


//Inicio de Applicación
app.listen(port);
console.log("SCADA corriendo en el puerto: " + port);