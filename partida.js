import React, { Component } from 'react';
import { View, Text, AppRegistry, AsyncStorage,StyleSheet, TouchableOpacity} from 'react-native';
import MyButton from './src/js/components/MyButton';

var TresEnRayaStore = require('./src/js/stores/TresEnRayaStores');
var TresEnRayaActions = require('./src/js/actions/TresEnRayaActions');

const Cabecera = require('./src/js/components/Cabecera'); 
const Tablero = require('./src/js/components/Tablero');

var PartidaScene = React.createClass({ 
	saveData: function(){
    	TresEnRayaActions.saveJuego();
  	},
  	loadData: function(){
    	TresEnRayaActions.loadJuego();
  	},
	reset: function(){
		TresEnRayaActions.reiniciarJuego();
	},
	render: function(){
		var state = TresEnRayaStore.getState(); 
		var texto = "Turno del " + TresEnRayaStore.getTurno(); 
		var moves = "Movimientos: " + TresEnRayaStore.getMoves();
		return (
			<View style={{flex: 1, margin: 10}}>
				<Cabecera texto={texto}/>
				<Tablero valores={TresEnRayaStore.getValores()}/>
				<Cabecera texto={moves} />
				<MyButton onPress={this.props.onBack} text={"Volver"} />
				<MyButton onPress={this.reset} text={"Reiniciar"} />
				<MyButton onPress={this.saveData} text={"Guardar"} />
				<MyButton onPress={this.loadData} text={"Cargar"} />
			</View> 
		)
	} 
});

export default PartidaScene;