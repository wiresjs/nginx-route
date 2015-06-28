var domain = require('wires-domain');
var express = require('express');
var path = require('path');
var fs = require("fs")
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Bash = require("wires-bash")
var app = express();

app.use(cookieParser('your secret here'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
require('require-all')(__dirname + '/backend/_filter');
require('require-all')(__dirname + '/backend/app');
require('require-all')(__dirname + '/backend/services');
app.use(domain.express());
var port = process.env.PORT || 3050;

var server = app.listen(port, function() {
	var host = server.address().address;
	console.log('App listening at http://%s:%s', host, port);
});
