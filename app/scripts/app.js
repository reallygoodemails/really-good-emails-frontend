'use strict';

angular
  .module('reallyGoodEmailsApp', [
    'algoliasearch',
    'angular-loading-bar',
    'angularGrid',
    'angularUtils.directives.dirDisqus',
    'infinite-scroll',
    'js-data',
    'ngRoute',
    'ngSanitize'
  ])

  .constant('apiHost', 'https://reallygoodemails.com')

  .config(function($locationProvider, $routeProvider, apiHost, cfpLoadingBarProvider, DSHttpAdapterProvider) {

    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.parentSelector = '#loading-bar-container';

    $locationProvider.html5Mode(true);

    angular.extend(DSHttpAdapterProvider.defaults, {
      basePath: apiHost + '/wp-json/wp/v2'
    });

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm',
        resolve: {
          category: function() {},
          tag: function() {}
        }
      })
      .when('/categories', {
        templateUrl: 'views/categories.html',
        controller: 'CategoriesCtrl',
        controllerAs: 'vm'
      })
      .when('/category/:slug', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm',
        resolve: {
          category: function($route, DS) {
            return DS.findAll('categories', {'slug': $route.current.params.slug})
              .then(function(categories) {
                return categories[0];
              });
          },
          tag: function() {}
        }
      })
      .when('/tag/:slug', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm',
        resolve: {
          category: function() {},
          tag: function($route, DS) {
            return DS.findAll('tags', {'slug': $route.current.params.slug})
              .then(function(tags) {
                return tags[0];
              });
          }
        }
      })
      .when('/:category/:slug', {
        templateUrl: 'views/email.html',
        controller: 'EmailCtrl',
        controllerAs: 'vm'
      })
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .run(function (DS) {
    DS.defineResource('categories');
    DS.defineResource({
      name: 'posts',
      idAttribute: 'slug'
    });
    DS.defineResource('tags');
  });
