import {Component} from 'react'; 
import * as React from 'react';
import {Store} from '../core/Store';

export class ControllerView extends Component<any,any> {
	_storeInstance: Store;
	_stateKey: string;
	constructor(props:any,stateKey:string){
		super(props);
		this.props = props;
		this.state = {}; 
		this._storeInstance = props.store; 
		this._stateKey = stateKey;
	}

	getStateKey():string{
		return this._stateKey;
	}

	componentDidMount():void{
		this._storeInstance.connect(this);
	}
}