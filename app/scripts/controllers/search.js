'use strict';

angular.module('reallyGoodEmailsApp')
  .controller('SearchCtrl', function($location, $scope) {
    $scope.search = {
      clear: function() { this.query = ''; },
      query: $location.search().s || ''
    };
  });
