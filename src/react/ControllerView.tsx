import {Component} from 'react'; 
import * as React from 'react';
import {Store} from '../core/Store';
import {Reducer} from '../Core/Reducer';
import * as Immutable from 'immutable';  
export interface ControllerViewProps {
	store:Store;
}
export class ControllerView<T extends ControllerViewProps,V> extends Component<T,V> {
	_storeInstance: Store;
	_stateKey: string;
	_reducer:Reducer;
	constructor(props:T,stateKey:string,
		initialState:any,reducer:Reducer){
		super(props);
		this.props = props;
		this.state = initialState; 
		this._storeInstance = props.store; 
		this._stateKey = stateKey;
		this._reducer = reducer;
	}

	getReducer(){
		return this._reducer;
	}

	getStateKey():string{
		return this._stateKey;
	}

	componentDidMount():void{
		this._storeInstance.connect(this);
	}

	componentWillUnmount(){
		this._storeInstance.disconnect(this);
	}
}