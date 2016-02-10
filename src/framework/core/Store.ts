import {Dictionary} from './Util';
import {Reducer} from './Reducer';
import {Middleware} from './Middleware';
import {Subscriber} from './Subscriber';
import {Combiner} from './Combiner';
import {Component} from 'react';
export class Store {
	state:any
	middleware:Array<Middleware>
	subscribers:Array<Subscriber>
	combiner:Combiner
	prevState:any
	prevStates:Array<any>
	elem:Component<any,any>
	storeState:boolean

	constructor(initialState:any,
		combiner:Combiner,
		middleware:Array<Middleware>=[],
		storeState:boolean=false){
		this.state = initialState; 
		this.combiner = combiner;
		this.middleware = middleware;
		this.subscribers = [];
		this.prevState = {};
		this.storeState = storeState;
		this.prevStates = [];
		this.elem = null;

	}

	public connect(elem:Component<any,any>){
		this.elem = elem;
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
		this.state = this.prevStates.pop() || this.state;
		this.elem.setState({update:true});
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

	public dispatch(action: Action): any {
		this.prevState = this.state;
		if (this.storeState){
			this.prevStates.push(this.prevState);
		}
		this.state = this.combiner.update(this.state, action);
		this.elem.setState({
			update:true
		});
	}
}