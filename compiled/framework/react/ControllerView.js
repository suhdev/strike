import { Component } from 'react';
import { InjectPropsAndFreeze } from './InjectProps';
export class ControllerView extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {};
    }
    passPropsToChildren() {
        let children = this.props.children, i = 0, props, key, store = this.props.store, child;
        if (!children) {
            return;
        }
        children = children instanceof Array ? children : [children];
        for (i = 0; i < children.length; i++) {
            child = children[i];
            if ((key = child.props.appStateKey)) {
                props = Object.assign({}, child.props);
                child.props = InjectPropsAndFreeze(props, store.getStateAt(key));
            }
        }
    }
}
//# sourceMappingURL=ControllerView.js.map