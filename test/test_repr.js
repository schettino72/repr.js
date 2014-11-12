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

    suite('circular reference', function(){
        test('dict', function(){
            var foo = {'f': 1};
            var bar = {'b': 2, f:foo};
            foo.bar = bar;
            assert.equal(repr(foo),
                         '{"f":1, "bar":{"b":2, "f":<circular-ref {}>}}');
        });
        test('array', function(){
            var foo = {'f': 1};
            var bar = [foo];
            foo.bar = bar;
            assert.equal(repr(bar),
                         '[{"f":1, "bar":<circular-ref []>}]');
        });
    });

    test('escape_html()', function(){
        assert.equal(repr.escape_html('&'), '&amp;');
        assert.equal(repr.escape_html('<'), '&lt;');
        assert.equal(repr.escape_html('>'), '&gt;');
    });

});
