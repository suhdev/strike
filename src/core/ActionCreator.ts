import {Action} from './Action';
/**
 * A function that receives some inputs and returns an {Action}
 * 
 * @export
 * @interface ActionCreator
 */
export interface ActionCreator{
	(data:any):Action
}