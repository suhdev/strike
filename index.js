"use strict";
const Combiner = require('./lib/core/Combiner').Combiner;
const Store = require('./lib/core/Store').Store;
const Promisify = require('./lib/middleware/PromisifyMiddleware').Promisify;
const IntegerPromisify = require('./lib/middleware/IntegerPromisifyMiddleware').IntegerPromisify;
const Injectable = require('./lib/middleware/InjectableMiddleware').Injectable;
const WorkerMiddleware = require('./lib/middleware/WorkerMiddleware').WorkerMiddleware;
const ControllerView = require('./lib/react/ControllerView').ControllerView;
const Injector = require('./lib/core/Injector').Injector;
const Util = require('./lib/core/Util');
const extractArgumentsFromFunction = Util.extractArgumentsFromFunction;
const getDataAt = Util.getDataAt;
const setDataAt = Util.setDataAt;
const format = Util.format;  

module.exports = {
	Combiner:Combiner,
	Store:Store,
	Promisify:Promisify,
	Injectable:Injectable,
	Injector:Injector,
	IntegerPromisify:IntegerPromisify,
	WorkerMiddleware:WorkerMiddleware,
	ControllerView:ControllerView,
	extractArgumentsFromFunction:extractArgumentsFromFunction,
	getDataAt:getDataAt,
	setDataAt:setDataAt,
	format:format
};
