import {Component} from 'react'; 
import * as React from 'react';
import {Store} from '../core/Store';
import {InjectPropsAndFreeze} from './InjectProps';

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

	// setStoreInstance(store:Store){
	// 	this._storeInstance = store;
	// }

	// componentDidMount():void{
	// 	if (this.props.children){
	// 		if (this.props.children instanceof Array){
	// 			this.props.children.map((e) => { 
	// 				if (e instanceof ControllerView){
	// 					e.setStore(this._storeInstance);
	// 				}
	// 			});
	// 		}else{
	// 			if (this.props.children instanceof ControllerView){
	// 				this.props.children.setStore(this._storeInstance);
	// 			}
	// 		}
			
	// 	}
	// }
}