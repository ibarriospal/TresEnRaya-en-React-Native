import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

var MyButton = React.createClass({ 
	render: function(){
		return (
			<TouchableHighlight onPress={this.props.onPress}>
				<Text style={styles.mybutton}>{this.props.text}</Text> 
			</TouchableHighlight>
		) 
	}
});

const styles = StyleSheet.create({ 
	mybutton: {
		padding: 5,
		margin: 20,
		fontSize: 15, 
		backgroundColor: 'white', 
		color: 'black', 
		borderWidth:1, 
		borderColor: 'black'
	} 
});

export default MyButton;