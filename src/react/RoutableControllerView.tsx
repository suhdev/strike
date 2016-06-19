import * as React from 'react'; 
import {Router} from '../Core/Router'; 
import {Store} from '../Core/Store'; 
import {Reducer} from '../Core/Reducer';
import {ControllerViewProps} from './ControllerView';

export interface RoutableControllerViewProps extends ControllerViewProps{
    router:Router;
}

export class RoutableControllerView<T extends RoutableControllerViewProps,V> extends React.Component<T,V>{
    _storeInstance: Store;
	_stateKey: string;
	_reducer:Reducer;
    _router:Router; 
	constructor(props:T,stateKey:string,
		initialState:any,reducer:Reducer){
		super(props);
		this.props = props;
		this.state = initialState; 
		this._storeInstance = props.store; 
		this._stateKey = stateKey;
		this._reducer = reducer;
        this._router = props.router; 
	}

    getStateKey(){
        return this._stateKey; 
    }

    getReducer(){
        return this._reducer; 
    }

    componentDidMount(){
        this._storeInstance.connect(this); 
    }

    componentWillUnmount(){
        this._storeInstance.disconnect(this); 
    }

}