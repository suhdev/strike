import { Component } from 'react';
export class ControllerView extends Component {
    constructor(props, stateKey, initialState, reducer) {
        super(props);
        this.props = props;
        this.state = initialState;
        this._storeInstance = props.store;
        this._stateKey = stateKey;
    }
    getReducer() {
        return this._reducer;
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
//# sourceMappingURL=ControllerView.js.map