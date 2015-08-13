// node configuration

// set up
var express = require('express');
// create our app w/ express
var app = express();
// mongoose for mongodb
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;
// load the config
var database = require('./config/database');
// log requests to the console (express4)
	var morgan = require('morgan');
// pull information from HTML POST (express4)
var bodyParser = require('body-parser');
// simulate DELETE and PUT (express4)
var methodOverride = require('method-override');


// connect to mongoDB database on modulus.io
 mongoose.connect(database.url);

// configuration w express modules
app.use(express.static(__dirname + '/public'));
// log request to console
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
// parse app/json
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());


// load routes
require('./app/routes.js')(app);



// listen (start app with node server.js) ======================================
app.listen(port);