export class Store {
    constructor(initialState, combiner, middleware = [], storeState = false) {
        this.state = initialState;
        this.combiner = combiner;
        this.middleware = middleware;
        this.subscribers = [];
        this.prevState = {};
        this.storeState = storeState;
        this.prevStates = [];
        this.elem = null;
    }
    connect(elem) {
        this.elem = elem;
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
        this.state = this.prevStates.pop() || this.state;
        this.elem.setState({ update: true });
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
    dispatch(action) {
        this.prevState = this.state;
        if (this.storeState) {
            this.prevStates.push(this.prevState);
        }
        this.state = this.combiner.update(this.state, action);
        this.elem.setState({
            update: true
        });
    }
}
//# sourceMappingURL=Store.js.map