import { Component } from 'react';
export class BasicComponent extends Component {
    constructor(props, stateKey) {
        super(props);
        this.appStateKey = stateKey;
    }
    getAppStateKey() {
        return this.appStateKey;
    }
}
//# sourceMappingURL=BasicComponent.js.map