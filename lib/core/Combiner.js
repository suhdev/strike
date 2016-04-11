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
        else if (typeof r === "function" && r.$name) {
            this.reducers[r.$name] = r;
        }
        else if (typeof r === "function" && r.name) {
            this.reducers[r.name] = r;
        }
    }
    removeReducer(r) {
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
    }
    update(state, action) {
        let newState = state, key = null, reducers = this.reducers, temp2 = null, temp = null;
        for (key in reducers) {
            temp2 = state.get(key);
            temp = reducers[key](temp2, action);
            if (temp != temp2) {
                newState = newState.set(key, temp);
            }
        }
        return newState;
    }
}
exports.Combiner = Combiner;
//# sourceMappingURL=Combiner.js.map