import React, { Component } from 'react'; 
import { View, Text, Navigator, AppRegistry, AsyncStorage,StyleSheet, TouchableOpacity} from 'react-native';

const Cabecera = require('./Cabecera');
const Tablero = require('./Tablero');

var TresEnRayaStore = require('../stores/TresEnRayaStores');

import IndexScene from '../../../inicio'; 
import PartidaScene from '../../../partida';

function getAppStateFromStore() {
	return {
		turno: TresEnRayaStore.getTurno(),
		valores: TresEnRayaStore.getValores(),
		ganador: TresEnRayaStore.getGanador(),
		empate: TresEnRayaStore.getEmpate(),
		moves: TresEnRayaStore.getMoves()
	};
}

var App = React.createClass({
	onComponentMount : function(){
  	
	},
  	getInitialState: function(){
	  	return ({
	      Turno: '',
	      Moves: '',
	      outputMessage: '',
	    });
	},
  	appendMessage: function(newMessage){
    	var currentMessage = this.state.outputMessage;
    	this.setState({
    		outputMessage : this.state.outputMessage + "-" + newMessage
    	});
  	},
	getInitialState: function(){
		return getAppStateFromStore()
	},
	componentDidMount() { 
		TresEnRayaStore.addChangeListener(this._onChange);
  	},
  	componentWillUnmount() {
		TresEnRayaStore.removeChangeListener(this._onChange); 
	},
	_onChange: function() { 
		this.setState(TresEnRayaStore.getValores());
		if(getAppStateFromStore().ganador === true){
			alert("Ha ganado el " + TresEnRayaStore.getTurno()); 			
 		}
 		else if(getAppStateFromStore().empate === true){
 			alert("¡EMPATE!");
 		}
  	},
	render: function () {
		var texto = "Turno del " + TresEnRayaStore.getTurno();
		const routes = [
			{title: 'Index', index: 0},
			{title: 'Partida', index: 1}, 
		];
		return (
		<Navigator
			initialRoute={routes[0]} 
			initialRouteStack={routes} 
			renderScene={(route, navigator) => {
				var onForward = function(){
					const nextIndex = route.index + 1; 
					if(typeof routes[nextIndex] == "object"){
						navigator.push(routes[nextIndex]) 
					}
				}
				var onBack = function(){
					if (route.index = 1){ 
						navigator.pop();
					} 
				}
				var onSave = function(){ 
					if (route.index = 1){ 
						this.saveData;
						alert("SAVE"); 
					}
				}
				var onLoad = function(){
					const nextIndex = route.index + 1; 
					if(typeof routes[nextIndex] == "object"){
						this.loadData;
						this.setState(TresEnRayaStore.getValores());
						alert("LOAD"); 
					}
				}
				switch(route.index){ 
					case 0:
						return <IndexScene onForward={onForward} onBack={onBack} onLoad={onLoad} /> 
					case 1:
						return <PartidaScene onForward={onForward} onBack={onBack} onSave={onSave} onLoad={onLoad}/> 
				}
			}} 
		/>
		)
	}
});

module.exports = App;