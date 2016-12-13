'use strict';

angular.module('reallyGoodEmailsApp')
  .controller('MainCtrl', function(DS, apiHost, category, tag) {

    // @see http://www.js-data.io/docs/dsfindall
    // @see http://v2.wp-api.org/reference/posts/
    var params = {
      '_embed': 1,
      'page': 0,
      'per_page': 25
    };

    var vm = this;
    vm.posts = [];
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
