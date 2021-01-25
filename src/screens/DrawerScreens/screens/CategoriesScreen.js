import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default class CategoriesScreen extends React.Component {
	render() {
		return (
			<SafeAreaView style={{flex: 1}}>
				<View style={{flex: 1, padding: 16}}>
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 16 }}>
							This is the Categories Screen
						</Text>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
});