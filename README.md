# jasmine-conform-interface
Custom matcher for checking whether a class conforms an interface.
Interface method is considered abstract when it contains `throw` statement in its body and nothing more.
Uses [duck typing](http://en.wikipedia.org/wiki/Duck_typing) approach.
