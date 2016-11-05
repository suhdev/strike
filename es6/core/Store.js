import * as Immutable from 'immutable';
export class Store {
    constructor(initialState, combiner, middleware, trackChanges, readiness) {
        let v = Immutable.Map;
        this.readyForActions = readiness || false;
        this.state = initialState || Immutable.Map({});
        this.combiner = combiner;
        this.middleware = middleware || [];
        this.subscribers = {};
        this.prevState = {};
        this.trackChanges = trackChanges || false;
        this.prevActions = [];
        this.components = [];
        this.queue = [];
        this.replaceStateAt = this.replaceStateAt.bind(this);
        this.addMiddleware = this.addMiddleware.bind(this);
        this.applyMiddleware = this.applyMiddleware.bind(this);
        this.connect = this.connect.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.dispatch = this.dispatch.bind(this);
        this.executeWithState = this.executeWithState.bind(this);
        this.getStateAt = this.getStateAt.bind(this);
        this.ready = this.ready.bind(this);
    }
    connect(elem) {
        let key = elem.getStateKey();
        this.components.push(elem);
        if (elem.getReducer) {
            this.combiner.addReducer(key, elem.getReducer());
        }
        this.replaceStateAt(key, Immutable.Map(elem.state));
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
        action && this.dispatch(action);
    }
    getStateAt(key) {
        return this.state.get(key);
    }
    getState() {
        return this.state;
    }
    replaceStateAt(key, val) {
        this.state = this.state.set(key, val);
    }
    deleteStateAt(key) {
        this.state = this.state.delete(key);
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
    disconnect(component) {
        let key = component.getStateKey();
        this.combiner.removeReducer(key);
        this.state = this.state.delete(key);
        let idx = this.components.indexOf(component);
        if (idx !== -1) {
            this.components.splice(idx, 1);
        }
    }
    dispatch(action) {
        if (!this.readyForActions) {
            this.queue.push(action);
            return;
        }
        this.prevState = this.state;
        let a = this.applyMiddleware(action);
        if (a) {
            if (this.trackChanges) {
                this.prevActions.push(a);
            }
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
    executeWithState(fn, statekeys) {
        let st = this;
        return fn(statekeys.map((e) => {
            return st.getStateAt(e);
        }));
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