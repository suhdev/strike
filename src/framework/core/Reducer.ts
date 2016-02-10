export interface Reducer{
	(state:any,action:Action):any
	name:string
}