"use strict";
var Combiner = (function () {
    function Combiner() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        this.reducers = {};
        var i = 0;
        for (i = 0; i < args.length; i++) {
            this.addReducer(args[i]);
        }
    }
    Combiner.combine = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return new (Combiner.bind.apply(Combiner, [void 0].concat(args)))();
    };
    Combiner.prototype.addReducer = function (r) {
        if (typeof r === "string" && arguments.length === 2) {
            this.reducers[r] = arguments[1];
        }
        else if (typeof r === "function" && r.$name) {
            this.reducers[r.$name] = r;
        }
        else if (typeof r === "function" && r.name) {
            this.reducers[r.name] = r;
        }
    };
    Combiner.prototype.removeReducer = function (r) {
        if (typeof r === "function" &&
            r.$name && this.reducers[r.$name]) {
            delete this.reducers[r.$name];
        }
        else if (typeof r === "function" &&
            r.name && this.reducers[r.name]) {
            delete this.reducers[r.name];
        }
        else if (typeof r === "string" &&
            this.reducers[r]) {
            delete this.reducers[r];
        }
    };
    Combiner.prototype.update = function (state, action) {
        var newState = state, key = null, reducers = this.reducers, temp2 = null, temp = null;
        for (key in reducers) {
            temp2 = state.get(key);
            temp = reducers[key](temp2, action);
            if (temp != temp2) {
                newState = newState.set(key, temp);
            }
        }
        return newState;
    };
    return Combiner;
}());
exports.Combiner = Combiner;
//# sourceMappingURL=Combiner.js.map