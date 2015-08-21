// RESTful api routes with Express routes to handle api calls
// On page load, GET /api/todos and bind the JSON received from API to $scope.posts. they are looped over in view

// lost post model
var Post = require('./models/post.js');

// expose the routes to app with module.exports
module.exports = function(app) {

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
		res.sendFile( './public/views/index.html');
	});
};