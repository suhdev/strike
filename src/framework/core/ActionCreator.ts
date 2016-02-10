import {Action} from './Action';
export interface ActionCreator{
	(data:any):Action
}