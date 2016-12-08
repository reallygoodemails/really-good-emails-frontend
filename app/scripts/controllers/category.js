'use strict';

angular.module('reallyGoodEmailsApp')
  .controller('CategoryCtrl', function($routeParams, DS, apiHost) {

    // @see http://v2.wp-api.org/reference/categories/
    var params = {
      '_embed': 1,
      'slug': $routeParams.slug
    };

    var vm = this;

    DS.findAll('categories', params)
      .then(function(categories) {
        vm.category = categories[0];

        DS.findAll('posts', {'_embed': 1, 'categories': [categories[0].id]})
          .then(function(posts) {
            vm.posts = posts;
          });
      }
    );

    // Keep post URLs structured like /:category/:slug
    // WP REST API doesn't expose the categories in a great way.
    // So it's easier to compute the post URL like this.
    vm.getLinkURL = function(post) {
      return '#' + post.link.replace(apiHost, '');
    };

  });
