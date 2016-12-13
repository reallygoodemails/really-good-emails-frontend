'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('reallyGoodEmailsApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      category: null,
      tag: null
      // place here mocked dependencies
    });
  }));

  it('should be a useless test', function () {
    var a = true;
    expect(a).toBe(true);
  });
});
