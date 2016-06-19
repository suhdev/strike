import {Store} from './Store';
/**
 * (description)
 * 
 * @export
 * @interface Route
 */
export interface Route{
    /**
     * (description)
     * 
     * @type {(Function|RegExp|string)}
     */
    rule:Function|RegExp|string;
    /**
     * (description)
     * 
     * @type {Function}
     */
    callback:Function; 
}

/**
 * (description)
 * 
 * @export
 * @interface RouteChangeHandler
 */
export interface RouteChangeHandler{
    /**
     * (description)
     * 
     * @param {string} oldRoute (description)
     * @param {string} newRoute (description)
     */
    onRouteChange(oldRoute:string,newRoute:string):void;
}

/**
 * (description)
 * 
 * @export
 * @interface RouterStrategy
 */
export interface RouterStrategy{
    /**
     * (description)
     * 
     * @param {string} path (description)
     */
    setPath(path:string):void; 
    /**
     * (description)
     * 
     * @param {RouteChangeHandler} handler (description)
     */
    setRouteChangeHandler(handler:RouteChangeHandler):void;
    /**
     * (description)
     * 
     * @param {Route} route (description)
     */
    addRoute(route:Route):void; 
    /**
     * (description)
     * 
     * @param {(Function|RegExp|string)} rule (description)
     * @param {Function} callback (description)
     */
    addRoute(rule:Function|RegExp|string,callback:Function):void;
}

/**
 * (description)
 * 
 * @export
 * @class HashRouteStrategy
 * @implements {RouterStrategy}
 */
export class HashRouteStrategy implements RouterStrategy{
    /**
     * (description)
     * 
     * @type {RouteChangeHandler}
     */
    _handler:RouteChangeHandler;
    /**
     * (description)
     * 
     * @type {Route[]}
     */
    _routes:Route[];
    /**
     * (description)
     * 
     * @type {string}
     */
    _prevPath:string;
    /**
     * (description)
     * 
     * @type {boolean}
     */
    _enabled:boolean;
    /**
     * Creates an instance of HashRouteStrategy.
     */
    constructor(){
        this._handler = null;
        this._enabled = true;
        this._onChange = this._onChange.bind(this);
        this._prevPath = location.hash.slice(1);  
        window.addEventListener('hashchange',this._onChange); 
    }

    /**
     * (description)
     * 
     * @param {string} path (description)
     */
    setPath(path:string){
        this._enabled = false;
        location.hash = path;
        this._enabled = true;
    }

    /**
     * (description)
     * 
     * @param {RouteChangeHandler} handler (description)
     */
    setRouteChangeHandler(handler:RouteChangeHandler){
        this._handler = handler;
    }

    /**
     * (description)
     */
    _onChange(){
        if (this._enabled){
            this._handler && this._handler.onRouteChange(this._prevPath,location.hash.slice(1))
            this._prevPath = location.hash.slice(1); 
        }
    }

    /**
     * (description)
     */
    addRoute():void{
        if (arguments.length >= 2){
            this._routes.push({
                rule:arguments[0],
                callback:arguments[1],
            });
        }else if (arguments.length > 0 && arguments[0].rule && arguments[1].callback){
            this._routes.push(arguments[0]); 
        }
    }
}

/**
 * (description)
 * 
 * @export
 * @class Router
 * @implements {RouteChangeHandler}
 */
export class Router implements RouteChangeHandler{
    /**
     * (description)
     * 
     * @type {RouterStrategy}
     */
    _strategy:RouterStrategy;
    /**
     * (description)
     * 
     * @type {(string|number)}
     */
    _actionType:string|number;
    /**
     * (description)
     * 
     * @type {Store}
     */
    _store:Store;
    /**
     * Creates an instance of Router.
     * 
     * @param {Store} store (description)
     * @param {(string|number)} changeActionType (description)
     */
    constructor(store:Store,changeActionType:string|number){
        this._strategy = null;
        this._actionType = changeActionType;
        this._store = store; 
    }

    /**
     * (description)
     * 
     * @param {RouterStrategy} strategy (description)
     */
    setStrategy(strategy:RouterStrategy){
        this._strategy = strategy;
    }

    /**
     * (description)
     * 
     * @param {string} oldPath (description)
     * @param {string} newPath (description)
     */
    onRouteChange(oldPath:string,newPath:string){
        this._store.dispatch({
            type:this._actionType,
            data:{
                oldUrl:oldPath,
                newUrl:newPath,
            }
        });
    }

    /**
     * (description)
     * 
     * @param {string} newPath (description)
     */
    setPath(newPath:string){
        this._strategy.setPath(newPath);
    }

    /**
     * (description)
     */
    addRoute(){
        this._strategy.addRoute.apply(this._strategy,Array.prototype.slice.call(arguments,0));
    }


    
}