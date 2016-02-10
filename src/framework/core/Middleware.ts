import {Action} from './Action';
export interface Middleware {
	(arg:any,next:Middleware):Action
}