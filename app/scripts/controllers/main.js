'use strict';

angular.module('reallyGoodEmailsApp')
  .controller('MainCtrl', function($window, DS, apiHost, category, tag) {

    // @see http://www.js-data.io/docs/dsfindall
    // @see http://v2.wp-api.org/reference/posts/
    var params = {
      '_embed': 1,
      'page': 0,
      'per_page': 25
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
      params.categories = [vm.category.id];
    }
    if (vm.tag) {
      params.tags = [vm.tag.id];
    }

    vm.loadMorePosts = function() {
      if(vm.loadingMore) { return; }
      params.page++;
      vm.loadingMore = true;

      DS.findAll('posts', params)
        .then(function (posts) {
          vm.posts = vm.posts.concat(posts);
          vm.ads = vm.ads.concat(vm.ads.length);
          vm.loadingMore = false;
        }
      );
    };

    vm.loadMorePosts();

    // Keep post URLs structured like /:category/:slug
    // WP REST API doesn't expose the categories in a great way.
    // So it's easier to compute the post URL like this.
    vm.getLinkURL = function(post) {
      return post.link.replace(apiHost, '');
    };

  });
