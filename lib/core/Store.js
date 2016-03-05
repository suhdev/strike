export class Store {
    constructor(initialState = {}, combiner, middleware = [], trackChanges = false) {
        this.state = initialState;
        this.combiner = combiner;
        this.middleware = middleware;
        this.subscribers = [];
        this.prevState = {};
        this.trackChanges = trackChanges;
        this.prevActions = [];
        this.components = [];
    }
    connect(elem) {
        this.components.push(elem);
    }
    addMiddleware(fn) {
        this.middleware.push(fn);
    }
    removeMiddleware(fn) {
        let idx = this.middleware.indexOf(fn);
        if (idx !== -1) {
            this.middleware.splice(idx, 1);
        }
    }
    prev() {
        let action = this.prevActions.pop();
        this.dispatch(action);
    }
    subscribe(s) {
        this.subscribers.push(s);
    }
    getStateAt(key) {
        return this.state[key];
    }
    getState() {
        return this.state;
    }
    applyMiddleware(action) {
        let s = this;
        return this.middleware.reduce((prevVal, currentVal, idx, arr) => {
            if (!prevVal) {
                return null;
            }
            return currentVal(prevVal, s);
        }, action);
    }
    dispatch(action) {
        this.prevState = this.state;
        if (this.trackChanges) {
            this.prevActions.push(action);
        }
        let a = this.applyMiddleware(action);
        if (a) {
            this.state = this.combiner.update(this.state, a);
            this.components.forEach(c => {
                if (this.state[c.getStateKey()]) {
                    c.setState(this.state[c.getStateKey()]);
                }
            });
        }
    }
    static create(initialState = {}, combiner, middleware = [], trackChanges = false) {
        return Store.singleton = new Store(initialState, combiner, middleware, trackChanges);
    }
}
//# sourceMappingURL=Store.js.map