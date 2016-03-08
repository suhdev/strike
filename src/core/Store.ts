import {Dictionary} from './Util';
import {Reducer} from './Reducer';
import {Middleware} from './Middleware';
import {Subscriber} from './Subscriber';
import {Combiner} from './Combiner';
import {ControllerView} from '../react/ControllerView';
import {Action} from './Action';
export class Store {
	state:any;
	queue: Action[];
	middleware:Array<Middleware>;
	subscribers:Array<Subscriber>;
	combiner:Combiner;
	prevState:any;
	prevActions:Array<any>;
	components:ControllerView[];
	trackChanges:boolean;
	readyForActions: boolean;

	constructor(initialState:any,
		combiner:Combiner,
		middleware?:Array<Middleware>,
		trackChanges?:boolean){
		this.readyForActions = false;
		this.state = initialState || {}; 
		this.combiner = combiner;
		this.middleware = middleware || [];
		this.subscribers = [];
		this.prevState = {};
		this.trackChanges = trackChanges || false;
		this.prevActions = [];
		this.components = [];
		this.queue = [];
	}

	public connect(elem:ControllerView) {
		this.components.push(elem);
	}

	public addMiddleware(fn:Middleware):void{
		this.middleware.push(fn);
	}

	public removeMiddleware(fn:Middleware):void{
		let idx = this.middleware.indexOf(fn);
		if (idx !== -1){
			this.middleware.splice(idx, 1);
		}
	}

	public prev():void{
		let action: Action = this.prevActions.pop(); 
		this.dispatch(action);
	}

	public subscribe(s:Subscriber){
		this.subscribers.push(s);
	}

	public getStateAt(key:string):any{
		return this.state[key];
	}

	public getState():any{
		return this.state;
	}

	public applyMiddleware(action:Action):Action{
		let s = this;
		return this.middleware.reduce(
			(prevVal:Action, currentVal:Middleware, idx: Number, arr: Middleware[]) => { 
				if (!prevVal){
					return null;
				} 
				return currentVal(prevVal,s);
			},action);
	}

	public dispatch(action: Action): any {
		if (!this.readyForActions){
			this.queue.push(action);
			return;
		}
		this.prevState = this.state;
		if (this.trackChanges){
			this.prevActions.push(action);
		}
		let a: Action = this.applyMiddleware(action);
		if (a){
			this.state = this.combiner.update(this.state, a);
			this.components.forEach(c => { 
				if (this.state[c.getStateKey()]){
					c.setState(this.state[c.getStateKey()]);
				}
			});
		}
	}

	public ready():void{
		this.readyForActions = true;
		let a: Action;
		while((a = this.queue.shift())){
			this.dispatch(a);
		}
	}

	static singleton: Store;

	static create(initialState: any,
		combiner: Combiner,
		middleware?: Array<Middleware>,
		trackChanges?: boolean) {
		return Store.singleton = new Store(initialState,
			combiner,
			middleware,
			trackChanges); 
	}
}