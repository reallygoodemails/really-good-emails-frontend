'use strict';

angular.module('reallyGoodEmailsApp')
  .controller('CategoriesCtrl', function(algolia, rgeConfig) {

    var client = algolia.Client(rgeConfig.algolia.applicationId, rgeConfig.algolia.apiKey);
    var index = client.initIndex('wp_terms_category');

    var params = {
      'hitsPerPage': 100
    };
    var vm = this;
    vm.categories = [];

    index.search(params)
      .then(function(content) {
        vm.categories = content.hits;
      });

  });
