angular.module('postService', [])

    // super simple service
    // each function returns a promise object 
    .factory('Posts', function($http) {
        return {
            get : function() {
                return $http.get('/api/posts');
            },
            create : function(todoData) {
                return $http.post('/api/posts', todoData);
            },
            delete : function(id) {
                return $http.delete('/api/posts/' + id);
            }
        }
    });