const EventEmitter = require('events').EventEmitter;

import { View, Text, ListView, Navigator, AsyncStorage} from 'react-native';

var TresEnRayaDispatcher = require('../dispatchers/TresEnRayaDispatcher');
var Constants = require('../constants/TresEnRayaConstants');

var turno = Constants.JUGADORX;
var valoresTablero = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
var ganador = false;
var empate = false;
var moves = 0;

var movement = "";
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

function checkWinner (values, nuevoValor) {
	//Compruebo filas
	var contador = 0;
	for (var x = 0; x < values.length; x++) {
		for (var y = 0; y < values[x].length; y++) {
			if(values[x][y] === nuevoValor){
				contador++;

			} else {
				contador = 0;
			}
		}
		if(contador === values.length) {
			console.log("fila");
			return true;}
	}
	contador = 0;
	x=0;
	y=0;
	
	//Compruebo columnas
	for (var j = 0; j < values[0].length; j++) {
		for (var i = 0; i < values.length; i++) {
			if(values[i][j] === nuevoValor){
				contador++;
			} else {
				contador = 0;
			}
		}
		if(contador === values.length) {
			console.log("columna");
			return true;}
	}
	contador = 0;
	i=0;
	j=0;
	//Compruebo diagonal
	for (var xy = 0; xy < values.length; xy++) {
			if(values[xy][xy] === nuevoValor){
				contador++;
				if(contador === 3) {
					console.log("diagonal");
					return true;}
			} else {
				contador=0;
			}
	}
	contador = 0;
	xy=0;
	//Compruebo diagonal opuesta
	for (var yx = 0; yx < values.length; yx++) {
			if(values[yx][values.length - yx -1] === nuevoValor){
				contador++;
				if(contador === values.length) {
					console.log("antidiagonal")
					return true;}
			} else {
				contador=0;
			}
	}
	contador=0;
	yx=0;
	
	return false;
}

function checkEmpate (values) {
	var contador = 0;
	for (var x = 0; x < values.length; x++) {
		for (var y = 0; y < values[x].length; y++) {
			if(values[x][y] !== '-'){
				contador++;
			} else {
				contador = 0;
			}
		}
	}
	if(contador === (values.length*values.length)) {return true;}

	return false;
}

var TresEnRayaStore = Object.assign({}, EventEmitter.prototype, {
	getTurno: function () {
 		return turno;
 	},
 	getValores: function () {
 		return valoresTablero;
 	},
    getGanador: function(){
      return ganador;
    },
    getEmpate: function(){
      return empate;
    },
    getMoves: function(){
      return moves;
	},
	getDs: function(){
		return ds;
	},
	getMovement: function(){
		return movement;
	},
 	addChangeListener(callback) {
 		this.on(Constants.CHANGE_EVENT, callback);
 	},
 	removeChangeListener(callback) {
 		this.removeListener(Constants.CHANGE_EVENT, callback);
 	},
 	emitChange() {
 		this.emit(Constants.CHANGE_EVENT);
 	},
 	getState() {
 		return (
 			turno: turno,
 			valoresTablero: valoresTablero,
 			ganador: ganador,
 			empate: empate,
 			moves: moves,
 			movement: movement,
 			ds: ds
 		);
 	},
 	setState(ganador,empate,moves) {
 		//turno = turno;
 		//valoresTablero = valoresTablero;
 		ganador = ganador;
 		empate = empate;
 		moves = moves;
 	}
});

TresEnRayaDispatcher.register(function(payload) {
	switch (payload.type) {
 		case Constants.ActionTypes.JUGAR_POSICION:
 			let nuevoValor = turno === Constants.JUGADORX ? 'X' : '0';
 			valoresTablero[payload.x][payload.y] = nuevoValor;
 			ganador = checkWinner(valoresTablero, nuevoValor);
 			empate = checkEmpate(valoresTablero);
 			if(ganador !== true && empate !== true){
 				turno = turno === Constants.JUGADORX ? Constants.JUGADOR0 : Constants.JUGADORX;
 			}
 			moves++;
 			movement = "El jugador de las " + nuevoValor + " seleccionó la casilla [" +payload.x +"," +payload.y+"].";
 			let movesDS = [];
			for(var i = 0; i<ds.getRowCount(); i++){
				movesDS.push(ds.getRowData(0,i));
			}
			movesDS.push({text: movement});
			ds= ds.cloneWithRows(movesDS);
 			TresEnRayaStore.emitChange();
			break;
		case Constants.ActionTypes.REINICIAR_JUEGO:
		    turno = Constants.JUGADORX;
		    ganador = false;
		    empate = false;
		    valoresTablero = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
		    moves = 0;
		   	ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		    TresEnRayaStore.emitChange();
		    break;
		case Constants.ActionTypes.SAVE_JUEGO:
				AsyncStorage.setItem("Turno", TresEnRayaStore.getTurno());
				AsyncStorage.setItem("Moves", JSON.stringify(TresEnRayaStore.getMoves()));
				AsyncStorage.setItem("Ganador", JSON.stringify(TresEnRayaStore.getGanador()));
				AsyncStorage.setItem("Empate", JSON.stringify(TresEnRayaStore.getEmpate()));
				AsyncStorage.setItem("Valores", JSON.stringify(TresEnRayaStore.getValores()));
			break;
		case Constants.ActionTypes.LOAD_JUEGO:
				AsyncStorage.getItem("Turno").then((value) =>
	          	{
	          		turno = JSON.parse(value);
	          		TresEnRayaStore.emitChange();
	            }
	       	)
    		AsyncStorage.getItem("Moves").then( (value) =>
	          	{
	          		moves = JSON.parse(value);
	          		TresEnRayaStore.emitChange();
	    		}
	    	)
    		AsyncStorage.getItem("Ganador").then( (value) =>
	          	{
	          		Ganador = JSON.parse(value);
	          		TresEnRayaStore.emitChange();
	    		}
	    	)
	    	AsyncStorage.getItem("Empate").then( (value) =>
	          	{
	          		Empate = JSON.parse(value);
	          		TresEnRayaStore.emitChange();
	    		}
	    	)
	    	AsyncStorage.getItem("Valores").then( (value) =>
	          	{
	          		valoresTablero = JSON.parse(value);
	          		TresEnRayaStore.emitChange();
	    		}
	    	)
			break;
 	}
});

module.exports = TresEnRayaStore;
