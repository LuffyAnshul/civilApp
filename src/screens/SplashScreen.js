import React, {useState, useEffect} from 'react';
import {
	ActivityIndicator,
	View,
	StyleSheet,
	Image
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
	//State for ActivityIndicator animation
	const [animating, setAnimating] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setAnimating(false);
			//Check if user_id is set or not
			//If not then send for Authentication
			//else send to Home Screen
			AsyncStorage.getItem('isAuth').then((value) => {
				navigation.replace(
					value === null || value === 'false' ? 'Auth' : 'MaterialBottomNavigation'
				)
			});
		}, 500);
	}, []);

	return (
		<View style={styles.container}>
				<Image
					source={require('../assets/logo.png')}
					style={{width: '90%', resizeMode: 'contain', margin: 30}}
				/>
				<ActivityIndicator
					animating={animating}
					color="#FFFFFF"
					size="large"
					style={styles.activityIndicator}
				/>
		</View>
	);
};

export default SplashScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	activityIndicator: {
		alignItems: 'center',
		height: 80,
	},
});