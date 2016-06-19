import {Middleware} from '../core/Middleware';
import {PromiseAction, Action} from '../core/Action';
import {Store} from '../core/Store';

/**
 * (description)
 * 
 * @export
 * @interface WorkerAction
 * @extends {Action}
 */
export interface WorkerAction extends Action {
	/**
	 * (description)
	 * 
	 * @type {boolean}
	 */
	isWorker: boolean;
}
/**
 * (description)
 * 
 * @export
 * @param {Worker} worker (description)
 * @param {Store} store (description)
 * @returns {Middleware} (description)
 */
export function WorkerMiddleware(worker: Worker, store: Store):Middleware {
	/**
	 * (description)
	 * 
	 * @param {*} e (description)
	 */
	worker.onmessage = function(e: any) {
		let action = e.data;
		store.dispatch(action);
	};

	return function(action: WorkerAction, store: Store) {
		if (!action.isWorker) {
			return action;
		}
		worker.postMessage(action);
		return null;
	}
}