interface Action{
	type:string,
	data:any
}

interface Reducer{
	(state:any,action:Action):any
}
