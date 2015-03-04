/**
 * Custom matcher for checking whether a class conforms an interface.
 * Interface method is considered abstract when it contains `throw` statement
 * in its body and nothing more. Uses `duck typing` approach.
 * @author <ruslan.kesheshyan@gmail.com>
 */
(function () {
  'use strict';

  var customMatchers = {
    toConformInterface: function () {
      var abstractInterfaceRegExp = /^function\s*\([^)]*\)\s*\{\s*(return)?\s*throw/;

      return {
        compare: function (actual, expected) {
          var result = {};

          result.pass = Object.keys(expected.prototype).every(function (key) {
            if (Object.prototype.toString.call(expected.prototype[key]) === '[object Function]') {
              if (abstractInterfaceRegExp.test(expected.prototype[key].toString())) {
                if (Object.prototype.toString.call(actual.prototype[key]) !== '[object Function]' ||
                    actual.prototype[key] === expected.prototype[key]
                ) {
                  result.message = 'Expected class to override the interface method ' + key;
                  return false;
                }
              }
            }
            return true;
          });

          return result;
        }
      };
    }
  };

  beforeEach(function () {
    jasmine.addMatchers(customMatchers);
  });

})();
