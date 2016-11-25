import React, { Component } from 'react';
import { View, Text, AppRegistry, AsyncStorage,StyleSheet, TouchableOpacity} from 'react-native';

import MyButton from './src/js/components/MyButton';

var TresEnRayaStore = require('./src/js/stores/TresEnRayaStores');
const Cabecera = require('./src/js/components/Cabecera'); 
const Tablero = require('./src/js/components/Tablero');

var PartidaScene = React.createClass({ 
	saveData: function(){
    	AsyncStorage.setItem("Turno", TresEnRayaStore.getTurno());
    	alert("turno guardado");
    	//AsyncStorage.setItem("Moves", TresEnRayaStore.getMoves());
    	//AsyncStorage.setItem("v3", "vv3").then(this.appendMessage("v3 set")).done();
    	//AsyncStorage.setItem("v4", "vv4").then(this.appendMessage("v4 set")).done();
  	},
	reset: function(){
		TresEnRayaStore.reiniciar();
		this.setState(TresEnRayaStore.getValores());
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
			</View> 
		)
	} 
});

export default PartidaScene;