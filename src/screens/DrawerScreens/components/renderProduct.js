import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Alert, TouchableHighlight } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'SQLite.db', location: 'default', createFromLocation: '~SQLite.db' });

const renderProduct = (item, navigation) => {

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

	const RightActions = (progress, dragX) => {
		const scale = dragX.interpolate({
			inputRange: [-100, 0],
			outputRange: [1, 0],
			extrapolate: 'clamp'
		});

		return (
			<>
				<TouchableOpacity onPress={() => navigation.navigate('EditProductScreen', { item }) }>
					<View style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center' }}>
						<Animated.Text style={{ color: 'white', paddingHorizontal: 20, fontWeight: '600', transform: [{ scale }] }}>
							Edit
						</Animated.Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => alert('Add button pressed')}>
					<View style={{ flex: 1, backgroundColor: 'green', justifyContent: 'center' }}>
						<Animated.Text style={{ color: 'white', paddingHorizontal: 20, fontWeight: '600', transform: [{ scale }] }}>
							Add
						</Animated.Text>
					</View>
				</TouchableOpacity>
			</>
		)
	}

	return (
		<View style={styles.productStyles} >
			<Swipeable renderRightActions={RightActions} >
				<TouchableHighlight>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
						<View style={{ flex: 8, padding: 10 }} >
							<Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff', textDecorationLine: 'underline' }} >
								{item.productName}
							</Text>
							<View style={{ marginTop: 20 }} >
								<Text>HSN Number: {item.productHSN}</Text>
								<Text>GST Number: {item.productGST}</Text>
							</View>
						</View>
						<View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', paddingHorizontal: 20 }} >
							<Text>Rate: </Text>
							<Text style={{ fontWeight: 'bold', fontSize: 25 }} >₹{item.productRate}</Text>
						</View>
					</View>
				</TouchableHighlight>
			</Swipeable>
		</View>
	)
};

const styles = StyleSheet.create({
	productStyles: {
		backgroundColor: '#00b2bd', 
		borderRadius: 10, 
		elevation: 5, 
		margin: 5, 
		borderTopWidth: 1, 
		borderEndWidth: 5, 
		borderStartWidth: 5, 
		borderBottomWidth: 5, 
		borderColor: '#eee'
	}
});

export default renderProduct;