import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Alert, TouchableHighlight } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ 
	name: 'SQLite.db', 
	location: 'default', 
	createFromLocation: '~SQLite.db' 
	},
	() => { 
		console.log('Delete Category DB Opened Successfully') 
	},
	error => {
		console.log("DELETE Category DB ERROR: ");
	}
);

const renderSubCategory = ({ item }) => {

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
				<TouchableOpacity onPress={deleteSubCategory}>
					<View style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center' }}>
						<Animated.Text style={{ color: 'white', paddingHorizontal: 10, fontWeight: '600', transform: [{ scale }] }}>
							Delete
						</Animated.Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => alert('Archieve button pressed')}>
					<View style={{ flex: 1, backgroundColor: 'green', justifyContent: 'center' }}>
						<Animated.Text style={{ color: 'white', paddingHorizontal: 10, fontWeight: '600', transform: [{ scale }] }}>
							Archive
						</Animated.Text>
					</View>
				</TouchableOpacity>
			</>
		)
	}

	const deleteSubCategory = () => {
		Alert.alert(
			`Do You Want to Delete ${item.subCategoryTitle} ?`,
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
						await ExecuteQuery("DELETE FROM subcategory WHERE subCategoryID = ?", [item.subCategoryID]);
					}
				}
			],
			{ cancelable: false }
		);
	}

	return (
		<View style={styles.subCategoryStyles} >
			<Swipeable renderRightActions={RightActions} >
				<TouchableHighlight>
					<View style={{ padding: 10 }} >
						<Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff' }} >
							{item.subCategoryTitle}
						</Text>
					</View>
				</TouchableHighlight>
			</Swipeable>
		</View>
	)
};

const styles = StyleSheet.create({
	subCategoryStyles: {
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

export default renderSubCategory;