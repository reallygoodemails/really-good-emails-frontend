'use strict';

angular.module('reallyGoodEmailsApp')
  .filter('rgeUrl', function(rgeConfig) {
    return function(input) {
      if (typeof input !== 'string') { return input; }
      return input.replace(rgeConfig.apiHost, '');
    };
  });
