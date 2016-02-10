import {Reducer} from './Reducer';
import {Dictionary} from './Util';
import {Action} from './Action';
export class Combiner {
	static combine(...args:Reducer[]){
		return new Combiner(...args);
	}
	reducers:Dictionary<Reducer>
	constructor(...args:Reducer[]){
		this.reducers = {};
		let i = 0;
		for (i = 0; i < args.length;i++){
			this.reducers[args[i].name] = args[i]; 
		}
	}

	update(state:any,action:Action){
		let prevState = state, 
			key:string = null,
			reducers = this.reducers,
			newState:Dictionary<any> = Object.assign({},prevState);
		for(key in reducers) {
			newState[key] = reducers[key](prevState[key], action);  
		}
		return newState;
	}

	
}