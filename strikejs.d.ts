///<reference path="./typings/react.d.ts"/>

declare module "strikejs" {
	import {Component} from 'react';

	interface Dictionary<V> {
		[arg: string]: V
	}
	export interface Action {
		type: string|number,
		data: any
	}

	export const PROMISE_FETCHING:number;
	export const PROMISE_RESOLVED:number;
	export const PROMISE_REJECTED:number;
	export const PROMISE_NOTIFY:number;

	export interface WorkerAction extends Action {
		isWorker: boolean;
	}

	export interface Middleware {
		(arg: Action, store: Store): Action
	}

	export function Promisify(action: PromiseAction<any>, store: Store): Action;
	export function IntegerPromisify(action: PromiseAction<any>, store: Store): Action;
	export function WorkerMiddleware(worker: Worker, store: Store): Middleware;

	export function Injectable(injector: Injector): Middleware;

	export interface Initializer {
		startUp(): void;
	}

	export function extractArgumentsFromFunction(fn: Function): any;

	export function getDataAt(object: any, path: string, pathSep: string): any;

	export function setDataAt(object: any, path: string, value: any, pathSep: string): any;

	export function format(value: string, replacements: any): string;

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

	export interface ControllerViewProps {
		store: Store;
	}

	export class ControllerView<T extends ControllerViewProps,V> extends Component<T, V> {
		_storeInstance: Store;
		_stateKey: string;
		new(props: any, stateKey: string): ControllerView<T,V>;

		getStateKey(): string;

		componentDidMount(): void;
	}

	export interface ServiceFunction {
		(store: Store, ...args: any[]): Action;
	}

	export interface ServiceAction extends Action {
		service: ServiceFunction;
	}

	export class Store {
		state: any;
		middleware: Array<Middleware>;
		subscribers: Array<Subscriber>;
		combiner: Combiner;
		prevState: any;
		prevActions: Array<any>;
		components: ControllerView <any, any > [];
		trackChanges: boolean;
		readyForAction: boolean;
		queue: Action[];

		constructor(initialState: any,
			combiner: Combiner,
			middleware?: Array<Middleware>,
			trackChanges?: boolean,
			readiness?: boolean);

		new(initialState: any,
			combiner: Combiner,
			middleware?: Array<Middleware>,
			trackChanges?: boolean,
			readiness?:boolean): Store;

		replaceStateAt(key: string, val: any):void;

		deleteStateAt(key: string): void;

		connect<T extends ControllerViewProps>(elem: ControllerView<T,any>): void;

		addMiddleware(fn: Middleware): void;

		removeMiddleware(fn: Middleware): void;



		prev(): void;

		subscribe(s: Subscriber): void;
		getStateAt(key: string): any;

		getState(): any;

		ready():void

		applyMiddleware(action: Action): Action;

		dispatch(action: Action): any;
		static singleton: Store;
		static create(initialState: any,
			combiner: Combiner,
			middleware?: Array<Middleware>,
			trackChanges?: boolean,
			readiness?:boolean): Store;

	}

	export class Combiner {
		//static combine(...args: Reducer[]):Combiner;
		reducers: Dictionary<Reducer>;
		constructor(...args: Reducer[]);
		new(...args: Reducer[]): Combiner;

		addReducer(reducer: Reducer): void;
		addReducer(name: string, reducer: Reducer): void;
		addReducer(r: any): void;

		removeReducer(reducer: Reducer): void;
		removeReducer(name: string): void;
		removeReducer(r: any): void;

		update(state: any, action: Action): void;
		static combine(...args: Reducer[]): Combiner;
	}

	export class Injector {
		components: Dictionary<any>;
		instances: Dictionary<any>;
		private stack: Array<any>;
		constructor();
		new(): Injector;

		public addInstance(name: string, c: any): void;
		public addComponent(name: string, c: any): void;

		public hasComponent(name: string): boolean;

		public hasInstance(name: string): boolean;

		public injectFunction(fn: any, ctx: any, ...args: any[]): void;

		private _inject(name: string, c: any): any;

		public get(name: string): any;

		public register(name: string, o: Object): Injector;
		public register(name: string, n: number): Injector;
		public register(name: string, fn: Function): Injector;
		public register(name: string, array: Array<any>): Injector;
		public register(array: Array<any>): Injector;
		public register(): Injector;
	}

}