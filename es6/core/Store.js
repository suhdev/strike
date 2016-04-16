import * as Immutable from 'immutable';
export class Store {
    constructor(initialState, combiner, middleware, trackChanges, readiness) {
        let v = Immutable.Map;
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
        if (!this.readyForActions) {
            this.queue.push(action);
            return;
        }
        this.prevState = this.state;
        if (this.trackChanges) {
            this.prevActions.push(action);
        }
        let a = this.applyMiddleware(action);
        if (a) {
            let prevState = this.state, temp;
            this.state = this.combiner.update(this.state, a);
            this.components.forEach(c => {
                temp = this.state.get(c.getStateKey());
                if (Immutable.Map.isMap(temp)) {
                    if (temp && temp !== prevState.get(c.getStateKey())) {
                        c.setState(temp.toObject());
                    }
                }
                else {
                    c.setState(temp);
                }
            });
        }
    }
    ready() {
        this.readyForActions = true;
        let a;
        while ((a = this.queue.shift())) {
            this.dispatch(a);
        }
    }
    static create(initialState, combiner, middleware, trackChanges, readiness) {
        return Store.singleton = new Store(initialState, combiner, middleware, trackChanges, readiness);
    }
}
//# sourceMappingURL=Store.js.map