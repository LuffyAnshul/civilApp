import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Import Drawer Screens
import DashboardScreen from './DrawerScreens/screens/DashboardScreen'
import HelpSupportScreen from './DrawerScreens/screens/HelpSupportScreen';
import MyAccountScreen from './DrawerScreens/screens/MyAccountScreen';
import CategoriesScreen from './DrawerScreens/screens/CategoriesScreen';
import TermsConditionScreen from './DrawerScreens/screens/TermsConditionScreen';

import CustomSidebarMenu from '../components/CustomSidebarMenu';
import NavigationDrawerHeader from '../components/NavigationDrawerHeader';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const dashboardScreenStack = ({ navigation }) => {
	return (
		<Stack.Navigator initialRouteName="DashboardScreen">
			<Stack.Screen
				name="DashboardScreen"
				component={DashboardScreen}
				options={{
					title: 'Dashboard', //Set Header Title
					headerLeft: () => (
						<NavigationDrawerHeader navigationProps={navigation} />
					),
					headerStyle: {
						backgroundColor: '#307ecc', //Set Header color
					},
					headerTintColor: '#fff', //Set Header text color
					headerTitleStyle: {
						fontWeight: 'bold', //Set Header text style
					},
				}}
			/>
		</Stack.Navigator>
	);
};

const helpSupportScreenStack = ({ navigation }) => {
	return (
		<Stack.Navigator initialRouteName="HelpSupportScreen">
			<Stack.Screen
				name="HelpSupportScreen"
				component={HelpSupportScreen}
				options={{
					title: 'Help And Support', //Set Header Title
					headerLeft: () => (
						<NavigationDrawerHeader navigationProps={navigation} />
					),
					headerStyle: {
						backgroundColor: '#307ecc', //Set Header color
					},
					headerTintColor: '#fff', //Set Header text color
					headerTitleStyle: {
						fontWeight: 'bold', //Set Header text style
					},
				}}
			/>
		</Stack.Navigator>
	);
};

const myAccountScreenStack = ({ navigation }) => {
	return (
		<Stack.Navigator initialRouteName="MyAccountScreen">
			<Stack.Screen
				name="MyAccountScreen"
				component={MyAccountScreen}
				options={{
					title: 'My Account', //Set Header Title
					headerLeft: () => (
						<NavigationDrawerHeader navigationProps={navigation} />
					),
					headerStyle: {
						backgroundColor: '#307ecc', //Set Header color
					},
					headerTintColor: '#fff', //Set Header text color
					headerTitleStyle: {
						fontWeight: 'bold', //Set Header text style
					},
				}}
			/>
		</Stack.Navigator>
	);
};

const termsConditionScreenStack = ({ navigation }) => {
	return (
		<Stack.Navigator initialRouteName="TermsConditionScreen">
			<Stack.Screen
				name="TermsConditionScreen"
				component={TermsConditionScreen}
				options={{
					title: 'Terms And Conditions', //Set Header Title
					headerLeft: () => (
						<NavigationDrawerHeader navigationProps={navigation} />
					),
					headerStyle: {
						backgroundColor: '#307ecc', //Set Header color
					},
					headerTintColor: '#fff', //Set Header text color
					headerTitleStyle: {
						fontWeight: 'bold', //Set Header text style
					},
				}}
			/>
		</Stack.Navigator>
	);
};

const categoriesScreenStack = ({ navigation }) => {
	return (
		<Stack.Navigator initialRouteName="CategoriesScreen" >
			<Stack.Screen
				name="CategoriesScreen"
				component={CategoriesScreen}
				options={{
					title: 'Categories', //Set Header Title
					headerLeft: () => (
						<NavigationDrawerHeader navigationProps={navigation} />
					),
					headerStyle: {
						backgroundColor: '#307ecc', //Set Header color
					},
					headerTintColor: '#fff', //Set Header text color
					headerTitleStyle: {
						fontWeight: 'bold', //Set Header text style
					},
				}}
			/>
		</Stack.Navigator>
	);
};

const DrawerNavigatorRoutes = (props) => {

	return (
		<Drawer.Navigator
			drawerContentOptions={{
				activeTintColor: '#fff',
				itemStyle: {marginVertical: 5, color: 'white'},
				labelStyle: {
					color: '#fff',
				},
				backgroundColor: 'red'
			}}
			initialRouteName="categoriesScreenStack"
			screenOptions={{headerShown: false}}
			drawerContent={CustomSidebarMenu}
		>
			<Drawer.Screen
				name="dashboardScreenStack"
				options={{ drawerLabel: 'Dashboard' }}
				component={dashboardScreenStack}
			/>
			<Drawer.Screen
				name="myAccountScreenStack"
				options={{drawerLabel: 'My Account'}}
				component={myAccountScreenStack}
			/>
			<Drawer.Screen
				name="helpSupportScreenStack"
				options={{drawerLabel: 'Help And Support'}}
				component={helpSupportScreenStack}
			/>
			<Drawer.Screen
				name="termsConditionScreenStack"
				options={{drawerLabel: 'Terms And Conditions'}}
				component={termsConditionScreenStack}
			/>
			<Drawer.Screen
				name="categoriesScreenStack"
				options={{drawerLabel: 'Categories'}}
				component={categoriesScreenStack}
			/>
		</Drawer.Navigator>
	);
};

export default DrawerNavigatorRoutes;