import { ControllerView } from '../react/ControllerView';
import { BasicComponent } from '../react/BasicComponent';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Store } from '../core/Store';
import { Combiner } from '../core/Combiner';
class Button extends BasicComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", {className: "button", onClick: this.props.onClick}, this.props.firstName));
    }
}
class Test extends ControllerView {
    constructor(props) {
        super(props, 'clicker');
    }
    onClick(evt, type) {
        this.props.store.dispatch({
            type: 'Testing',
            data: type
        });
    }
    render() {
        return (React.createElement("div", {className: "tester"}, React.createElement(Button, {firstName: this.state.firstName, onClick: this.onClick.bind(this, 'clicker')}), React.createElement(Button, {firstName: this.state.lastName, onClick: this.onClick.bind(this, 'flicker')})));
    }
}
class Test2 extends ControllerView {
    constructor(props) {
        super(props, 'flicker');
    }
    onClick(evt, type) {
        this.props.store.dispatch({
            type: 'Click',
            data: { firstName: 'Sahooli' }
        });
    }
    render() {
        return (React.createElement("div", {className: "tester"}, React.createElement(Button, {firstName: this.state.firstName, onClick: this.onClick.bind(this, 'clicker')}), React.createElement(Button, {firstName: this.state.firstName, onClick: this.onClick.bind(this, 'clicker')}), React.createElement(Button, {firstName: this.state.lastName, onClick: this.onClick.bind(this, 'flicker')}), React.createElement(Button, {firstName: this.state.lastName, onClick: this.onClick.bind(this, 'flicker')})));
    }
}
class App extends ControllerView {
    constructor(props) {
        super(props, 'twister');
    }
    onTest() {
        this.props.store.dispatch({ type: 'Testing' });
    }
    onTesting() {
        this.props.store.dispatch({ type: 'Click', data: { 'firstName': 'Sahooli' } });
    }
    render() {
        return (React.createElement("div", {className: "test"}, React.createElement(Test, {store: this.props.store}), React.createElement(Test2, {store: this.props.store})));
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
    flicker: { firstName: "Susu", lastName: "Abodi" },
    twister: {
        logical: 'track'
    } }, Combiner.combine(clicker, flicker));
ReactDOM.render(React.createElement(App, {store: st}), document.getElementById('Container'), function () {
    st.dispatch({
        type: 'Init',
        data: 0
    });
});
//# sourceMappingURL=app.js.map