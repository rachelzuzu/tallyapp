angular.module('postController', [])

	.controller('MainCtrl', function($scope, $http, Posts) {
		$scope.formData = {};

		// when landing on the page, get all posts and show them
		Posts.get()
			.success(function(data) {
				$scope.posts = data;
			});

		// when submitting, send the text to the node API
		$scope.createPost = function() {
			if (!$.isEmptyObject($scope.formData)) {
				Posts.create($scope.formData)
					.success(function(data) {
						$scope.formData = {};
						$scope.posts = data;
					});
		}
	};

		//delete post after checking it
		$scope.deletePost = function(id) {
			Posts.delete(id)
				.success(function(data) {
					$scope.posts = data;
				});
		};

		//calculate total of posts
		$scope.total = function() {
			var total = 0;
			angular.forEach($scope.posts, function(post) {
				// lodash
	        total += post.amount;
	    })
	    return total;
	    };
});