'use strict';

angular.module('reallyGoodEmailsApp')
  .controller('EmailCtrl', function ($scope, $routeParams, DS) {

    DS.find('posts', $routeParams.id, {params: {'_embed': 1}}).then(function (post) {
      $scope.post = post;
    });

  });
