"use strict";
function extractArgumentsFromFunction(fn) {
    var deps;
    fn.toString()
        .replace(/^function[\s]+?[\S]+?\((.*?)\)/, function (e, v, k) {
        deps = (v.trim().length > 0 && v.trim().split(/[\s,]+/)) || [];
        return e;
    });
    return deps;
}
exports.extractArgumentsFromFunction = extractArgumentsFromFunction;
function getDataAt(object, path, p) {
    var o = object, key, temp, pathSep = p ? p : '.', list = path.split(pathSep);
    while ((key = list.shift()) && (temp = o[key]) && (o = temp))
        ;
    return temp;
}
exports.getDataAt = getDataAt;
function setDataAt(object, path, value, p) {
    var o = object, key, temp, pathSep = p ? p : '.', list = path.split(pathSep), lastKey = list.length > 0 ? list.splice(list.length - 1, 1)[0] : null;
    while ((key = list.shift()) && ((temp = o[key]) || (temp = o[key] = {})) && (o = temp))
        ;
    temp[lastKey] = value;
}
exports.setDataAt = setDataAt;
function format(value, replacements) {
    if (!replacements) {
        return value;
    }
    return value.replace(/\{(.*?)\}/g, function (k, e) {
        return (replacements && replacements[e]) || k;
    });
}
exports.format = format;
//# sourceMappingURL=Util.js.map