'use strict';

angular.module('reallyGoodEmailsApp')
  .filter('rgeUrl', function() {
    return function(input) {
      if (typeof input !== 'string') { return input; }
      return new Uri(input).path();
    };
  });
