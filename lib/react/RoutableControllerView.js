"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var RoutableControllerView = (function (_super) {
    __extends(RoutableControllerView, _super);
    function RoutableControllerView(props, stateKey, initialState, reducer) {
        _super.call(this, props);
        this.props = props;
        this.state = initialState;
        this._storeInstance = props.store;
        this._stateKey = stateKey;
        this._reducer = reducer;
        this._router = props.router;
    }
    RoutableControllerView.prototype.getStateKey = function () {
        return this._stateKey;
    };
    RoutableControllerView.prototype.getReducer = function () {
        return this._reducer;
    };
    RoutableControllerView.prototype.componentDidMount = function () {
        this._storeInstance.connect(this);
    };
    RoutableControllerView.prototype.componentWillUnmount = function () {
        this._storeInstance.disconnect(this);
    };
    return RoutableControllerView;
}(React.Component));
exports.RoutableControllerView = RoutableControllerView;
//# sourceMappingURL=RoutableControllerView.js.map