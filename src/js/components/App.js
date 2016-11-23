import React, { Component } from 'react'; 
import { View, Text} from 'react-native';

const Cabecera = require('./Cabecera');
const Tablero = require('./Tablero');

var TresEnRayaStore = require('../stores/TresEnRayaStores');

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
		return (
		<View style={{flex: 1, margin: 10}}>
			<Cabecera texto={texto}/>
			<Tablero valores={this.state.valores} ganador={this.state.ganador}/>
			<Text>Número de movimientos : {TresEnRayaStore.getMoves()}</Text>
		</View>
		)
	}
});

module.exports = App;