import {ControllerView} from '../react/ControllerView';
import {BasicComponent} from '../react/BasicComponent';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {Store} from '../core/Store';
import {Combiner} from '../core/Combiner';
class Button extends BasicComponent<any,any>{
	constructor(props:any){
		super(props, 'clicker');
	}
	render(){
		console.log(this.props);
		return (<div className="button" onClick={this.props.onClick}>{this.props.firstName}</div>);
	}
}
class Test extends ControllerView {
	constructor(props:any){
		super(props);
	}

	render(){
		this.passPropsToChildren();
		return (
			<div className="tester">
				{this.props.children}
			</div>
			);
	}
}
class App extends ControllerView{
	constructor(props:any){
		super(props);
	}

	onTest(){
		
		this.props.store.dispatch({type:'Testing'});
	}

	onTesting(){
		this.props.store.dispatch({type:'Click',data:{'firstName':'Sahooli'}});
	}

	componentDidMount(){
		this.props.store.connect(this);
	}

	shouldComponentUpdate(){
		return true;
	}

	render(){
		// console.log(this);
		this.passPropsToChildren();
		return (
			<div className="test">
				<Test store={this.props.store}>
					<Button appStateKey="clicker" onClick={this.onTest.bind(this)} />
					<Button appStateKey="flicker" onClick={this.onTesting.bind(this)} />
					<Test store={this.props.store}>
						<Button appStateKey="clicker" onClick={this.onTest.bind(this) } />
						<Button appStateKey="flicker" onClick={this.onTesting.bind(this) } />
					</Test>
				</Test>
			</div>
		);
	}
}
function clicker(state:any,action:Action){
	// console.log(state);
	if (action.type === 'Testing'){
		return { firstName: 'Haneen', lastName: 'Ayad' };
	}
	return state;
}

function flicker(state:any,action:Action){
	if (action.type === 'Click'){
		return { firstName: action.data.firstName, lastName: 'Debug' };
	}
	return state;
}
var st: Store = new Store({ clicker: { firstName: "Suhail",lastName:"Abood" },
	flicker:{firstName:"Susu",lastName:"Abodi"} }, Combiner.combine(clicker,flicker));


ReactDOM.render(<App store={st}/>, document.getElementById('Container'));
