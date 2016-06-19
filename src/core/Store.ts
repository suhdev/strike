import {Dictionary} from './Util';
import {Reducer} from './Reducer';
import {Middleware} from './Middleware';
import {Subscriber} from './Subscriber';
import {Combiner} from './Combiner';
import {ControllerView} from '../react/ControllerView';
import {Action} from './Action';
import * as Immutable from 'immutable';
/**
 * A {Store} component is the main component responsible for managing the application's state. 
 * Internally, the state is an instance of {Immutable.Map<string,any>}. Each {ControllerView} connects 
 * to the {Store} using a specific state key. The state key of each component is used to scope the application
 * state into sections that are managed by different {ControllerView} components. In a StrikeJS application, 
 * there is only one Store.  
 * 
 * 
 * @export
 * @class Store
 */
export class Store {
	/**
	 * The application state.
	 * 
	 * @type {Immutable.Map<string,any>}
	 */
	state:Immutable.Map<string,any>;
	/**
	 * A queue of any pending actions. This is useful to catch any actions that are dispatched before the Store enters the ready state. 
	 * Once the store becomes ready, all pending actions are dispatched in the same order they're received. 
	 * 
	 * @type {Action[]}
	 */
	queue: Action[];
	/**
	 * A list of middleware functions that are registered with the store. Middlewares are useful in handling specific types of actions. 
	 * 
	 * @type {Array<Middleware>}
	 */
	middleware:Array<Middleware>;
	/**
	 * This is an experimental feature. Do not use it in your applications. 
	 * 
	 * @type {Array<Subscriber>}
	 */
	subscribers:Array<Subscriber>;
	/**
	 * A combiner is responsible for creating the application's next state upon receiving an Action. 
	 * All {ControllerView} are registered with the combiner which receives the overall state of the application 
	 * and executes all of the reducers registered with it passing the appropriate part of the application state to each
	 * reducer. 
	 * 
	 * @type {Combiner}
	 */
	combiner:Combiner;
	/**
	 * A reference to the previous state of the application. 
	 * 
	 * @type {*}
	 */
	prevState:any;
	/**
	 * A list of all the actions that have been dispatched so far. This is only activated if the {trackChanges} flag is set to true. 
	 * The features allows for recreating a specific application state depending on all the actions that have been dispatched so far. 
	 * @type {Array<any>}
	 */
	prevActions:Array<any>;
	/**
	 * All {ControllerView} components that are registered with the store. 
	 * 
	 * @type {Array<ControllerView<any,any>>}
	 */
	components:ControllerView<any,any>[];
	/**
	 * Whether actions should be tracked or not. 
	 * Note: the tracked actions are those actions that pass through all the middlewares and are the ones that 
	 * are received by the reducers. Defaults to false
	 * 
	 * @type {boolean}
	 */
	trackChanges:boolean;
	/**
	 * Whether the store is ready to dispatch actions or not. 
	 * The flag can be used to ensure that the store to start executing actions after specific conditions are met.
	 * Defaults to false. 
	 * 
	 * @type {boolean}
	 */
	readyForActions: boolean;

	/**
	 * Creates an instance of Store.
	 * 
	 * @param {Immutable.Map<string,any>} initialState the initial state of the application. It must be an instance of {Immutable.Map}.
	 * @param {Combiner} combiner the application combiner
	 * @param {Array<Middleware>} [middleware] an array of middleware functions. 
	 * @param {boolean} [trackChanges] whether to track actions or not. 
	 * @param {boolean} [readiness] whether the store is ready or not. 
	 */
	constructor(initialState:Immutable.Map<string,any>,
		combiner:Combiner,
		middleware?:Array<Middleware>,
		trackChanges?:boolean,
		readiness?:boolean){
		let v:any = Immutable.Map;
		this.readyForActions = readiness || false;
		this.state = initialState || Immutable.Map<string,any>({}); 
		this.combiner = combiner;
		this.middleware = middleware || [];
		this.subscribers = [];
		this.prevState = {};
		this.trackChanges = trackChanges || false;
		this.prevActions = [];
		this.components = [];
		this.queue = [];
	}

	/**
	 * Connect's a {ControllerView} component to the application store. Mainly three things happen here:
	 * 1. Add the {ControllerView} component to the list of components within the store. 
	 * 2. Register the {ControllerView} component's Reducer with the {Combiner}. 
	 * 3. Set the state at the {ControllerView} component's state key to the current state of the {ControllerView} component's state. The state is registered as an instance of {Immutable.Map<string,any>}.
	 * 
	 * @param {ControllerView<any,any>} elem (description)
	 */
	public connect(elem:ControllerView<any,any>):void {
		let key = elem.getStateKey();
		this.components.push(elem);
		this.combiner.addReducer(key,elem.getReducer());
		this.replaceStateAt(key,Immutable.Map(elem.state));
	}

	/**
	 * Add a given middleware to the list of registered middleware. 
	 * Note: middlewares are executed in order, so order does matter. 
	 * For example, a middleware that transforms an injectable action to a promise action, 
	 * must be registered before the promisify middleware, such that the results of the injectable 
	 * middleware can be handled by the promisify middlware.  
	 * 
	 * @param {Middleware} fn the middlware to register
	 */
	public addMiddleware(fn:Middleware):void{
		this.middleware.push(fn);
	}

