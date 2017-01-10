'use strict';

describe('Filter: rgeUrl', function () {

  // load the filter's module
  beforeEach(module('reallyGoodEmailsApp'));

  // initialize a new instance of the filter before each test
  var rgeUrl;
  beforeEach(inject(function ($filter) {
    rgeUrl = $filter('rgeUrl');
  }));

  it('should return the input prefixed with "rgeUrl filter:"', function () {
    var text = 'https://reallygoodemails.com/announcement/be-first-to-see-design-disruptors/';
    expect(rgeUrl(text)).toBe('/announcement/be-first-to-see-design-disruptors/');
  });

});
