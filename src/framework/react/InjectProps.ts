export function InjectPropsAndFreeze(props:any,state:any):any{
	for(let key in state){
		props[key] = state[key] || props[key]; 
	}
	return Object.freeze(props);
}