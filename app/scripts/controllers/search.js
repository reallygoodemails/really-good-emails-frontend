'use strict';

angular.module('reallyGoodEmailsApp')
  .controller('SearchCtrl', function($location, $scope, algolia, apiHost) {
    $scope.search = {
      query: $location.search().q || '',
      hits: []
    };
    var client = algolia.Client('PBJZ5RMGND', '7181b52312010545c774c92fced72c69');
    var index = client.initIndex('wp_searchable_posts');

    $scope.$watch('search.query', function() {
      index.search($scope.search.query)
        .then(function searchSuccess(content) {
          $scope.search.hits = content.hits;
        }, function searchFailure(err) {
      });
    });

    $scope.getLinkURL = function(hit) {
      return hit.permalink.replace(apiHost, '');
    };
  });
