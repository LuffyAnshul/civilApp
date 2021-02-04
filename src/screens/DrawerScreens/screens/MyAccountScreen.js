import React from 'react';
import { View, StyleSheet, SafeAreaView, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';

export default class MyAccountScreen extends React.Component {

	constructor(props) {
		super(props);
		this.selectProfilePhoto = this.selectProfilePhoto.bind(this)
		this.state = {
			userName: '',
			userEmail: '',
			userDOB: '',
			userMobile: '',
			userImage: '',
			isEditable: false,
			toggleButton: false
		}
	}

	componentDidMount (){
		this._focusListener = this.props.navigation.addListener('focus', () => {
			this.getData();
		})	
	}

	componentWillUnmount() {
		this._focusListener();
	}

	async getData () {
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
	}

	selectProfilePhoto() {
		ImagePicker.openCamera({
			width: 300,
			height: 400,
			cropping: true,
		}).then(image => {
			this.setState({ userImage: image.path })
		});

		return null;
	}

	checkInfo = async() => {
		let { userName, userDOB, userMobile, userImage } = this.state;

		let phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;

		if (phoneRegex.test(userMobile)) {
			await AsyncStorage.setItem('userMobile', userMobile)
			await AsyncStorage.setItem('userName', userName)
			await AsyncStorage.setItem('userDOB', userDOB);
			if (userImage === null) {
				userImage = '../../../assets/profile_defaults.png'
				await AsyncStorage.setItem('userImage', userImage);
			} else {
				await AsyncStorage.setItem('userImage', userImage);
			}
		
			this.setState({ isEditable: false, toggleButton: false });

			return true;
		}		
	}

	render() {

		let { isEditable, toggleButton, userImage } = this.state;

		return (
			<SafeAreaView >
				<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ marginHorizontal: 10 }} >
					<View style={styles.containerStyles} pointerEvents={ !toggleButton ? 'none' : 'auto' } >
						<TouchableOpacity onPress={this.selectProfilePhoto} >
							{ userImage === '../../../assets/profile_defaults.png' || userImage === '' || userImage === null  ?
								<Image 
									source={require('../../../assets/profile_defaults.png')} 
									style={{ height: 70, width: 70 }}
								/> : 
								<Image 
									source={{ uri: userImage }} 
									style={{ height: 100, width: 100, borderRadius: 20 }}
								/>
							}
						</TouchableOpacity>
					</View>

					{/* Name and Other Details */}
					<View style={styles.containerStyles}>
						<Text style={styles.detailsStyle} >User Details</Text>

						{/* Name - Editable */}
						<TextInput
							mode="outlined"
							label="Name"
							value={this.state.userName ? this.state.userName : 'Name'}
							dense={true}
							editable={isEditable}
							onChangeText={(userName)  => this.setState({ userName })}
							style={[styles.textInputStyle, isEditable ? { backgroundColor: 'lightgreen' } : null]}
						/>

						{/* Email */}
						<TextInput
							mode="outlined"
							label="Email"
							value={this.state.userEmail ? this.state.userEmail : 'Email Address'}
							dense={true}
							editable={false}
							style={styles.textInputStyle}
						/>

						{/* DOB - Editable  */}
						<TextInput
							mode="outlined"
							label="Date Of Birth"
							value={this.state.userDOB ? this.state.userDOB : 'Date Of Birth'}
							editable={isEditable}
							onChangeText={(userDOB)  => this.setState({ userDOB })}
							dense={true}
							style={[styles.textInputStyle, isEditable ? { backgroundColor: 'lightgreen' } : null]}
						/>

						{/* Mobile Number - Editable */}
						<TextInput
							mode="outlined"
							label="Mobile No"
							value={this.state.userMobile ? this.state.userMobile : 'Mobile Number'}
							onChangeText={(userMobile)  => this.setState({ userMobile })}
							editable={isEditable}
							dense={true}
							style={[styles.textInputStyle, isEditable ? { backgroundColor: 'lightgreen' } : null]}
						/>
					</View>

					{/* Edit Details */}
					<View style={styles.containerStyles}>
						{ !toggleButton ?
							<TouchableOpacity 
								style={{ fontWeight: 'bold', backgroundColor: '#03a9f4', paddingHorizontal: 40, paddingVertical: 20, borderRadius: 10 }}
								onPress={() => this.setState({ isEditable: true, toggleButton: true })} 
							>
								<Text style={{ fontWeight: 'bold', fontSize: 17, color: '#fff' }} >Edit</Text>
							</TouchableOpacity>
							:
							<TouchableOpacity 
								style={{ fontWeight: 'bold', backgroundColor: '#03a9f4', paddingHorizontal: 40, paddingVertical: 20, borderRadius: 10 }}
								onPress={this.checkInfo} 
							>
								<Text style={{ fontWeight: 'bold', fontSize: 17, color: '#fff' }} >Submit</Text>
							</TouchableOpacity>
						}
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