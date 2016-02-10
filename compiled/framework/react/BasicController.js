import { Component } from 'react';
export class BasicController extends Component {
    constructor(props, stateKey) {
        super(props);
        this.appStateKey = stateKey;
    }
    getAppStateKey() {
        return this.appStateKey;
    }
}
//# sourceMappingURL=BasicController.js.map