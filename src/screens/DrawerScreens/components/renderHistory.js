import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Animated, Alert, TouchableHighlight } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'SQLite.db', location: 'default', createFromLocation: '~SQLite.db' });

const renderHistory = (item, navigation) => {

	const RightActions = (progress, dragX) => {
		const scale = dragX.interpolate({
			inputRange: [-100, 100],
			outputRange: [1, 0],
			extrapolate: 'clamp'
		});

		return (
			<>
				<TouchableOpacity onPress={() => navigation.navigate("HistoryDetailScreen", { item })}>
					<View style={{ flex: 1, backgroundColor: 'green', justifyContent: 'center' }}>
						<Animated.Text style={{ color: 'white', paddingHorizontal: 20, fontWeight: '600', transform: [{ scale }] }}>
							View
						</Animated.Text>
					</View>
				</TouchableOpacity>
			</>
		)
	}

	let { status, date, checkoutDate, customer } = item;

	return (
		<View style={styles.categoryStyles} >
			<Swipeable renderRightActions={RightActions} >
				<TouchableHighlight>
					<View>
						<View style={{ paddingHorizontal: 10, paddingTop: 10 }} >
							<Text style={{ color: '#fff', fontWeight: 'bold' }} >Checkout Date: {checkoutDate}</Text>
						</View>
						<View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
							<View>
								<Text style={{ fontSize: 17, color: '#f9f9f9' }} >
									Customer Name: 
								</Text>
								<Text style={{ fontSize: 20, color: '#f9f9f9' }} >
									{customer}
								</Text>
							</View>
							<Text style={{ fontSize: 20, fontWeight: 'bold', color: 'lightgreen' }} >
								{status}
							</Text>
						</View>
					</View>
				</TouchableHighlight>
			</Swipeable>
		</View>
	)
};

const styles = StyleSheet.create({
	categoryStyles: {
		backgroundColor: '#00b2bd', 
		borderRadius: 10, 
		elevation: 5, 
		margin: 5, 
		borderTopWidth: 1, 
		borderEndWidth: 5, 
		borderStartWidth: 5, 
		borderBottomWidth: 5, 
		borderColor: '#eee'
	},
});

export default renderHistory;