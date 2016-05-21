import {Middleware} from '../core/Middleware';
import {PromiseAction, Action} from '../core/Action';
import {Store} from '../core/Store';

export interface WorkerAction extends Action {
	isWorker: boolean;
}
export function WorkerMiddleware(worker: Worker, store: Store):Middleware {
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