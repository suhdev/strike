"use strict";
var HashRouteStrategy = (function () {
    function HashRouteStrategy() {
        this._handler = null;
        this._enabled = true;
        this._onChange = this._onChange.bind(this);
        this._prevPath = location.hash.slice(1);
        window.addEventListener('hashchange', this._onChange);
    }
    HashRouteStrategy.prototype.setPath = function (path) {
        this._enabled = false;
        location.hash = path;
        this._enabled = true;
    };
    HashRouteStrategy.prototype.setRouteChangeHandler = function (handler) {
        this._handler = handler;
    };
    HashRouteStrategy.prototype._onChange = function () {
        if (this._enabled) {
            this._handler && this._handler.onRouteChange(this._prevPath, location.hash.slice(1));
            this._prevPath = location.hash.slice(1);
        }
    };
    HashRouteStrategy.prototype.addRoute = function () {
        if (arguments.length >= 2) {
            this._routes.push({
                rule: arguments[0],
                callback: arguments[1],
            });
        }
        else if (arguments.length > 0 && arguments[0].rule && arguments[1].callback) {
            this._routes.push(arguments[0]);
        }
    };
    return HashRouteStrategy;
}());
exports.HashRouteStrategy = HashRouteStrategy;
var Router = (function () {
    function Router(store, changeActionType) {
        this._strategy = null;
        this._actionType = changeActionType;
        this._store = store;
    }
    Router.prototype.setStrategy = function (strategy) {
        this._strategy = strategy;
    };
    Router.prototype.onRouteChange = function (oldPath, newPath) {
        this._store.dispatch({
            type: this._actionType,
            data: {
                oldUrl: oldPath,
                newUrl: newPath,
            }
        });
    };
    Router.prototype.setPath = function (newPath) {
        this._strategy.setPath(newPath);
    };
    Router.prototype.addRoute = function () {
        this._strategy.addRoute.apply(this._strategy, Array.prototype.slice.call(arguments, 0));
    };
    return Router;
}());
exports.Router = Router;
//# sourceMappingURL=Router.js.map