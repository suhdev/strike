export interface InjectorContract{
	(...args:any[]):Function
	[idx:number]:[...string[],Function]
}
