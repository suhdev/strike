import {Middleware} from '../core/Middleware';
import {PromiseAction,Action} from '../core/Action';
import {Store} from '../core/Store';

export function Promisify<T>(action:PromiseAction<T>,store:Store):Action{
	if (typeof action.promise === "undefined"){
		return action;
	}
	action.promise.then(function(data:T) { 
		store.dispatch({
			type:'Resolved'+action.type,
			data:data
		});
	}, function(data:any) { 
		store.dispatch({
			type: 'Rejected' + action.type,
			data: data
		});
	});
	return {
		type: 'Fetching' + action.type,
		data: action.data
	};
}