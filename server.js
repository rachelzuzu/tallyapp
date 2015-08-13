// node configuration

// set up
var express = require('express');
// create our app w/ express
var app = express();
// mongoose for mongodb
var mongoose = require('mongoose');
// log requests to the console (express4)
var morgan = require('morgan');
// pull information from HTML POST (express4)
var bodyParser = require('body-parser');
// simulate DELETE and PUT (express4)
var methodOverride = require('method-override');
var port = process.env.PORT || 8000;

// use mongoose.connect to connect to modulus.io remote db
mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');
// configuration w express modules
app.use(express.static(__dirname + '/public'));
// log request to console
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
// parse app/json
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// create mongoose model; monogo automatically generates _id
var Post = mongoose.model('Post', {
	text : String,
	amount: Number,
	date: Date,
	total: Number
});

// RESTful api routes with Express routes to handle api calls
// On page load, GET /api/todos and bind the JSON received from API to $scope.posts. they are looped over in view
app.get('/api/posts', function(req, res) {

	// use mongoose to  get all posts in db
	Post.find(function(err, posts) {
		// if there is an error, send error
		if (err)
			res.send(err)
		// return all posts in json format
		res.json(posts);
	});
});

// create post and send back all posts after creation
app.post('/api/posts', function(req, res) {
	
	// create a post, information comes from AJAX request from Angular
	Post.create({
		text : req.body.text,
		amount: req.body.amount,
		date: req.body.date,
		total: req.body.total,
		done : false
	}, function(err, post) {
		if (err)
			res.send(err);
		// get and return all posts after you create another
		Post.find(function(err, posts) {
			if (err)
				res.send(err)
			res.json(posts);
		});
	});
});

app.delete('/api/posts/:post_id', function(req, res) {
	Post.remove({
		_id : req.params.post_id
	}, function(err, post) {
		if (err)
			res.send(err);
		// get and return all posts after you create another
		Post.find(function(err, posts) {
			if (err)
				res.send(err)
			res.json(posts);
		});
	});
});


// add route for front end angular
app.get('*', function(req, res) {
	res.sendFile( './public/index.html');
});




// listen (start app with node server.js) ======================================
app.listen(port);