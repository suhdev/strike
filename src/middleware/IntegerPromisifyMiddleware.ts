import {Middleware} from '../core/Middleware';
import {PromiseAction, Action} from '../core/Action';
import {Store} from '../core/Store';

export const PROMISE_FETCHING = 0x1000000;
export const PROMISE_RESOLVED = 0x2000000;
export const PROMISE_REJECTED = 0x4000000;
export const PROMISE_NOTIFY = 0x8000000;
export function IntegerPromisify<T>(action: PromiseAction<T>, store: Store): Action {
	if (typeof action.promise === "undefined") {
		return action;
	}
	action.promise.then(function(data: T) {
		store.dispatch({
			type: PROMISE_RESOLVED | <number>action.type,
			data: data
		});
	}, function(data: any) {
		store.dispatch({
			type: PROMISE_REJECTED | <number>action.type,
			data: data
		})
	}, function(data: any) {
		store.dispatch({
			type: PROMISE_NOTIFY | <number>action.type,
			data: data
		});
	});
	return {
		type: PROMISE_FETCHING | <number>action.type,
		data: action.data
	};
}