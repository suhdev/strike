export class HashRouteStrategy {
    constructor() {
        this._handler = null;
        this._enabled = true;
        this._onChange = this._onChange.bind(this);
        this._prevPath = location.hash.slice(1);
        window.addEventListener('hashchange', this._onChange);
    }
    setPath(path) {
        this._enabled = false;
        location.hash = path;
        this._enabled = true;
    }
    setRouteChangeHandler(handler) {
        this._handler = handler;
    }
    _onChange() {
        if (this._enabled) {
            this._handler && this._handler.onRouteChange(this._prevPath, location.hash.slice(1));
            this._prevPath = location.hash.slice(1);
        }
    }
    addRoute() {
        if (arguments.length >= 2) {
            this._routes.push({
                rule: arguments[0],
                callback: arguments[1],
            });
        }
        else if (arguments.length > 0 && arguments[0].rule && arguments[1].callback) {
            this._routes.push(arguments[0]);
        }
    }
}
export class Router {
    constructor(store, changeActionType) {
        this._strategy = null;
        this._actionType = changeActionType;
        this._store = store;
    }
    setStrategy(strategy) {
        this._strategy = strategy;
    }
    onRouteChange(oldPath, newPath) {
        this._store.dispatch({
            type: this._actionType,
            data: {
                oldUrl: oldPath,
                newUrl: newPath,
            }
        });
    }
    setPath(newPath) {
        this._strategy.setPath(newPath);
    }
    addRoute() {
        this._strategy.addRoute.apply(this._strategy, Array.prototype.slice.call(arguments, 0));
    }
}
//# sourceMappingURL=Router.js.map