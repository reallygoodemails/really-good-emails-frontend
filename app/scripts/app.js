'use strict';

angular
  .module('reallyGoodEmailsApp', [
    'angularGrid',
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
      .when('/emails/:id', {
        templateUrl: 'views/email.html',
        controller: 'EmailCtrl'
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
