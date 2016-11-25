import React, { Component } from 'react';
import { View, Text, Navigator, AppRegistry, AsyncStorage,StyleSheet, TouchableOpacity} from 'react-native';
import MyButton from './src/js/components/MyButton';

var PartidaScene = require('./partida');
var TresEnRayaActions = require('./src/js/actions/TresEnRayaActions');

var IndexScene = React.createClass({ 
	render: function(){
		return ( 
			<View style={{flex: 1, margin: 10}}>
				<MyButton onPress={this.props.onForward} text={"Iniciar partida"} /> 
			</View>
		) 
	}
});

module.exports = IndexScene;