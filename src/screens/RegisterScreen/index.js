import React, { Component } from "react";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	ScrollView,
	View,
	Image
} from "react-native";

import { TextInput } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class RegisterScreen extends Component {
	constructor(props){
		super(props);
		this.nameRef = React.createRef();
		this.emailRef = React.createRef();
		this.passwordRef = React.createRef();
		this.confirmPasswordRef = React.createRef();
		this.mobileRef = React.createRef();
		this.bdateRef = React.createRef();
        this.state = {
			imageURI: '',
			name: '',
			email: '',
			mobile: '',
			bdate: '',
			password: '',
			confirmPassword: '',
			error: '',
			emailError: false,
			mobileError: false,
			passwordError: false,
			confirmPasswordError: false,
			navigation: this.props.navigation
		}
	}

	showData = async() => {
		let { name, email, mobile, password, confirmPassword, bdate, imageURI } = this.state;

		let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
		let phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;

		if (emailRegex.test(email)) {
			this.setState({ mobileError: false })
			if (phoneRegex.test(mobile)) {
				this.setState({ mobileError: false })
				if (passwordRegex.test(password)) {
					this.setState({ passwordError: true })
					if (password === confirmPassword) {
						this.setState({ passwordError: false, confirmPasswordError: false })
						
						await AsyncStorage.setItem('userName', name)
						await AsyncStorage.setItem('userEmail', email)
						await AsyncStorage.setItem('userPassword', password)
						await AsyncStorage.setItem('userMobile', mobile)
						await AsyncStorage.setItem('userDOB', bdate);
						await AsyncStorage.setItem('userImage', imageURI);
						await AsyncStorage.setItem('isAuth', 'true')
						
						return this.state.navigation.replace('DrawerNavigationRoutes');
					}
				}
				this.setState({ password: '', confirmPassword: '', passwordError: true, confirmPasswordError: true })
				return alert('Password Not Matching');
			}
			this.setState({ mobile: '', mobileError: true })
			return alert('Mobile Number Incorrect');
		}

		this.setState({ emailError: true })

		return alert('Email Incorrect');
	}

	selectProfilePhoto() {
		ImagePicker.openCamera({
			width: 300,
			height: 400,
			cropping: true,
		}).then(image => {
			// console.log(image);
			this.setState({ imageURI: image.path })
		});

		return null;
	}

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: 'cyan' }} >
				<ScrollView style={{ margin: 15, borderRadius: 30, backgroundColor: '#fff' }} showsVerticalScrollIndicator={false} >
					<View style={{ marginTop: 20, marginLeft: 20 }} >
						<Text style={styles.heading}>Hello!</Text>
						<Text style={styles.heading}>SignUp To</Text>
						<Text style={styles.heading}>Get Started</Text>
					</View>
				
					<View style={styles.imageStruct}>
						<TouchableOpacity onPress={() => this.selectProfilePhoto()} >
							{ this.state.imageURI === '' ?
								<Image source={require('../../assets/icon.png')} style={styles.userImage} />
								:
								<Image source={{ uri: this.state.imageURI }} style={styles.userImage} />
							}
						</TouchableOpacity>
						<Text style={{ fontWeight: 'bold' }} >(Select Photo)</Text>
					</View>

					{/* Name */}
					<View style={styles.details}>
						<TextInput
							mode="outlined"
							label="Name"
							placeholder="Name" 
							returnKeyType="next"
							blurOnSubmit={false}
							ref={this.nameRef}
							value={this.state.name}
							onChangeText={ (name) => this.setState({ name })}
							onSubmitEditing={() => this.emailRef.current.focus()}
							style={styles.inputStyles}
						/>
					</View>
					
					{/* Email Address */}
					<View style={styles.details}>
						<TextInput
							mode="outlined"
							label="Email Address"
							placeholder="Email Address"
							returnKeyType="next"
							blurOnSubmit={false}
							error={this.state.emailError}
							ref={this.emailRef}
							value={this.state.email}
							onChangeText={ (email) => this.setState({ email })} 
							onSubmitEditing={() => this.passwordRef.current.focus()}
							style={styles.inputStyles}
						/>
					</View>

					{/* Password */}
					<View style={styles.details}>
						<TextInput
							mode="outlined"
							label="Password"
							placeholder="Password"
							returnKeyType="next"
							blurOnSubmit={false}
							error={this.state.passwordError}
							ref={this.passwordRef}
							value={this.state.password}
							secureTextEntry={true}
							onChangeText={ (password) => this.setState({ password })} 
							onSubmitEditing={() => this.confirmPasswordRef.current.focus()}
							style={styles.inputStyles}
						/>
					</View>

					{/* Confirm Password */}
					<View style={styles.details}>
						<TextInput
							mode="outlined"
							label="Confirm Password"
							placeholder="Confirm Password"
							returnKeyType="next"
							blurOnSubmit={false}
							error={this.state.confirmPasswordError}
							ref={this.confirmPasswordRef}
							value={this.state.confirmPassword}
							secureTextEntry={true}
							onChangeText={ (confirmPassword) => this.setState({ confirmPassword })} 
							onSubmitEditing={() => this.mobileRef.current.focus()}
							style={styles.inputStyles}
						/>
					</View>
					
					{/* Mobile */}
					<View style={styles.details}>
						<TextInput
							mode="outlined"
							label="Phone Number"
							returnKeyType="next"
							placeholder="Phone Number" 
							keyboardType="phone-pad"
							blurOnSubmit={false}
							maxLength={10}
							error={this.state.mobileError}
							ref={this.mobileRef}
							value={this.state.mobile}
							onChangeText={ (mobile) => this.setState({ mobile })}
							onSubmitEditing={() => this.bdateRef.current.focus()}
							style={styles.inputStyles}
						/>
					</View>
				
					{/* Date of Birth */}
					<View style={styles.details}>
						<TextInput
							mode="outlined"
							label="Date of Birth"
							placeholder="DD-MM-YYYY"
							keyboardType="numeric"
							returnKeyType="done"
							ref={this.bdateRef}
							value={this.state.bdate}
							onChangeText={ (bdate) => {
								let bdateUpdate = bdate;
								if (bdate.length === 2 || bdate.length === 5) {
									bdateUpdate = bdateUpdate + '-';
								}
								this.setState({ bdate: bdateUpdate })
							}}
							style={styles.inputStyles}
							maxLength={10}
						/>
					</View>

					<View style={{ marginHorizontal: 30, marginTop: 20 }} >
						<TouchableOpacity  onPress={() => this.showData()} style={{ paddingVertical: 15, backgroundColor: '#000', paddingHorizontal: 20, borderRadius: 20 }} >
							<Text style={{ textAlign: 'center', color: '#fff' }} >
								Submit
							</Text>
						</TouchableOpacity>
					</View>
			
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	heading: {
		fontSize: 30,
		fontWeight: 'bold',
		color: '#1B0F30',
		marginLeft: 20
	},
	imageStruct: { 
		justifyContent: 'center', 
		alignItems: 'center', 
		marginVertical: 20 
	},
	userImage: { 
		height: 100, 
		width: 100, 
		backgroundColor: '#0bc4d9', 
		borderRadius: 20,
		marginBottom: 5 
	},
	details: {
		padding: 10, 
	},
	inputStyles: {
		height: 40
	},
});
