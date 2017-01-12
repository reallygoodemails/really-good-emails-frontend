'use strict';

angular.module('reallyGoodEmailsApp')
  .controller('MainCtrl', function($anchorScroll, $location, $scope, $window, algolia, rgeConfig, category, tag) {

    var client = algolia.Client(rgeConfig.algolia.applicationId, rgeConfig.algolia.apiKey);
    var params = {
      'hitsPerPage': 25,
      'page': 0,
      'query': $location.search().s || ''
    };
    var queries = [{
      indexName: 'wp_posts_post',
      params: params
    }, {
      indexName: 'wp_terms_category',
      params: params
    }];
    var vm = this;
    vm.gridOptions = {
      // Hacky method to determine grid width based on viewport size
      gridWidth: ($window.innerWidth <= 320) ? 135 : 160,
      gutterSize: 20
    };
    vm.posts = [];
    vm.ads = [];
    vm.loadingMore = false;
    vm.category = category;
    vm.tag = tag;

    if (vm.category) {
      params.facetFilters = ['taxonomies.category:' + vm.category.name];
    }
    if (vm.tag) {
      params.facetFilters = ['taxonomies.post_tag:' + vm.tag.name];
    }

    vm.loadMorePosts = function() {
      if(vm.loadingMore) { return; }
      vm.loadingMore = true;

      client.search(queries)
        .then(function(content) {
          vm.hits = content.results[0].nbHits;
          vm.posts = vm.posts.concat(content.results[0].hits);

          vm.posts.splice(5, 0, content.results[1].hits[0]);
          vm.posts.splice(15, 0, content.results[1].hits[1]);

          vm.ads = vm.ads.concat(vm.ads.length);
          params.page++;
          if (content.results[0].nbPages > params.page) {
            vm.loadingMore = false;
          }
        });
    };

    $scope.$watch('search.query', function(newQuery) {
      params.query = newQuery;
      params.page = 0;
      vm.posts = [];
      vm.ads = [];
      vm.loadingMore = false;
      $anchorScroll();
      $location.search('s', newQuery || null);
      vm.loadMorePosts();
    });

  });
