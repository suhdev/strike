import {ControllerView} from '../react/ControllerView';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {Store} from '../core/Store';
import {Combiner} from '../core/Combiner';
import {Action} from '../core/Action';
class Button extends React.Component<any,any>{
	constructor(props:any){
		super(props);
	}
	render(){
		return (<div className="button" onClick={this.props.onClick}>{this.props.firstName}</div>);
	}
}
class Test extends ControllerView {
	constructor(props:any){
		super(props,'clicker');
	}

	onClick(evt:Event,type:string){
		this.props.store.dispatch({
			type:'Testing',
			data:type
		});
	}

	render(){
		return (
			<div className="tester">
				<Button firstName={this.state.firstName} onClick={this.onClick.bind(this,'clicker') } />
				<Button firstName={this.state.lastName} onClick={this.onClick.bind(this,'flicker') } />
			</div>
			);
	}
}

class Test2 extends ControllerView {
	constructor(props: any) {
		super(props, 'flicker');
	}

	onClick(evt: Event, type: string) {
		this.props.store.dispatch({
			type: 'Click',
			data: {firstName:'Sahooli'}
		});
	}

	render() {
		return (
			<div className="tester">
				<Button firstName={this.state.firstName} onClick={this.onClick.bind(this, 'clicker') } />
				<Button firstName={this.state.firstName} onClick={this.onClick.bind(this, 'clicker') } />
				<Button firstName={this.state.lastName} onClick={this.onClick.bind(this, 'flicker') } />
				<Button firstName={this.state.lastName} onClick={this.onClick.bind(this, 'flicker') } />
			</div>
		);
	}
}
class App extends ControllerView{
	constructor(props:any){
		super(props,'twister');
	}

	onTest(){
		
		this.props.store.dispatch({type:'Testing'});
	}

	onTesting(){
		this.props.store.dispatch({type:'Click',data:{'firstName':'Sahooli'}});
	}

	render(){
		return (
			<div className="test">
				<Test store={this.props.store}></Test>
				<Test2 store={this.props.store}></Test2>
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


var st: Store = Store.create({ 
	clicker: { firstName: "Suhail",lastName:"Abood" },
	flicker:{firstName:"Susu",lastName:"Abodi"},
	twister: { logical: 'track' } 
	}, Combiner.combine(clicker,flicker));


ReactDOM.render(<App store={st}/>, document.getElementById('Container') ,function(){
	st.dispatch({
		type:'Init',
		data:0
	});
});
