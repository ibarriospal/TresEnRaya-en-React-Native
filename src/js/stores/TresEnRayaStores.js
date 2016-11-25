const EventEmitter = require('events').EventEmitter;

var TresEnRayaDispatcher = require('../dispatchers/TresEnRayaDispatcher');
var Constants = require('../constants/TresEnRayaConstants');

var turno = Constants.JUGADORX;
var valoresTablero = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
var ganador = false;
var empate = false;
var moves = 0;

var turno1 = Constants.JUGADORX;
var valoresTablero1 = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
var ganador1 = false;
var empate1 = false;
var moves1 = 0;

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
 			moves: moves
 		);
 	},
 	setState(ganador,empate,moves) {
 		//turno = turno;
 		//valoresTablero = valoresTablero;
 		ganador = ganador;
 		empate = empate;
 		moves = moves;
 	},
 	reiniciar() {
 		turno = Constants.JUGADORX;
		valoresTablero = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
		ganador = false;
		empate = false;
		moves = 0;
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
 			TresEnRayaStore.emitChange();
			break;
		case Constants.ActionTypes.REINICIAR_JUEGO:
		    turno = Constants.JUGADORX;
		    ganador = false;
		    empate = false;
		    valoresTablero = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
		    moves = 0;
		    TresEnRayaStore.emitChange();
		    break;
 	}
});

module.exports = TresEnRayaStore;
