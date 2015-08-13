// angular code

var tallyApp = angular.module('tallyApp', []);

function MainCtrl($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get all posts and show them
	$http.get('/api/posts')
		.success(function(data) {
			$scope.posts = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting, send the text to the node API
	$scope.createPost = function() {
		$http.post('/api/posts', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.posts = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	//delete post after checking it
	$scope.deletePost = function(id) {
		$http.delete('/api/posts/' + id)
			.success(function(data) {
				$scope.posts = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' +data);
			});
	};

	//calculate total of posts
	$scope.total = function() {
		var total = 0;
		angular.forEach($scope.posts, function(post) {
        total += post.amount;
    })
    return total;
    };
}