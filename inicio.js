import React, { Component } from 'react';
import { View, Text, Navigator, AppRegistry, AsyncStorage,StyleSheet, TouchableOpacity} from 'react-native';
import MyButton from './src/js/components/MyButton';

var PartidaScene = require('./partida');

var IndexScene = React.createClass({ 
	loadData: function(){
    	AsyncStorage.getItem("Turno")
  		.then( (value) =>
          	{
      		this.setState({Turno:value})
            return AsyncStorage.getItem("Moves")
          	}
    	)	
    	.then( (value) =>
          	{
  			return this.setState({Moves: value})
    		}
    	).done();
  	},
	render: function(){
		return ( 
			<View style={{flex: 1, margin: 10}}>
				<MyButton onPress={this.props.onForward} text={"Iniciar partida"} /> 
				<MyButton onPress={this.loadData} text={"Cargar partida"} /> 
			</View>
		) 
	}
});

module.exports = IndexScene;