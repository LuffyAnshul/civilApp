import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	SafeAreaView,
	KeyboardAvoidingView,
} from 'react-native';

import { TextInput } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LoginScreen extends Component {

	constructor(props) {
		super(props);
		this.emailRef = React.createRef();
		this.passwordRef = React.createRef();
		this.state = {
			userEmail: '',
			userPassword: '',
			errorText: 'Error in Value',
			actualEmail: '',
			actualPassword: '',
			navigation: this.props.navigation
		}
	}

	componentDidMount = async() => {
		await AsyncStorage.getItem('userEmail')
			.then((value) => this.setState({ actualEmail: value }));
		await AsyncStorage.getItem('userPassword')
			.then((value) => this.setState({ actualPassword: value }));
		
		// alert(this.state.actualEmail + ", " + this.state.actualPassword)
	}

	dataValidation = () => {
		
		let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
		let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

		if (emailRegex.test(this.state.userEmail)) {
			if (passwordRegex.test(this.state.userPassword)) {
				AsyncStorage.setItem('isAuth', 'true')

				if (this.state.actualEmail === this.state.userEmail && this.state.actualPassword === this.state.userPassword ) {
					return this.state.navigation.replace('MaterialBottomNavigation');
				} else {
					this.setState({ userEmail: '', userPassword: '', errorText: 'User not Registered' });
					return alert(this.state.errorText);
				}

				
			} else {
				this.setState({ userEmail: '', userPassword: '', errorText: 'Password is incorrect' });
				return alert(this.state.errorText);
			}
		} else {
			this.setState({ userEmail: '', userPassword: '', errorText: 'Email is incorrect' });
			return alert(this.state.errorText);
		}

 	}
	
	render(){
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} >
				<KeyboardAvoidingView style={{ flex: 1 }} >
					<View style={{ flex: 1, justifyContent: 'center' }} >
	
						<View style={styles.headingStyles} >
							<Text style={styles.title} >Welcome Back!</Text>
							<Text style={styles.subTitle} >Enter your credentials to continue</Text>
						</View>
						
						{/* Login Part */}
						<View style={{ flex: 3 }} >
							<ScrollView style={{ marginHorizontal: 20 }} showsVerticalScrollIndicator={false} >
								
								{/* Email Address */}
								<View>
									<TextInput
										mode="flat"
										label="Email"
										ref={this.emailRef}
										value={this.state.userEmail}
										style={styles.inputStyles}
										onChangeText={(userEmail) => this.setState({ userEmail })}
										placeholder="Enter Email" 
										keyboardType="email-address"
										returnKeyType="next"
										onSubmitEditing={() => this.passwordRef.current.focus()}
										blurOnSubmit={false}
									/>
								</View> 
								
								{/* Password */}
								<View>
									<TextInput
										mode="flat"
										label="Password"
										ref={this.passwordRef}
										value={this.state.userPassword}
										style={styles.inputStyles}
										onChangeText={ (userPassword) => this.setState({ userPassword })}
										secureTextEntry={true}
										placeholder="Enter Password"
										returnKeyType="done"
									/>
								</View>
								
								{/* Login Button */}
								<TouchableOpacity
									style={styles.buttonStyle}
									activeOpacity={0.5}
									onPress={this.dataValidation}>
									<Text>
										Login
									</Text>
								</TouchableOpacity>
								
							</ScrollView>
						</View>
	
						{/* Register Part */}
						<View style={{ marginHorizontal: 10 }} >
							<TouchableOpacity
								style={styles.registerButtonStyle}
								activeOpacity={0.5}
								onPress={() => {
									this.setState({ userEmail: '', userPassword: '', errorText: '' });
									this.state.navigation.navigate('RegisterScreen');
								}}
							>
								<Text style={{ textAlign: 'center', fontWeight: 'bold' }} >
									OPS... I DON'T HAVE AN ACCOUNT YET
								</Text>
							</TouchableOpacity>
						</View>
					
					</View>
				</KeyboardAvoidingView>
			
			</SafeAreaView>
		
		);
	}
};

const styles = StyleSheet.create({
	headingStyles: {
		flex: 2, 
		justifyContent: 'center',
		marginLeft: 30,	
	},
	title: {
		fontSize: 25,
		fontWeight: 'bold',
		marginVertical: 10
	},
	subTitle: {
		fontSize: 17,
		color: 'grey'
	},
	inputStyles: {
		marginVertical: 10,
		backgroundColor: '#38c9cd'
	},
	buttonStyle: {
		marginVertical: 20,
		padding: 20,
		backgroundColor: 'lightcyan',
		borderRadius: 30
	},
	registerButtonStyle: {
		backgroundColor: '#fff',
		borderWidth: 2,
		borderRadius: 30,
		borderColor: '#babcbe',
		paddingVertical: 15
	}
});