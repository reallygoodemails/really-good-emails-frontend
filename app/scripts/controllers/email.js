'use strict';

angular.module('reallyGoodEmailsApp')
  .controller('EmailCtrl', function($routeParams, DS) {

    // @see http://www.js-data.io/docs/dsfindall
    // @see http://v2.wp-api.org/reference/posts/
    var params = {
      '_embed': 1,
      'slug': $routeParams.slug
    };

    var vm = this;
    vm.disqusConfig = {};

    DS.findAll('posts', params)
      .then(function(posts) {
        var post = posts[0];
        vm.post = post;
        vm.disqusConfig = {
          'disqus_identifier': post.id + ' ' + post.guid.rendered,
          'disqus_shortname': 'reallygoodemails-comments',
          'disqus_url': post.link
        };
      }
    );

  });
