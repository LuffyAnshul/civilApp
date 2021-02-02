import React from 'react';

// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Import Add Tab Screens
import AddScreen from './DrawerScreens/screens/AddScreen';
import AddCategoryScreen from './DrawerScreens/screens/AddCategoryScreen';
import AddSubCategoryScreen from './DrawerScreens/screens/AddSubCategoryScreen';
import AddProductScreen from './DrawerScreens/screens/AddProductScreen';

// Import Products Tab Screens
import CategoriesScreen from './DrawerScreens/screens/CategoriesScreen';
import SubCategoriesScreen from './DrawerScreens/screens/SubCategoriesScreen';
import ProductsScreen from './DrawerScreens/screens/ProductsScreen';
import EditCategoryScreen from './DrawerScreens/screens/editData/editCategory';
import EditSubCategoryScreen from './DrawerScreens/screens/editData/editSubCategory';
import EditProductScreen from './DrawerScreens/screens/editData/editProduct';

// Import Settings Screens
import SettingsScreen from './DrawerScreens/screens/SettingsScreen';
import HelpSupportScreen from './DrawerScreens/screens/HelpSupportScreen';
import MyAccountScreen from './DrawerScreens/screens/MyAccountScreen';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function AddCategorySubCategoryTab () {
	return (
		<Stack.Navigator
			initialRouteName="AddScreen"
			screenOptions={{
				headerStyle: { backgroundColor: '#000' },
				headerTintColor: '#fff',
				headerTitleAlign: 'center',
				headerTitleStyle: { fontWeight: 'bold' }
			}}
		>
			<Stack.Screen
				name="AddScreen"
				component={AddScreen}
				options={{ title: 'Add Screen' }}/>
			<Stack.Screen
				name="AddCategoryScreen"
				component={AddCategoryScreen}
				options={{ title: 'Add Category' }}/>
			<Stack.Screen
				name="AddSubCategoryScreen"
				component={AddSubCategoryScreen}
				options={{ title: 'Add Sub-Category' }} />
			<Stack.Screen
				name="AddProductScreen"
				component={AddProductScreen}
				options={{ title: 'Add Product' }} />
		</Stack.Navigator>
	);
}

function ProductsTab () {
	return (
		<Stack.Navigator
			initialRouteName="CategoriesScreen"
			screenOptions={{
				headerStyle: { backgroundColor: '#000' },
				headerTintColor: '#fff',
				headerTitleStyle: { fontWeight: 'bold' }
			}}
		>
			<Stack.Screen
				name="CategoriesScreen"
				component={CategoriesScreen}
				options={{ title: 'Category Screen' }}/>
			<Stack.Screen
				name="EditCategoryScreen"
				component={EditCategoryScreen}
				options={{ title: 'Edit Category Screen' }} />
			<Stack.Screen
				name="SubCategoriesScreen"
				component={SubCategoriesScreen}
				options={{ title: 'Sub-Category Screen' }}/>
			<Stack.Screen
				name="EditSubCategoryScreen"
				component={EditSubCategoryScreen}
				options={{ title: 'Edit Sub Category Screen' }} />
			<Stack.Screen
				name="ProductsScreen"
				component={ProductsScreen}
				options={{ title: 'Products Screen' }} />
			<Stack.Screen
				name="EditProductScreen"
				component={EditProductScreen}
				options={{ title: 'Edit Product Screen' }} />
		
		</Stack.Navigator>
	);
}

function SettingsTab () {
	return (
		<Stack.Navigator
			initialRouteName="SettingsScreen"
			screenOptions={{
				headerStyle: { backgroundColor: '#000' },
				headerTintColor: '#fff',
				headerTitleStyle: { fontWeight: 'bold' }
			}}
		>
			<Stack.Screen
				name="SettingsScreen"
				component={SettingsScreen}
				options={{ title: 'Settings' }}/>
			<Stack.Screen
				name="MyAccountScreen"
				component={MyAccountScreen}
				options={{ title: 'My Account' }}/>
			<Stack.Screen
				name="HelpSupportScreen"
				component={HelpSupportScreen}
				options={{ title: 'Help & Support' }} />
		</Stack.Navigator>
	);
}

function MaterialBottomNavigation () {
	return (
		<Tab.Navigator
			initialRouteName="ProductsTab"
			activeColor="#03a9f4"
			inactiveColor="#babcbe"
			barStyle={{ backgroundColor: '#000' }}
			shifting={true}
		>
			<Tab.Screen
				name="AddCategorySubCategoryTab"
				component={AddCategorySubCategoryTab}
				
				options={{
					tabBarLabel: 'Add New',
					tabBarIcon: ({ color }) => (
						<MaterialIcons
							name="add-to-photos"
							color={color}
							size={26}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="ProductsTab"
				component={ProductsTab}
				options={{
					tabBarLabel: 'Products',
					tabBarIcon: ({ color }) => (
						<MaterialIcons
							name="add-business"
							color={color}
							size={26}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="SettingsTab"
				component={SettingsTab}
				options={{
					tabBarLabel: 'Settings',
					tabBarIcon: ({ color }) => (
						<MaterialIcons
							name="settings"
							color={color}
							size={26}
						/>
					),
				}}
			/>

		</Tab.Navigator>
	);
}


export default MaterialBottomNavigation;