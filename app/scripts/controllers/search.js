'use strict';

angular.module('reallyGoodEmailsApp')
  .controller('SearchCtrl', function($scope) {
    $scope.search = {
      query: ''
    };
  });
