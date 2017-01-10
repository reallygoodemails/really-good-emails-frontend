'use strict';

angular.module('reallyGoodEmailsApp')
  .controller('EmailCtrl', function($routeParams, DS, apiHost) {

    var vm = this;

    // The dirDisqus directive won't render while the config is an empty object
    vm.disqusConfig = {};

    // Helper function for emulating existing WordPress post Disqus settings
    var setDisqusConfig = function(post) {
      vm.disqusConfig = {
        'disqus_identifier': post.id + ' ' + post.guid.rendered,
        'disqus_shortname': 'reallygoodemails-comments',
        'disqus_url': post.link
      };
    };

    var params = {
      '_embed': 1,
      'slug': $routeParams.slug
    };

    DS.findAll('posts', params)
      .then(function(posts) {
        vm.post = posts[0];
        setDisqusConfig(posts[0]);
      }
    );
  });
