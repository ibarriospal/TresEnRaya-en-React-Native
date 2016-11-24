import React, { Component } from 'react';
import { View } from 'react-native';
import MyButton from './src/js/components/MyButton';

var TresEnRayaStore = require('./src/js/stores/TresEnRayaStores');
const Cabecera = require('./src/js/components/Cabecera'); 
const Tablero = require('./src/js/components/Tablero');

var PartidaScene = React.createClass({ 
	render: function(){
		var state = TresEnRayaStore.getState(); 
		var texto = "Turno del " + TresEnRayaStore.getTurno(); 
		return (
			<View style={{flex: 1, margin: 10}}>
				<Cabecera texto={texto}/>
				<Tablero valores={TresEnRayaStore.getValores()}/>
				<MyButton onPress={this.props.onBack} text={"Volver"} />
			</View> 
		)
	} 
});

export default PartidaScene;