'use strict';
var Util_1 = require('./Util');
var Injector = (function () {
    function Injector() {
        this.components = {};
        this.instances = {};
        this.stack = [];
    }
    Injector.prototype.addInstance = function (name, c) {
        return this.instances[name] = c;
    };
    Injector.prototype.addComponent = function (name, c) {
        return this.components[name] = c;
    };
    Injector.prototype.hasComponent = function (name) {
        return this.components[name];
    };
    Injector.prototype.hasInstance = function (name) {
        return this.instances[name];
    };
    Injector.prototype.injectFunction = function (fn, ctx) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (typeof fn !== "function") {
            throw new Error("Injector: provided argument is not a function");
        }
        var a, all = [], ccc = ctx || null;
        fn.$inject = fn.$inject || Util_1.extractArgumentsFromFunction(fn);
        if (!fn.$inject || fn.$inject.length === 0) {
            return fn.factory ? fn.factory() : fn();
        }
        while ((a = fn.$inject.shift())) {
            all.push(this.get(a));
        }
        return fn.factory ? fn.factory.apply(ccc, [].concat(all, Array.prototype.slice.call(args, 0))) : fn.apply(ccc, [].concat(all, Array.prototype.slice.call(args, 0)));
    };
    Injector.prototype._inject = function (name, c) {
        var a, all = [];
        if (!c.$inject || c.$inject.length === 0) {
            return this.addInstance(name, c.factory ? c.factory() : c());
        }
        if (this.stack.indexOf(name) !== -1) {
            throw new Error('Circular dependency: ' + this.stack.join(' -> ') + ' -> ' + name);
        }
        this.stack.push(name);
        while ((a = c.$inject.shift())) {
            all.push(this.get(a));
        }
        this.stack.pop();
        return this.instances[name] = c.factory ? c.factory.apply(null, all) : c.apply(null, all);
    };
    Injector.prototype.get = function (name) {
        if (this.instances[name]) {
            return this.instances[name];
        }
        if (!this.components[name]) {
            throw new Error('Component: ' + name + ' could not be found');
        }
        return this._inject(name, this.components[name]);
    };
    Injector.prototype.register = function () {
        var name, callback, deps, temp;
        if (arguments.length === 0) {
            throw new Error('Injector: no agruments provided.');
        }
        if (arguments.length === 2) {
            if (typeof arguments[0] !== "string") {
                throw new Error('Injector: first argument must be of type string.');
            }
            if (arguments[2] === null) {
                throw new Error('Injector: second argument cannot be null');
            }
            name = arguments[0];
            callback = arguments[1];
            if (typeof callback === "string" ||
                typeof callback === "number" ||
                (typeof callback === "object" &&
                    !(callback instanceof Array))) {
                this.addInstance(name, callback);
                return this;
            }
        }
        else if (arguments.length === 1) {
            temp = arguments[0];
            if (typeof temp === "function") {
                if (!temp.name) {
                    throw new Error('Injector: anonymous functions are not supported.');
                }
                name = temp.name;
                callback = temp;
            }
            else if (temp instanceof Array) {
                if (typeof temp[temp.length - 1] !== "function" ||
                    !temp[temp.length - 1].name) {
                    throw new Error('Injector: last item in Array is not a function or function has no name.');
                }
                callback = temp[temp.length - 1];
                name = callback.name;
            }
            else {
                throw new Error('Injector: unknown parameter set provided');
            }
        }
        callback.$inject = callback.$inject ||
            (typeof callback.factory === "function" && Util_1.extractArgumentsFromFunction(callback.factory)) ||
            (Util_1.extractArgumentsFromFunction(callback));
        this.addComponent(name, callback);
        return this;
    };
    return Injector;
}());
exports.Injector = Injector;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Injector;
//# sourceMappingURL=Injector.js.map