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
			this.addReducer(args[i]);
		}
	}

	addReducer(reducer: Reducer): void;
	addReducer(name: string, reducer: Reducer): void;
	addReducer(r:any):void{
		if (typeof r === "string" && arguments.length === 2){
			this.reducers[r] = arguments[1];
		}else if (typeof r === "function" && r.name){
			this.reducers[r.name] = r;
		}
	}

	removeReducer(reducer: Reducer): void;
	removeReducer(name: string): void;
	removeReducer(r:any):void{
		if (typeof r === "function" && 
			r.name && this.reducers[r.name]){
			delete this.reducers[r.name]; 
		}else if (typeof r === "string" && 
			this.reducers[r]){
			delete this.reducers[r];
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