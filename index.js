export const Combiner = require('./lib/core/Combiner');
export const Store = require('./lib/core/Store');
export const Promisify = require('./lib/middleware/PromisifyMiddleware');
export const ControllerView = require('./lib/react/ControllerView'); 
module.exports = {
	Combiner:Combiner,
	Store:Store,
	Promisify:Promisify,
	ControllerView:ControllerView
};
