import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';

const width = Dimensions.get('screen').width - 170;

export default class DashboardScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			navigation: props.navigation
		}
	}

	render() {

		return (
			<SafeAreaView style={{flex: 1}}>
				<View style={{flex: 1, padding: 16}}>
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 16 }}>
							This is the Dashboard Screen
						</Text>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
});