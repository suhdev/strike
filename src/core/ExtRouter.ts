import * as React from 'react'; 
import * as ReactDOM from 'react-dom'; 
import {Dictionary} from './Util'; 
import {Store} from './Store'; 
const TYPES_TO_REGEX:Dictionary<string> = {
    "number":'([0-9]+)',
    "string":'([\S]+)',
    "boolean":'(true|false|TRUE|FALSE)',
}
function parseRoute(route:string){
    let routeParams:string[][] = []; 
    route.replace(/:([\S]+):(number|string|boolean)/g,(e,k,v)=>{
        routeParams.push([k,v]); 
        return TYPES_TO_REGEX[v];
    }).replace(/:([\S]+)/g,(e,k)=>{
        routeParams.push([k,"string"]); 
        return TYPES_TO_REGEX["string"]; 
    });
}
interface ExtRouterOptions{
    onChangeActionType:number;
}
export class ExtRouter {
    _el:HTMLElement; 
    _store:Store; 
    constructor(el:HTMLElement,store:Store,opts:ExtRouterOptions){
        this._el = el; 
        this._store = store; 

    }

    addRule(rule:string,reactClass:React.ComponentClass<any>){

        React.createElement()

    }




}