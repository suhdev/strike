export class Combiner {
    constructor(...args) {
        this.reducers = {};
        let i = 0;
        for (i = 0; i < args.length; i++) {
            this.reducers[args[i].name] = args[i];
        }
    }
    static combine(...args) {
        return new Combiner(...args);
    }
    update(state, action) {
        let prevState = state, key = null, reducers = this.reducers, newState = Object.assign({}, prevState);
        for (key in reducers) {
            newState[key] = reducers[key](prevState[key], action);
        }
        return newState;
    }
}
//# sourceMappingURL=Combiner.js.map