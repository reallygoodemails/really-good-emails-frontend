'use strict';

angular.module('reallyGoodEmailsApp')
  .controller('SearchCtrl', function($scope, algolia) {
    $scope.search = {
      query: '',
      hits: []
    };
    var client = algolia.Client('PBJZ5RMGND', '7181b52312010545c774c92fced72c69');
    var index = client.initIndex('wp_searchable_posts');

    $scope.$watch('search.query', function() {
      index.search($scope.search.query)
        .then(function searchSuccess(content) {
          console.log(content);
          // add content of search results to scope for display in view
          $scope.search.hits = content.hits;
        }, function searchFailure(err) {
          console.log(err);
      });
    });
  });