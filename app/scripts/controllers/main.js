'use strict';

angular.module('reallyGoodEmailsApp')
  .controller('MainCtrl', function ($scope, DS) {

    DS.findAll('posts', {'_embed': 1}).then(function (posts) {
      $scope.posts = posts;
    });

    var page = 2;

    $scope.loadMore = function() {
      DS.findAll('posts', {'_embed': 1, page: page}).then(function (posts) {
        $scope.posts = $scope.posts.concat(posts);
        page++;
      });
    };

  });
