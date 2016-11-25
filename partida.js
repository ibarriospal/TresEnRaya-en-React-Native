import React, { Component } from 'react';
import { View, ListView, Text, AppRegistry, AsyncStorage,StyleSheet, TouchableOpacity} from 'react-native';
import MyButton from './src/js/components/MyButton';

var TresEnRayaStore = require('./src/js/stores/TresEnRayaStores');
var TresEnRayaActions = require('./src/js/actions/TresEnRayaActions');

const Cabecera = require('./src/js/components/Cabecera'); 
const Tablero = require('./src/js/components/Tablero');

var PartidaScene = React.createClass({ 
	_renderRow: function(move){
		var text = move.text;
		return (
			<View style = {{flexDirection: 'row', alignSelf:'center'}}>
				<Text style = {{fontSize: 16, textAlign: 'center'}}>{text}</Text>
			</View>
		)
	},
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
			<View style={{flex: 1, margin: 1, backgroundColor:'lightgoldenrodyellow'}}>
				<Cabecera texto={texto} style={{margin: 1}}/>
				<Tablero  style={{flex: 4}} valores={TresEnRayaStore.getValores()} ganador={TresEnRayaStore.getGanador()}/>
				<Cabecera texto={moves} />
				<MyButton style={{flex: 1}} onPress={this.props.onBack} text={"Volver"} />
				<MyButton onPress={this.reset} text={"Reiniciar"} />
				<MyButton onPress={this.saveData} text={"Guardar"} />
				<MyButton onPress={this.loadData} text={"Cargar"} />
				<ListView style={{flex: 2, backgroundColor: 'rosybrown'}} dataSource={TresEnRayaStore.getDs()} renderRow = {this._renderRow}/>
			</View>
		)
	} 
});

export default PartidaScene;