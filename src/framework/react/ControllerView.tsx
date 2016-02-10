import {Component} from 'react'; 
import * as React from 'react';
import {Store} from '../core/Store';
import {InjectPropsAndFreeze} from './InjectProps';

export class ControllerView extends Component<any,any> {
	constructor(props:any){
		super(props);
		this.props = props;
		this.state = {}; 
	}

	passPropsToChildren():void{
		let children = this.props.children,
			i=0,
			props:any,
			key:string,
			store:Store = this.props.store,
			child:any; 
		//check if component has no children, then bail early 
		if (!children){
			return; 
		}
		children = children instanceof Array ? children : [children];
		for (i = 0; i < children.length;i++){
			child = children[i]; 
			// if ((key = child.getAppStateKey && child.getAppStateKey())){
			if ((key = child.props.appStateKey)){
				props = Object.assign({},child.props); 
				child.props = InjectPropsAndFreeze(props, store.getStateAt(key));
			}		
		}
	}
}