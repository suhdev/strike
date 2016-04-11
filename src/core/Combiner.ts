import {Reducer} from './Reducer';
import {Dictionary} from './Util';
import {Action} from './Action';
// import * as Immutable from 'immutable';
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
		}else if (typeof r === "function" && r.$name){
			this.reducers[r.$name] = r;
		}else if (typeof r === "function" && r.name){
			this.reducers[r.name] = r;
		}
	}

	removeReducer(reducer: Reducer): void;
	removeReducer(name: string): void;
	removeReducer(r:any):void{
		if (typeof r === "function" && 
			r.$name && this.reducers[r.$name]){
			delete this.reducers[r.$name]; 
		}else if (typeof r === "function" &&
			r.name && this.reducers[r.name]){
			delete this.reducers[r.name]
		}else if (typeof r === "string" && 
			this.reducers[r]){
			delete this.reducers[r];
		}
	}

	update(state:any,action:Action){
		let newState = state,
			key: string = null,
			reducers = this.reducers,
			temp2: any = null,
			temp: any = null;
			// newState:Immutable.Map<string,any> = Object.assign({},prevState);
		for(key in reducers) {
			temp2 = state.get(key);
			temp = reducers[key](temp2, action);
			if (temp != temp2){
				newState = newState.set(key, temp);
			}
			// newState[key] = reducers[key](newState[key], action);  
		}
		return newState;
	}

	
}