import {BasicComponent} from '../BasicComponent'; 
import * as React from 'react';


export interface DialogProps {
	onCloseClick(event?:React.SyntheticEvent):void,
	onBackdropClick(event?:React.SyntheticEvent):void
	visible:boolean,
	children?:any,
	dialogType:string,
	dialogExtra?:string
}
/*
export class Dialog<V> extends BasicComponent<DialogProps,V> {
	constructor(props:DialogProps,appStateKey:string){
		super(props,appStateKey);
	}

	onBackdropClick(evt:React.SyntheticEvent){
		if (this.props.onBackdropClick && 
			typeof this.props.onBackdropClick === "function"){
			this.onBackdropClick(evt);
		}

	}

	onCloseClick(evt:React.SyntheticEvent){
		if(this.props.onCloseClick && 
			typeof this.props.onCloseClick === "function"){
			this.onCloseClick(evt);
		}
	}

	render(){
		return (
			<div className="of-dialog" data-visible={this.props.visible} data-type={this.props.dialogType} data-extra={this.props.dialogExtra}>
				<div className="backdrop" onClick={this.onBackdropClick.bind(this)}></div>
				<div className="of-dialog-container">
					<div className="close-btn" onClick={this.onCloseClick.bind(this)}></div>
					<div className="content-container">{this.props.children}</div>
				</div>
			</div>
			);
	}

	static defaultProps = {
		visible: false,
		dialogType: 'default',
		dialogExtra: ''
	};
}*/