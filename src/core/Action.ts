import {Store} from './Store';
export interface Action{
	type:string|number, 
	data?:any
}

export interface PromiseAction<T> extends Action{
	promise: Promise<T>;
} 

export interface ServiceFunction {
	(store: Store, ...args: any[]): Action;
}

export interface ServiceAction extends Action {
	service: ServiceFunction; 
}