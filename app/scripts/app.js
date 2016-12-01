'use strict';

angular
  .module('reallyGoodEmailsApp', [
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
      .when('/emails/:slug', {
        templateUrl: 'views/email.html',
        controller: 'EmailCtrl',
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
    DS.defineResource('posts');
  });
