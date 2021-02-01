import 'react-native-gesture-handler';

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MaterialBottomNavigation from './src/screens/MaterialBottomNavigation';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const Auth = () => {
	return (
	<Stack.Navigator initialRouteName="LoginScreen">
		<Stack.Screen
			name="LoginScreen"
			component={LoginScreen}
			options={{ headerShown: false }}
		/>
		<Stack.Screen
			name="RegisterScreen"
			component={RegisterScreen}
			options={{ headerShown: false }}
		/>
	</Stack.Navigator>
	);
};

export default class App extends React.Component {

	constructor() {
		super();
		this.state = {
			isAuthenticated: 'false'
		}
	}

	componentDidMount() {
		let isAuth = AsyncStorage.getItem('isAuthenticated');
		this.setState({ isAuthenticated: isAuth });
	}

	render() {
		return(
			<NavigationContainer>
				<Stack.Navigator initialRouteName="SplashScreen">
					<Stack.Screen
						name="SplashScreen"
						component={SplashScreen}
						options={{headerShown: false}}
					/>
					<Stack.Screen
						name="Auth"
						component={Auth}
						options={{headerShown: false}}
					/>
					<Stack.Screen
						name="MaterialBottomNavigation"
						component={MaterialBottomNavigation}
						options={{headerShown: false}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
};