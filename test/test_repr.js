/* global console, repr */
/* exported test_repr */

function test_repr(write_func){

    // check how to output results
    if (!write_func){
        if (typeof console !== 'undefined'){
            write_func = function(){
                console.log.apply(console, arguments);
            };
        }
        else {
            throw new Error('No function to log results!');
        }
    }

    function assert(obj, expected){
        var got = repr(obj);
        if (got !== expected){
            write_func('Error:', obj, expected, got);
        }
        else {
            write_func('Ok:', got);
        }
    }

    // basic types
    assert(null, '<null>');
    assert(undefined, '<undefined>');
    assert(34, '34');
    assert(23.8, '23.8');
    assert('abc', '"abc"');
    assert("def", '"def"');
    assert([1, 5, 10], '[1, 5, 10]');
    assert({1: 'one',  5: 10}, '{"1":"one", "5":10}');

    // functions
    function my_func(){
        return 'xxxx';
    }
    assert(my_func, '<Function my_func>');
    assert(function(){}, '<Function >');

    // custom prototype objects
    function MyObj(){
        this.x = 5;
    }
    MyObj.prototype.my_method = function(){
        return 'hi';
    };
    var my_obj = new MyObj();
    assert(MyObj, '<Constructor MyObj>');
    assert(my_obj, '<MyObj {"x":5}>');
    assert(my_obj.x, '5');
    assert(my_obj.my_method, '<Function >');

    // custom function objects (d3.js style)
    function func_obj(){
        var abc = 1;
        function func(){
            return abc * 2;
        }
        func.abc = function(x){
            if (!arguments.length) return abc;
            abc = x;
            return func;
        };
        return func;
    }
    var my_fo = func_obj();
    // no way to figure out it is not a plain function
    assert(func_obj, '<Function func_obj>');
    assert(my_fo, '<FuncObj func>');
    assert(my_fo.abc, '<Function >');
}
