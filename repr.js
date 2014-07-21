/*exported repr, escape_html */



function repr(obj){
    var _name = null;
    if(obj === undefined) { return '<undefined>'; }
    if(obj === null) { return '<null>'; }
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
        // if not a plain object includes the constructor name
        var proto_name = Object.getPrototypeOf(obj).constructor.name;
        if (proto_name === 'Object'){
            proto_name = null; // ignore plain objects
        }

        // include object attributes but not methods
        var items = [];
        for (_name in obj) {
            if (obj.hasOwnProperty(_name)) {
                // ignore methods
                if (!proto_name || !(obj[_name] instanceof Function)){
                    items.push(repr(_name) + ':' + repr(obj[_name]));
                }
            }
        }
        var item_str = '{' + items.join(', ') + '}';

        if (proto_name){
            return '<' + proto_name + ' ' + item_str + '>';
        }
        else {
            return item_str;
        }
    }

    return obj.toString();
}

function escape_html(text){
    return text
        .replace(/&/g, '&amp;')
        .replace(/>/g, '&gt;')
        .replace(/</g, '&lt;');
}
