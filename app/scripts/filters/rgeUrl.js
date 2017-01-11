'use strict';

angular.module('reallyGoodEmailsApp')
  .filter('rgeUrl', function(apiHost) {
    return function(input) {
      if (typeof input !== 'string') { return input; }
      return input.replace(apiHost, '');
    };
  });
