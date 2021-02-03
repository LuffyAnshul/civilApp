import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class SettingsScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			navigation: props.navigation,
			userImage: null,
			userName: null,
			userMobile: null
		}
	}

	async componentDidMount() {
		await AsyncStorage.getItem('userName')
			.then((value) => this.setState({ userName: value }));
		await AsyncStorage.getItem('userMobile')
			.then((value) => this.setState({ userMobile: value }));
		await AsyncStorage.getItem('userImage')
			.then((value) => this.setState({ userImage: value }));
	}

	render() {

		const { navigation } = this.state;

		return (
			<SafeAreaView style={{ flex: 1 }} >
				<ScrollView contentContainerStyle={{ flex: 1, paddingVertical: 30 }} >

					<View style={[styles.container, { alignItems: 'center' }]} >
						{ this.state.userImage === '../../../assets/profile_defaults.png' || this.state.userImage === null  ?
							<Image 
								source={require('../../../assets/profile_defaults.png')} 
								style={{ height: 70, width: 70 }}
							/> : 
							<Image 
								source={{ uri: this.state.userImage }} 
								style={{ height: 100, width: 100, borderRadius: 20 }}
							/>
						}
						<View style={{ marginVertical: 20 }} >
							<Text style={{ fontWeight: 'bold', fontSize: 20 }} >{this.state.userName}</Text>
							<Text style={{ fontWeight: '200', fontSize: 16, textAlign: 'center' }} >+91- {this.state.userMobile}</Text>
						</View>
					</View>

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
							onPress={() => navigation.navigate('HistoryScreen')} >
							<Text style={styles.tileText} >My History</Text>
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