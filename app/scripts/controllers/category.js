'use strict';

angular.module('reallyGoodEmailsApp')
  .controller('CategoryCtrl', function($routeParams, DS) {

    // @see http://v2.wp-api.org/reference/categories/
    var params = {
      '_embed': 1,
      'slug': $routeParams.slug
    };

    var vm = this;

    DS.findAll('categories', params)
      .then(function(categories) {
        vm.category = categories[0];
      }
    );

  });
