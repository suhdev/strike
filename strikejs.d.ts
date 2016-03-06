///<reference path="typings/react.d.ts"/>

import {Component} from 'react';
declare module strikejs{
	interface Dictionary<V> {
		[arg: string]: V
	}
	export interface Action {
		type: string,
		data: any
	}

	export interface Middleware {
		(arg: Action, store: StoreInstance): Action
	}

	export interface PromiseAction<T> extends Action {
		promise: Promise<T>
	}
	export interface Reducer {
		(state: any, action: Action): any
		name: string
	}

	export interface Subscriber {
		onStateChanged(newState: any): void
	}

	export interface ControllerView extends Component<any, any> {
		_storeInstance: StoreInstance;
		_stateKey: string;
		new (props: any, stateKey: string): ControllerView;

		getStateKey(): string;

		componentDidMount(): void;
	}

	export interface StoreInstance {
		state: any;
		middleware: Array<Middleware>;
		subscribers: Array<Subscriber>;
		combiner: CombinerInstance;
		prevState: any;
		prevActions: Array<any>;
		components: ControllerView[];
		trackChanges: boolean;

		new (initialState: any,
			combiner: CombinerInstance,
			middleware: Array<Middleware>,
			trackChanges: boolean): StoreInstance;

		connect(elem: ControllerView):void;

		addMiddleware(fn: Middleware): void;

		removeMiddleware(fn: Middleware): void;

		prev(): void;

		subscribe(s: Subscriber): void;
		getStateAt(key: string): any;

		getState(): any;

		applyMiddleware(action: Action): Action;

		dispatch(action: Action): any ;
	}

	export interface Store{
		singleton: StoreInstance;
		create(initialState: any,
			combiner: CombinerInstance,
			middleware: Array<Middleware>,
			trackChanges: boolean): StoreInstance;

	}

	export interface CombinerInstance {
		//static combine(...args: Reducer[]):Combiner;
		reducers: Dictionary<Reducer>;
		new (...args: Reducer[]): CombinerInstance;

		addReducer(reducer: Reducer): void;
		addReducer(name: string, reducer: Reducer): void;
		addReducer(r: any): void;

		removeReducer(reducer: Reducer): void;
		removeReducer(name: string): void;
		removeReducer(r: any): void;

		update(state: any, action: Action):void;
	}

	export interface Combiner{
		combine(...args: Reducer[]): CombinerInstance;
	}
}