'use strict';

angular.module('reallyGoodEmailsApp')
  .controller('MainCtrl', function($anchorScroll, $location, $scope, $window, algolia, apiHost, category, tag) {

    var client = algolia.Client('PBJZ5RMGND', '7181b52312010545c774c92fced72c69');
    var index = client.initIndex('wp_posts_post');
    var params = {
      'hitsPerPage': 25,
      'page': 0,
      'query': $location.search().s || ''
    };
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

      index.search(params)
        .then(function(content) {
          vm.hits = content.nbHits;
          vm.posts = vm.posts.concat(content.hits);
          vm.ads = vm.ads.concat(vm.ads.length);
          params.page++;
          if (content.nbPages > params.page) {
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
