/*globals exports */

/* A more descriptive represetation of values than Object.toString() */
function repr(obj){
    var _name = null;
    if(obj === undefined) {
        return '<undefined>';
    }
    if(obj === null) {
        return '<null>';
    }

    var obj_type = typeof(obj);
    if (obj_type === "string"){
        return '"' + obj + '"';
    }

    if (obj instanceof Array){
        return '[' + obj.map(repr).join(', ')  + ']';
    }

    // a function is considered to be a "Constructor"
    // if anything is added its prototype
    if (obj instanceof Function){
        var proto = obj.prototype;
        for (_name in proto) {
            if (proto.hasOwnProperty(_name)) {
                return '<Constructor ' + obj.name + '>';
            }
        }

        // if the function itself has own properties
        // it is a FuncObj (like d3.js)
        for (_name in obj) {
            if (obj.hasOwnProperty(_name)) {
                return '<FuncObj ' + obj.name + '>';
            }
        }

        // just a plain function
        return '<Function ' + (obj.name) + '>';
    }


    if (obj_type === "object"){
        var proto_name = Object.getPrototypeOf(obj).constructor.name;
        // if not a plain object includes the constructor name
        if (proto_name === 'Object'){
            proto_name = null;
        }

        var item_str = repr.obj_items(obj, !proto_name);
        if (proto_name){
            return '<' + proto_name + ' ' + item_str + '>';
        }
        else {
            return item_str;
        }
    }

    // use default for other types
    return obj.toString();
}


/* return repr string for object items */
repr.obj_items = function(obj, include_functions){
    // include object attributes but not methods
    var items = [];
    for (var _name in obj) {
        if (obj.hasOwnProperty(_name)) {
            // ignore methods
            if (include_functions || !(obj[_name] instanceof Function)){
                items.push(repr(_name) + ':' + repr(obj[_name]));
            }
        }
    }
    return '{' + items.join(', ') + '}';
};


/* escape repr to be included in HTML body */
repr.escape_html = function(text){
    return text
        .replace(/&/g, '&amp;')
        .replace(/>/g, '&gt;')
        .replace(/</g, '&lt;');
};



/** @exports */
if (typeof exports !== 'undefined'){
    exports.repr = repr;
}
