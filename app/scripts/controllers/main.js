'use strict';

angular.module('reallyGoodEmailsApp')
  .controller('MainCtrl', function($anchorScroll, $location, $scope, $timeout, $window, algolia, rgeConfig, category, tag) {

    var client = algolia.Client(rgeConfig.algolia.applicationId, rgeConfig.algolia.apiKey);
    var params = {
      page: 0,
      query: $location.search().s || ''
    };
    var vm = this;
    vm.gridOptions = {
      // Hacky method to determine grid width based on viewport size
      gridWidth: ($window.innerWidth <= 320) ? 135 : 160,
      gutterSize: 20
    };
    vm.posts = [];
    vm.ads = [];
    $timeout(function() {
      vm.adsPerPage = Math.round( $window.document.body.clientHeight / $window.innerHeight );
      vm.ads = new Array(vm.adsPerPage).fill('');
    }, 500);
    vm.adPixelInterval = $window.innerHeight;
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

      var queries = [{
        indexName: 'wp_posts_post',
        params: angular.extend({}, params, {
          hitsPerPage: 25
        })
      }, {
        indexName: 'wp_terms_category',
        params: angular.extend({}, params, {
          hitsPerPage: 2
        })
      }];

      client.search(queries)
        .then(function(content) {
          vm.hits = content.results[0].nbHits;

          var posts = content.results[0].hits;
          var categories = content.results[1].hits;
          if (categories.length) {
            posts.splice(5, 0, categories[0]);
            posts.splice(15, 0, categories[1]);
          }

          vm.posts = vm.posts.concat(posts);
          vm.ads = vm.ads.concat(vm.ads);
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
