"use strict";
const ControllerView_1 = require('../react/ControllerView');
const ReactDOM = require('react-dom');
const React = require('react');
const Store_1 = require('../core/Store');
const Combiner_1 = require('../core/Combiner');
const Immutable = require('immutable');
class Button extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", {className: "button", onClick: this.props.onClick}, this.props.firstName));
    }
}
class Test extends ControllerView_1.ControllerView {
    constructor(props) {
        super(props, 'click');
    }
    onClick(evt, type) {
        this.props.store.dispatch({
            type: 'Testing',
            data: type
        });
    }
    render() {
        console.log(this.state);
        return (React.createElement("div", {className: "tester"}, React.createElement(Button, {firstName: this.state.firstName, onClick: this.onClick.bind(this, 'clicker')}), React.createElement(Button, {firstName: this.state.lastName, onClick: this.onClick.bind(this, 'flicker')})));
    }
}
class Test2 extends ControllerView_1.ControllerView {
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
        console.log(this.state);
        console.log(this._storeInstance);
        return (React.createElement("div", {className: "tester"}, React.createElement(Button, {firstName: this.state.firstName, onClick: this.onClick.bind(this, 'clicker')}), React.createElement(Button, {firstName: this.state.firstName, onClick: this.onClick.bind(this, 'clicker')}), React.createElement(Button, {firstName: this.state.lastName, onClick: this.onClick.bind(this, 'flicker')}), React.createElement(Button, {firstName: this.state.lastName, onClick: this.onClick.bind(this, 'flicker')})));
    }
}
class App extends ControllerView_1.ControllerView {
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
    console.log(state);
    if (action.type === 'Testing') {
        return { firstName: 'Haneen', lastName: 'Ayad' };
    }
    return state;
}
function flicker(state, action) {
    console.log(state);
    if (action.type === 'Click') {
        return { firstName: action.data.firstName, lastName: 'Debug' };
    }
    return state;
}
var combiner = new Combiner_1.Combiner();
combiner.addReducer('click', clicker);
combiner.addReducer(flicker);
var st = Store_1.Store.create(Immutable.Map({
    click: { firstName: "Suhail", lastName: "Abood" },
    flicker: { firstName: "Susu", lastName: "Abodi" },
    twister: { logical: 'track' }
}), combiner);
ReactDOM.render(React.createElement(App, {store: st}), document.getElementById('Container'), function () {
    st.ready();
    st.dispatch({
        type: 'Init',
        data: 0
    });
});
//# sourceMappingURL=app.js.map