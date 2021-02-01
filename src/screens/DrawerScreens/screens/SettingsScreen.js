import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class SettingsScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			navigation: props.navigation
		}
	}

	render() {

		const { navigation } = this.state;

		return (
			<SafeAreaView style={{ flex: 1 }} >
				<ScrollView contentContainerStyle={{ flex: 1, paddingVertical: 30 }} >

					<View style={styles.container} >
						<TouchableOpacity 
							style={styles.tile}
							onPress={() => navigation.navigate('MyAccountScreen')} 
						>
							<Text style={styles.tileText} >My Account</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.container} >
						<TouchableOpacity 
							style={styles.tile}
							onPress={() => navigation.navigate('HelpSupportScreen')} >
							<Text style={styles.tileText} >Help & Support</Text>
						</TouchableOpacity>
					</View>

					<View style={[styles.container, { flex: 1, justifyContent: 'flex-end' }]} >
						<TouchableOpacity 
							style={[styles.tile, {backgroundColor: '#fff'}]}
							onPress={() => {
								Alert.alert(
									'Logout',
									'Are you sure? You want to logout?',
									[
										{
											text: 'Cancel',
											onPress: () => {
												return null;
											},
										},
										{
											text: 'Confirm',
											onPress: () => {
												AsyncStorage.setItem('isAuth', 'false')
												navigation.replace('Auth')
											},
										},
									],
									{ cancelable: false }
								);
							}}
						>
							<Text style={[styles.tileText, { color: 'red' }]} >Log Out</Text>
						</TouchableOpacity>
					</View>

				</ScrollView>
			</SafeAreaView>
		
		);
	}
}

const styles = StyleSheet.create({
	container: { 
		margin: 10, 
	},
	tile: { 
		paddingVertical: 10, 
		paddingHorizontal: 15, 
		borderRadius: 10, 
		backgroundColor: 'lightblue', 
		elevation: 15 
	},
	tileText: {
		fontSize: 20, 
		fontWeight: 'bold' 
	}
});