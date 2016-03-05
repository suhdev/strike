// import {Promise} from 'es6-promise';

export interface Action{
	type:string, 
	data:any
}

export interface PromiseAction<T> extends Action{
	promise:Promise<T>
}