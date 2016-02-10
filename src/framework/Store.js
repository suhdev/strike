import Events from './Events';
import functionTest from './Util'; 

var Store = Events.extend({
	initialize(initialState={}){
		this.state = initialState;
		this.reducers = {}; 
		this.middleware = [];
	},
	addMiddleware(fn){
		functionTest(fn);
		this.middleware.push(fn); 
	},
	removeMiddleware(fn){
		functionTest(fn); 
		var idx = this.middleware.indexOf(fn); 
		idx !== -1 && this.middleware.splice(idx,1);
	},
	addReducer(fn){
		functionTest(fn);
		this.reducers[fn.name] = fn; 
	},
	removeReducer(fn){
		delete this.reducers[fn.name]; 
	},
	dispatch(action){
		var key,r,
			prevState = this.state, 
			newState = Object.assign({},prevState),
			reducers = this.reducers; 
		for(key in reducers){
			newState[key] = reducers[key](prevState[key]);
		}

	}

});

export default Store; 