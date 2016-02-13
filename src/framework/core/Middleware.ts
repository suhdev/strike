import {Action} from './Action';
import {Store} from './Store';
export interface Middleware {
	(arg:Action,store:Store):Action
}