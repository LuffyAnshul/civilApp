import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Alert, TouchableHighlight } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'SQLite.db', location: 'default', createFromLocation: '~SQLite.db' });

function renderOrders (item) {
	
	const ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
		db.transaction((trans) => {
			trans.executeSql(sql, params, (trans, results) => {
				resolve(results);
			},
			(error) => {
				reject(error);
			});
		});
	});

	const deleteCategory = () => {
		Alert.alert(
			`Do You Want to Remove ${item.productName} ?`,
			"Please Confirm",
			[
				{
					text: "Cancel",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel"
				},
				{ 
					text: "OK", 
					onPress: async() => {
						await ExecuteQuery("DELETE FROM orderTemp WHERE productID = ?", [item.productID]);
						let res = await ExecuteQuery("SELECT amount FROM orderAmount WHERE orderAmtID = 1")
						let totalPrice = res.rows.item(0).amount;
						console.log(totalPrice)
						totalPrice = totalPrice - item.productRate;
						console.log("Changed to - " + totalPrice);
						await ExecuteQuery("UPDATE orderAmount SET amount = ? WHERE orderAmtID = 1", [totalPrice]);
					}
				}
			],
			{ cancelable: false }
		);
	}

	const RightActions = (progress, dragX) => {
		const scale = dragX.interpolate({
			inputRange: [-100, 100],
			outputRange: [1, 0],
			extrapolate: 'clamp'
		});

		return (
			<>
				<TouchableOpacity onPress={deleteCategory}>
					<View style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center' }}>
						<Animated.Text style={{ color: 'white', paddingHorizontal: 10, fontWeight: '600', transform: [{ scale }] }}>
							Delete
						</Animated.Text>
					</View>
				</TouchableOpacity>
			</>
		)
	}

	return (
		<View style={styles.categoryStyles} >
			<Swipeable renderRightActions={RightActions} >
				<TouchableHighlight >
					<View style={{ padding: 10 }} >
						<Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }} >
							{item.productName}
						</Text>
						<Text style={{ fontSize: 13, marginTop: 5, color: '#f9f9f9' }} >
							{item.productRate}
						</Text>
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

export default renderOrders;