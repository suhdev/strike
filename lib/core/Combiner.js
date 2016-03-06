"use strict";
class Combiner {
    constructor(...args) {
        this.reducers = {};
        let i = 0;
        for (i = 0; i < args.length; i++) {
            this.addReducer(args[i]);
        }
    }
    static combine(...args) {
        return new Combiner(...args);
    }
    addReducer(r) {
        if (typeof r === "string" && arguments.length === 2) {
            this.reducers[r] = arguments[1];
        }
        else if (typeof r === "function" && r.name) {
            this.reducers[r.name] = r;
        }
    }
    removeReducer(r) {
        if (typeof r === "function" &&
            r.name && this.reducers[r.name]) {
            delete this.reducers[r.name];
        }
        else if (typeof r === "string" &&
            this.reducers[r]) {
            delete this.reducers[r];
        }
    }
    update(state, action) {
        let prevState = state, key = null, reducers = this.reducers, newState = Object.assign({}, prevState);
        for (key in reducers) {
            newState[key] = reducers[key](prevState[key], action);
        }
        return newState;
    }
}
exports.Combiner = Combiner;
//# sourceMappingURL=Combiner.js.map