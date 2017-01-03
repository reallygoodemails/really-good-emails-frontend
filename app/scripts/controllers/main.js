'use strict';

angular.module('reallyGoodEmailsApp')
  .controller('MainCtrl', function($scope, $window, algolia, apiHost, category, tag) {

    var client = algolia.Client('PBJZ5RMGND', '7181b52312010545c774c92fced72c69');
    var index = client.initIndex('wp_searchable_posts');
    var params = {
      'hitsPerPage': 25,
      'page': 0,
      'query': ''
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
          vm.posts = vm.posts.concat(content.hits);
          vm.ads = vm.ads.concat(vm.ads.length);
          vm.loadingMore = false;
          params.page++;
        });
    };

    vm.loadMorePosts();

    // Keep post URLs structured like /:category/:slug
    // WP REST API doesn't expose the categories in a great way.
    // So it's easier to compute the post URL like this.
    vm.getLinkURL = function(post) {
      // return post.permalink.replace(apiHost, '');
      return post.permalink.replace('https://reallygoodemails.com', '');
    };

    $scope.$watch('search.query', function(newQuery) {
      params.query = newQuery;
      index.search(params)
        .then(function(content) {
          vm.posts = content.hits;
        });
    });

  });
