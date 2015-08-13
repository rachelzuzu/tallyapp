var tallyApp = angular.module('tallyApp', []);

function MainCtrl($scope, $http) {
	$scope.formData = {};

	$http.get('/api/posts')
		.success(function(data) {
			$scope.posts = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

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
	//delete post
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
	$scope.total = function() {
		var total = 0;
		angular.forEach($scope.posts, function(post) {
        total += post.amount;
    })
    return total;
    };
}