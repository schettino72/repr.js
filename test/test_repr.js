/* global repr */
/* global chai, suite, test*/


var assert = chai.assert;


suite('repr', function(){
    suite('basic types', function(){
        test('null', function(){
            assert.equal(repr(null), '<null>');
        });

        test('undefined', function(){
            assert.equal(repr(undefined), '<undefined>');
        });

        test('number int', function(){
            assert.equal(repr(34), '34');
        });

        test('number float', function(){
            assert.equal(repr(23.8), '23.8');
        });

        test('string', function(){
            assert.equal(repr('abc'), '"abc"');
            assert.equal(repr("def"), '"def"');
        });

        test('array', function(){
            assert.equal(repr([1, 5, 10]), '[1, 5, 10]');
        });

        test('plain object', function(){
            assert.equal(repr({1: 'one',  5: 10}), '{"1":"one", "5":10}');
        });

        test('function', function(){
            function my_func(){}
            assert.equal(repr(my_func), '<Function my_func>');
            assert.equal(repr(function(){}), '<Function >');
        });
    });

    suite('custom type', function(){
        // custom prototype objects
        function MyObj(){
            this.x = 5;
        }
        MyObj.prototype.my_method = function(){};

        test('constructor', function(){
            assert.equal(repr(MyObj), '<Constructor MyObj>');
        });

        test('instance', function(){
            var my_obj = new MyObj();
            assert.equal(repr(my_obj), '<MyObj {"x":5}>');
            assert.equal(repr(my_obj.x), '5');
            assert.equal(repr(my_obj.my_method), '<Function >');
        });
    });

    suite('function object', function(){
        // custom function objects (d3.js style)
        function MyFuncObj(){
            var abc = 1;
            function func(){}
            func.abc = function(x){};
            return func;
        }

        test('constructor', function(){
            // no way to figure out it is not a normal function
            assert.equal(repr(MyFuncObj), '<Function MyFuncObj>');
        });

        test('instance', function(){
            var my_fo = MyFuncObj();
            assert.equal(repr(my_fo), '<FuncObj func>');
            assert.equal(repr(my_fo.abc), '<Function >');
        });
    });


    test('escape_html()', function(){
        assert.equal(repr.escape_html('&'), '&amp;');
        assert.equal(repr.escape_html('<'), '&lt;');
        assert.equal(repr.escape_html('>'), '&gt;');
    });

});
