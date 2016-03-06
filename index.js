"use strict";
const Combiner = require('./lib/core/Combiner').Combiner;
const Store = require('./lib/core/Store').Store;
const Promisify = require('./lib/middleware/PromisifyMiddleware').Promisify;
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
	ControllerView:ControllerView,
	extractArgumentsFromFunction:extractArgumentsFromFunction,
	getDataAt:getDataAt,
	setDataAt:setDataAt,
	format:format
};
