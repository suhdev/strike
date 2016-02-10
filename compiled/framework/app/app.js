import { ControllerView } from '../react/ControllerView';
import { BasicComponent } from '../react/BasicComponent';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Store } from '../core/Store';
import { Combiner } from '../core/Combiner';
class Button extends BasicComponent {
    constructor(props) {
        super(props, 'clicker');
    }

    render() {
        console.log(this.props);
        return (React.createElement("div", {"className": "button", "onClick": this.props.onClick}, this.props.firstName));
    }
}
class Test extends ControllerView {
    constructor(props) {
        super(props);
    }
    
    render() {
        this.passPropsToChildren();
        return (React.createElement("div", {"className": "tester"}, this.props.children));
    }
}
class App extends ControllerView {
    constructor(props) {
        super(props);
    }
    onTest() {
        this.props.store.dispatch({ type: 'Testing' });
    }
    onTesting() {
        this.props.store.dispatch({ type: 'Click', data: { 'firstName': 'Sahooli' } });
    }
    componentDidMount() {
        this.props.store.connect(this);
    }
    shouldComponentUpdate() {
        return true;
    }
    render() {
        this.passPropsToChildren();
        return (React.createElement("div", {"className": "test"}, React.createElement(Test, {"store": this.props.store}, React.createElement(Button, {"appStateKey": "clicker", "onClick": this.onTest.bind(this)}), React.createElement(Button, {"appStateKey": "flicker", "onClick": this.onTesting.bind(this)}), React.createElement(Test, {"store": this.props.store}, React.createElement(Button, {"appStateKey": "clicker", "onClick": this.onTest.bind(this)}), React.createElement(Button, {"appStateKey": "flicker", "onClick": this.onTesting.bind(this)})))));
    }
}
function clicker(state, action) {
    if (action.type === 'Testing') {
        return { firstName: 'Haneen', lastName: 'Ayad' };
    }
    return state;
}
function flicker(state, action) {
    if (action.type === 'Click') {
        return { firstName: action.data.firstName, lastName: 'Debug' };
    }
    return state;
}
var st = new Store({ clicker: { firstName: "Suhail", lastName: "Abood" },
    flicker: { firstName: "Susu", lastName: "Abodi" } }, Combiner.combine(clicker, flicker),[],true);
window.ST = st;
ReactDOM.render(React.createElement(App, {"store": st}), document.getElementById('Container'));
//# sourceMappingURL=app.js.map