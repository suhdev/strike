import * as React from 'react';
export class RoutableControllerView extends React.Component {
    constructor(props, stateKey, initialState, reducer) {
        super(props);
        this.props = props;
        this.state = initialState;
        this._storeInstance = props.store;
        this._stateKey = stateKey;
        this._reducer = reducer;
        this._router = props.router;
    }
    getStateKey() {
        return this._stateKey;
    }
    getReducer() {
        return this._reducer;
    }
    componentDidMount() {
        this._storeInstance.connect(this);
    }
    componentWillUnmount() {
        this._storeInstance.disconnect(this);
    }
}
//# sourceMappingURL=RoutableControllerView.js.map