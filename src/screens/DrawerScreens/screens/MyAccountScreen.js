import React from 'react';
import { View, StyleSheet, SafeAreaView, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class MyAccountScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			userEmail: '',
			userDOB: '',
			userMobile: '',
			userImage: ''
		}
	}

	componentDidMount = async() => {
		await AsyncStorage.getItem('userName')
			.then((value) => this.setState({ userName: value }));
		await AsyncStorage.getItem('userEmail')
			.then((value) => this.setState({ userEmail: value }));
			await AsyncStorage.getItem('userDOB')
			.then((value) => this.setState({ userDOB: value }));
		await AsyncStorage.getItem('userMobile')
			.then((value) => this.setState({ userMobile: value }));
		await AsyncStorage.getItem('userImage')
			.then((value) => this.setState({ userImage: value }));

		console.log(this.state.userImage)
	}

	render() {
		return (
			<SafeAreaView >
				<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ marginHorizontal: 10 }} >
					<View style={styles.containerStyles}>
						{ this.state.userImage === '' || this.state.userImage === null  ?
							<Image 
								source={require('../../../assets/profile_defaults.png')} 
								style={{ height: 70, width: 70 }}
							/> : 
							<Image 
								source={{ uri: this.state.userImage }} 
								style={{ height: 100, width: 100, borderRadius: 20 }}
							/>
						}
					</View>

					{/* Name and Other Details */}
					<View style={styles.containerStyles}>
						<Text style={styles.detailsStyle} >User Details</Text>
						<TextInput
							mode="outlined"
							label="Name"
							value={this.state.userName ? this.state.userName : 'Name'}
							dense={true}
							editable={false}
							style={styles.textInputStyle}
						/>

						<TextInput
							mode="outlined"
							label="Email"
							value={this.state.userEmail ? this.state.userEmail : 'Email Address'}
							dense={true}
							editable={false}
							style={styles.textInputStyle}
						/>

						<TextInput
							mode="outlined"
							label="Date Of Birth"
							value={this.state.userDOB ? this.state.userDOB : 'Date Of Birth'}
							editable={false}
							dense={true}
							style={styles.textInputStyle}
						/>

						{/* Mobile Number */}
						<TextInput
							mode="outlined"
							label="Mobile No"
							value={this.state.userMobile ? this.state.userMobile : 'Mobile Number'}
							editable={false}
							dense={true}
							style={styles.textInputStyle}
						/>
					</View>

				</ScrollView>
			</SafeAreaView>
	
		);
	}
}

const styles = StyleSheet.create({
	containerStyles: {
		flex: 1, 
		alignItems: 'center', 
		marginTop: 20
	},
	detailsStyle: { 
		fontWeight: 'bold', 
		fontSize: 20, 
		textAlign: 'center', 
		marginTop: 20 
	},
	textInputStyle: { 
		width: '90%', 
		marginVertical: 10 
	},
});