'use strict';

angular.module('reallyGoodEmailsApp')
  .controller('MainCtrl', function ($scope, DS) {

    // @see http://www.js-data.io/docs/dsfindall
    var params = {
      '_embed': 1,
      'page': 1,
      'per_page': 15
    };

    $scope.posts = [];

    $scope.loadMore = function() {
      DS.findAll('posts', params).then(function (posts) {
        $scope.posts = $scope.posts.concat(posts);
        params.page++;
      });
    };

    $scope.loadMore();

  });
