'use strict';

angular
  .module('reallyGoodEmailsApp', [
    'algoliasearch',
    'angularGrid',
    'angularUtils.directives.dirDisqus',
    'js-data',
    'ngRoute'
  ])

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
      .when('/categories/:slug', {
        templateUrl: 'views/category.html',
        controller: 'CategoryCtrl',
        controllerAs: 'vm'
      })
      .when('/emails/:slug', {
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

  .config(function (DSHttpAdapterProvider) {
    angular.extend(DSHttpAdapterProvider.defaults, {
      basePath: 'http://localhost/wp-json/wp/v2'
    });
  })

  .run(function (DS) {
    DS.defineResource('categories');
    DS.defineResource('posts');
  });
