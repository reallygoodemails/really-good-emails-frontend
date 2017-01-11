'use strict';

angular.module('reallyGoodEmailsApp')
  .controller('CategoriesCtrl', function(DS, categories) {

    // Pre-populate some categories
    DS.inject('categories', categories);

    // @see http://v2.wp-api.org/reference/categories/
    var params = {
      'parent': 0,
      'per_page': 100
    };

    var vm = this;
    vm.categories = DS.getAll('categories');

    DS.findAll('categories', params)
      .then(function (categories) {
        vm.categories = categories;
      }
    );

  });
