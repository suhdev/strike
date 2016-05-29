"use strict";
var Immutable = require('immutable');
var Store = (function () {
    function Store(initialState, combiner, middleware, trackChanges, readiness) {
        var v = Immutable.Map;
        this.readyForActions = readiness || false;
        this.state = initialState || new v({});
        this.combiner = combiner;
        this.middleware = middleware || [];
        this.subscribers = [];
        this.prevState = {};
        this.trackChanges = trackChanges || false;
        this.prevActions = [];
        this.components = [];
        this.queue = [];
    }
    Store.prototype.connect = function (elem) {
        this.components.push(elem);
    };
    Store.prototype.addMiddleware = function (fn) {
        this.middleware.push(fn);
    };
    Store.prototype.removeMiddleware = function (fn) {
        var idx = this.middleware.indexOf(fn);
        if (idx !== -1) {
            this.middleware.splice(idx, 1);
        }
    };
    Store.prototype.prev = function () {
        var action = this.prevActions.pop();
        this.dispatch(action);
    };
    Store.prototype.subscribe = function (s) {
        this.subscribers.push(s);
    };
    Store.prototype.getStateAt = function (key) {
        return this.state[key];
    };
    Store.prototype.getState = function () {
        return this.state;
    };
    Store.prototype.replaceStateAt = function (key, val) {
        this.state = this.state.set(key, val);
    };
    Store.prototype.deleteStateAt = function (key) {
        this.state = this.state.delete(key);
    };
    Store.prototype.applyMiddleware = function (action) {
        var s = this;
        return this.middleware.reduce(function (prevVal, currentVal, idx, arr) {
            if (!prevVal) {
                return null;
            }
            return currentVal(prevVal, s);
        }, action);
    };
    Store.prototype.disconnect = function (component) {
        this.state = this.state.delete(component.getStateKey());
        this.combiner.removeReducer(component.getStateKey());
        var idx = this.components.indexOf(component);
        if (idx !== -1) {
            this.components.splice(idx, 1);
        }
    };
    Store.prototype.dispatch = function (action) {
        var _this = this;
        if (!this.readyForActions) {
            this.queue.push(action);
            return;
        }
        this.prevState = this.state;
        if (this.trackChanges) {
            this.prevActions.push(action);
        }
        var a = this.applyMiddleware(action);
        if (a) {
            var prevState_1 = this.state, temp_1;
            this.state = this.combiner.update(this.state, a);
            this.components.forEach(function (c) {
                temp_1 = _this.state.get(c.getStateKey());
                if (Immutable.Map.isMap(temp_1)) {
                    if (temp_1 && temp_1 !== prevState_1.get(c.getStateKey())) {
                        c.setState(temp_1.toObject());
                    }
                }
                else {
                    c.setState(temp_1);
                }
            });
        }
    };
    Store.prototype.ready = function () {
        this.readyForActions = true;
        var a;
        while ((a = this.queue.shift())) {
            this.dispatch(a);
        }
    };
    Store.create = function (initialState, combiner, middleware, trackChanges, readiness) {
        return Store.singleton = new Store(initialState, combiner, middleware, trackChanges, readiness);
    };
    return Store;
}());
exports.Store = Store;
//# sourceMappingURL=Store.js.map