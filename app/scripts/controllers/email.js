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

    // @see http://www.js-data.io/docs/dsget
    // See if the post already exists in the JSData store
    vm.post = DS.get('posts', $routeParams.slug);

    // If the post doesn't exist in the store, make an XHR request
    if (angular.isUndefined(vm.post)) {
      var params = { '_embed': 1, 'slug': $routeParams.slug };
      DS.findAll('posts', params)
        .then(function(posts) {
          vm.post = posts[0];
          setDisqusConfig(posts[0]);
        }
      );
    } else {
      setDisqusConfig(vm.post);
    }

    // Keep post URLs structured like /tag/:slug and /category/:slug
    // WP REST API doesn't expose these in a great way.
    // So it's easier to compute the URLs like this.
    // TODO: make this code DRY-er using a directive or filter
    vm.getLinkURL = function(term) {
      return term.link.replace(apiHost, '');
    };
  });
