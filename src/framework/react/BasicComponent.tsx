import {Component} from 'react';
import * as React from 'react'; 
export class BasicComponent<T,V> extends Component<T,V>{
	appStateKey: string;
	constructor(props:T,stateKey:string){
		super(props);
		this.appStateKey = stateKey; 
	}

	public getAppStateKey():string{
		return this.appStateKey;
	}

}