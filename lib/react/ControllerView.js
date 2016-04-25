"use strict";
const react_1 = require('react');
class ControllerView extends react_1.Component {
    constructor(props, stateKey) {
        super(props);
        this.props = props;
        this.state = {};
        this._storeInstance = props.store;
        this._stateKey = stateKey;
    }
    getStateKey() {
        return this._stateKey;
    }
    componentDidMount() {
        this._storeInstance.connect(this);
    }
    componentWillUnmount() {
        this._storeInstance.disconnect(this);
    }
}
exports.ControllerView = ControllerView;
//# sourceMappingURL=ControllerView.js.map