'use strict';

angular.module('reallyGoodEmailsApp')
  .controller('MainCtrl', function(DS) {

    // @see http://www.js-data.io/docs/dsfindall
    // @see http://v2.wp-api.org/reference/posts/
    var params = {
      '_embed': 1,
      'page': 0
    };

    var vm = this;
    vm.posts = [];
    vm.loadingMore = false;
    vm.angularGridOptions = {
      cssGrid: true,
      refreshOnImgLoad: false
    };

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

  });
