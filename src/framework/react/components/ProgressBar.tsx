import {BasicComponent} from '../BasicComponent'; 
import * as React from 'react';


export interface ProgressBarProps {
	progress:number,
	showPercentage:boolean
}

export class Dialog<V> extends BasicComponent<ProgressBarProps,V> {
	constructor(props:ProgressBarProps,appStateKey:string){
		super(props,appStateKey);
	}

	render(){
		return (
			<div className="of-progressbar" data-percentage={this.props.showPercentage}>
				<div className="of-progressbar-wrapper">
					<div className="of-text">{this.props.progress}</div>
				</div>
			</div>
			);
	}

	static defaultProps = {
		progress:0,
		showPercentage:false
	};
}