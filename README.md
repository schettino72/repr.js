repr.js
===================================

A more descriptive represetation of values than Object.toString().


usage
-------

```
repr(whatever);
```

```

> repr(null)
"<null>"

> repr(undefined)
"<undefined>"

> repr(3)
"3"

> repr("abc")
""abc""

> repr([1,2,3])
"[1, 2, 3]"

> repr({a:1, b:2})
"{"a":1, "b":2}"

> repr(function foo(){})
"<Function foo>"

> function Bar(){};
> Bar.prototype.hi = function(){};
> repr(Bar)
"<Constructor Bar>"

> repr(new Bar())
"<Bar {}>"

```


* [development](https://github.com/schettino72/repr.js)
* [The MIT License](https://github.com/schettino72/repr.js/blob/master/LICENSE)



development setup
------------------

install python dependencies

    $ pip install -r py_requirements.txt

install node and bower packages

    $ doit dev_setup


running tests
---------------

On command line:

    $ doit

On browser, open the file `test/runner.html`