	/**
	 * Remove a specific middlware from the list of registered middlewares. 
	 * Note: the same exact function that has been registered must be passed in order for it to be removed.  
	 * @param {Middleware} fn the middlware function to remove. 
	 */
	public removeMiddleware(fn:Middleware):void{
		let idx = this.middleware.indexOf(fn);
		if (idx !== -1){
			this.middleware.splice(idx, 1);
		}
	}

	/**
	 * Dispatches the last action that has been dispatches. 
	 * Note: this is only if the trackChanges flag has been set to true. 
	 */
	public prev():void{
		let action: Action = this.prevActions.pop();
		action && this.dispatch(action);
	}

	/**
	 * This is experimental. Do not use in your applications. 
	 * 
	 * @param {Subscriber} s 
	 */
	public subscribe(s:Subscriber){
		this.subscribers.push(s);
	}

	/**
	 * Get part of the application state at a given key.
	 * 
	 * @param {string} key the state key to get the state at. 
	 * @returns {Immutable.Map<stirng,any>} 
	 */
	public getStateAt(key:string):Immutable.Map<string,any>{
		return this.state.get(key);
	}

	/**
	 * Get the overall application state. 
	 * 
	 * @returns {Immutable.Map<string,any>} (description)
	 */
	public getState():Immutable.Map<string,any>{
		return this.state;
	}

	/**
	 * Replaces part of the application at a given key. 
	 * 
	 * @param {string} key the key to the part of state to replace. 
	 * @param {Immutable.Map<string,any>} val the new value for the specific part. 
	 */
	public replaceStateAt(key:string,val:Immutable.Map<string,any>){
		this.state = this.state.set(key, val);
	}

	/**
	 * Deletes part of the application state at a given key.
	 * 
	 * @param {string} key the key to the part of state to delete. 
	 */
	public deleteStateAt(key:string){
		this.state = this.state.delete(key);
	}

	/**
	 * Applies the registered middlewares to an action. 
	 * 
	 * @param {Action} action 
	 * @returns {Action} the action that resulted from applying all the middleware functions.
	 */
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

	/**
	 * Disconnects a {ControllerView} from the application store. Three things happen here:
	 * 1. Delete the part of the state managed by the {ControllerView} component.
	 * 2. Remove the component's reducer function from the {Combiner}. 
	 * 3. Remove the component from the list of registered {ControllerView} components.
	 * 
	 * @param {ControllerView<any,any>} component 
	 */
	public disconnect(component:ControllerView<any,any>){
		let key = component.getStateKey();
		this.combiner.removeReducer(key);
		this.state = this.state.delete(key);
		let idx = this.components.indexOf(component);
		if (idx !== -1){
			this.components.splice(idx, 1);
		}
	}

	/**
	 * Called upon dispatching an Action within the application. The following happen here:
	 * 1. If the store is not in a ready state i.e. readyForActions is set to false, the action is added to the store's queue, and the function returns. 
	 * 2. If the store is ready, the previous state is set to the current state. 
	 * 3. The action is passed to the middlewares. 
	 * 4. If the result of applying the middlewares is null, the function returns. Otherwise, 
	 * 5. If the trackChanges flag is set to true, the action is pushed to the list of previous actions. 
	 * 6. The action is then passed to the combiner along with the current application state. 
	 * 7. The combiner executes all the registered reducer functions, and returns the new application state.
	 * 8. The store then loops through all the ControllerView components and only updates the ones that their state have changed. 
	 * 
	 * @param {Action} action (description)
	 * @returns {*} (description)
	 */
	public dispatch(action: Action): any {
		if (!this.readyForActions){
			this.queue.push(action);
			return;
		}
		this.prevState = this.state;
		let a: Action = this.applyMiddleware(action);
		if (a){
			if (this.trackChanges){
				this.prevActions.push(a);
			}
			let prevState = this.state,temp:any; 
			this.state = this.combiner.update(this.state, a);
			this.components.forEach(c => { 
				temp = this.state.get(c.getStateKey());
				if (Immutable.Map.isMap(temp)){
					if (temp && temp !== prevState.get(c.getStateKey())) {
						c.setState(temp.toObject());
					}
				}else {
					c.setState(temp);
				}
			});
		}
	}

	/**
	 * Sets the store to be ready to dispatch actions, and dispatches all actions that were added to the queue. 
	 */
	public ready():void{
		this.readyForActions = true;
		let a: Action;
		while((a = this.queue.shift())){
			this.dispatch(a);
		}
	}

	/**
	 * A singleton refernece to the application's store. 
	 * 
	 * @static
	 * @type {Store}
	 */
	static singleton: Store;

	/**
	 * Creates an instance of the Store class. 
	 * 
	 * @static
	 * @param {*} initialState (description)
	 * @param {Combiner} combiner (description)
	 * @param {Array<Middleware>} [middleware] (description)
	 * @param {boolean} [trackChanges] (description)
	 * @param {boolean} [readiness] (description)
	 * @returns (description)
	 */
	static create(initialState: Immutable.Map<string,any>,
		combiner: Combiner,
		middleware?: Array<Middleware>,
		trackChanges?: boolean,
		readiness?:boolean) {
		return Store.singleton = new Store(initialState,
			combiner,
			middleware,
			trackChanges,
			readiness); 
	}
}