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

  .config(function (DSHttpAdapterProvider, apiHost) {
    angular.extend(DSHttpAdapterProvider.defaults, {
      basePath: apiHost + '/wp-json/wp/v2'
    });
  })

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .when('/categories', {
        templateUrl: 'views/categories.html',
        controller: 'CategoriesCtrl',
        controllerAs: 'vm'
      })
      .when('/category/:slug', {
        templateUrl: 'views/main.html',
        controller: 'CategoryCtrl',
        controllerAs: 'vm'
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
  });
