"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var react_1 = require('react');
var ControllerView = (function (_super) {
    __extends(ControllerView, _super);
    function ControllerView(props, stateKey, initialState, reducer) {
        _super.call(this, props);
        this.props = props;
        this.state = initialState;
        this._storeInstance = props.store;
        this._stateKey = stateKey;
        this._reducer = reducer;
    }
    ControllerView.prototype.getReducer = function () {
        return this._reducer;
    };
    ControllerView.prototype.getStateKey = function () {
        return this._stateKey;
    };
    ControllerView.prototype.componentDidMount = function () {
        this._storeInstance.connect(this);
    };
    ControllerView.prototype.componentWillUnmount = function () {
        this._storeInstance.disconnect(this);
    };
    return ControllerView;
}(react_1.Component));
exports.ControllerView = ControllerView;
//# sourceMappingURL=ControllerView.js.map