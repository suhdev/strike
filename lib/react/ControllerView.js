import { Component } from 'react';
export class ControllerView extends Component {
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
}
//# sourceMappingURL=ControllerView.js.map