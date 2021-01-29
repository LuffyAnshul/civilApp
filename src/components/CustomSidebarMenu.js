import React from 'react';
import {View, Text, Alert, StyleSheet, Image} from 'react-native';

import {
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomSidebarMenu = (props) => {

	return (
		<View style={stylesSidebar.sideMenuContainer}>
			<View style={stylesSidebar.profileHeader}>
				<Image source={require('../assets/logo.png')} style={{ height: 100, width: 100 }} />
				<Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 17, fontWeight: 'bold' }}>
					Civil App
				</Text>
			</View>

			<DrawerContentScrollView {...props} >
				<DrawerItemList 
					{...props} 
					itemStyle={{
						borderBottomColor: '#fff',
						borderBottomWidth: 2
					}} 
					labelStyle={{
						fontSize: 17,
						color: '#fff'
					}}
				/>
				<DrawerItem
					label={({ color }) => 
						<Text style={{ color: '#fff' }}>
							Logout
						</Text>
					}
					onPress={() => {
						props.navigation.toggleDrawer();
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
									onPress: async() => {
										await AsyncStorage.setItem('isAuth', 'false');
										props.navigation.replace('Auth')
									},
								},
							],
							{cancelable: false},
						);
					}}
				/>
			</DrawerContentScrollView>
		</View>
	);
};

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
	sideMenuContainer: {
		width: '100%',
		height: '100%',
		paddingTop: 20,
	},
	profileHeader: {
		backgroundColor: '#fff',
		padding: 15,
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center'	
	},
});