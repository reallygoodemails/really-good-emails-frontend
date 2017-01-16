'use strict';

angular.module('reallyGoodEmailsApp')
  .controller('EmailCtrl', function($routeParams, algolia, DS, rgeConfig) {

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

        var client = algolia.Client(rgeConfig.algolia.applicationId, rgeConfig.algolia.apiKey);
        var queries = [
          {
            indexName: 'wp_posts_post',
            params: {
              hitsPerPage: 5,
              facetFilters: ['taxonomies.category:' + vm.post._embedded['wp:term'][0][0].name]
            }
          },
          {
            indexName: 'wp_posts_post',
            params: {
              hitsPerPage: 5,
              facetFilters: ['taxonomies.post_tag:' + vm.post._embedded['wp:term'][1][0].name]
            }
          }
        ];
        client.search(queries)
          .then(function(response) {
            vm.categoryResults = response.results[0].hits;
            vm.tagResults = response.results[1].hits;
          });
      }
    );
  });
