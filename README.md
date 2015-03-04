# jasmine-conform-interface
Custom matcher for checking whether a class conforms an interface.
Interface method is considered abstract when it contains `throw` statement on its body and nothing more.
Used [duck typing](http://en.wikipedia.org/wiki/Duck_typing) approach.

## Example of using

```javascript
  // Somewhere in code
  var AbstractClass = function () {};
  AbstractClass.prototype.method1 = function () {
    throw Error('AbstractClass#method1 should be override!');
  };
  AbstractClass.prototype.method2 = function () {
    throw Error('AbstractClass#method2 should be override!');
  };
  
  var ConcreteImplementation = function () {};
  ConcreteImplementation.prototype = Object.create(AbstractClass.prototype);
  ConcreteImplementation.prototype.method1 = function () {
    // Do some staff here
  };
  
  // Somewhere in test
  it ('should implement an interface of AbstractClass', function () {
    expect(ConcreteImplementation).toConformInterface(AbstractClass);  
  });
```

Test will be failed since `method2` has not been override. Such error will be given `Expected class to override the interface method method2`
