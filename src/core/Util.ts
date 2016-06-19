"use strict";
/**
 * An interface representing an object literal 
 * 
 * @export
 * @interface Dictionary
 * @template V
 */
export interface Dictionary<V>{
	[arg:string]:V
}

/**
 * Extracts the names of the parameters from functions
 * 
 * @export
 * @param {Function} fn the function to extract its parameters' names.
 * @returns {Array<string>} array of parameters names  
 */
export function extractArgumentsFromFunction(fn: Function): any {
	let deps: any;
	fn.toString()
		.replace(/^function[\s]+?[\S]+?\((.*?)\)/, function(e: string, v: string, k: number) {
			deps = (v.trim().length > 0 && v.trim().split(/[\s,]+/)) || [];
			return e;
		})
	return deps;
}

/**
 * Returns value at a given key with in an object literal. 
 * 
 * @export
 * @param {*} object the object to use 
 * @param {string} path the path to return its value 
 * @param {string} p path separator, defaults to '.'
 * @returns {*} the value at the given key 
 */
export function getDataAt(object: any, path: string, p: string): any {
	let o: any = object,
		key: string,
		temp: any,
		pathSep: string = p ? p : '.',
		list: string[] = path.split(pathSep);
	while ((key = list.shift()) && (temp = o[key]) && (o = temp));
	return temp;
}

/**
 * (description)
 * 
 * @export
 * @param {*} object (description)
 * @param {string} path (description)
 * @param {*} value (description)
 * @param {string} p (description)
 * @returns {*} (description)
 */
export function setDataAt(object: any, path: string, value: any, p: string): any {
	let o: any = object,
		key: string,
		temp: any,
		pathSep: string = p ? p : '.',
		list: string[] = path.split(pathSep),
		lastKey: string = list.length > 0 ? list.splice(list.length - 1, 1)[0] : null;
	while ((key = list.shift()) && ((temp = o[key]) || (temp = o[key] = {})) && (o = temp));
	temp[lastKey] = value;
}

/**
 * (description)
 * 
 * @export
 * @param {string} value (description)
 * @param {*} replacements (description)
 * @returns {string} (description)
 */
export function format(value: string, replacements: any): string {
	if (!replacements) {
		return value;
	}
	return value.replace(/\{(.*?)\}/g, function(k, e) {
		return (replacements && replacements[e]) || k;
	});
}