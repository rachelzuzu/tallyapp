var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var moment = require('moment');

mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// create post model
var Post = mongoose.model('Post', {
	text : String,
	amount: Number,
	date: Date,
	total: Number
});


// routes
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
	
	Post.create({
		text : req.body.text,
		amount: req.body.amount,
		date: req.body.date,
		total: req.body.total,
		done : false
	}, function(err, post) {
		if (err)
			res.send(err);

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

		Post.find(function(err, posts) {
			if (err)
				res.send(err)
			res.json(posts);
		});
	});
});


// add route for front end angular
app.get('*', function(req, res) {
	res.sendFile( '/public/index.html');
});




// listen (start app with node server.js) ======================================
app.listen(8000);