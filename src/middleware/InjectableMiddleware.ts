import {Middleware} from '../core/Middleware';
import {PromiseAction, Action, ServiceAction} from '../core/Action';
import {Store} from '../core/Store';
import {Injector} from '../core/Injector';

export function Injectable(injector:Injector):Middleware{
	return function (action:ServiceAction,store:Store):Action{
		if (typeof action.service === "undefined"){
			return action;
		}
		return injector.injectFunction(action.service);
	}
}