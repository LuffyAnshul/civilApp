import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Alert, TouchableHighlight } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'SQLite.db', location: 'default', createFromLocation: '~SQLite.db' });

function renderCategory (item, navigation) {

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
			`Do You Want to Delete ${item.categoryTitle} ?`,
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
						await ExecuteQuery("DELETE FROM category WHERE categoryID = ?", [item.categoryID]);
						await ExecuteQuery("DELETE FROM subcategory WHERE categoryID = ?", [item.categoryID]);
						await ExecuteQuery("DELETE FROM product WHERE categoryID = ?", [item.categoryID]);
					}
				}
			],
			{ cancelable: false }
		);
	}

	const RightActions = (progress, dragX) => {
		const scale = dragX.interpolate({
			inputRange: [-100, 0],
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
				<TouchableOpacity onPress={() => navigation.navigate('EditCategoryScreen', { item })} >
					<View style={{ flex: 1, backgroundColor: 'green', justifyContent: 'center' }}>
						<Animated.Text style={{ color: 'white', paddingHorizontal: 20, fontWeight: '600', transform: [{ scale }] }}>
							Edit
						</Animated.Text>
					</View>
				</TouchableOpacity>
			</>
		)
	}

	return (
		<View style={styles.categoryStyles} >
			<Swipeable renderRightActions={RightActions} >
				<TouchableHighlight onPress={() => navigation.navigate('SubCategoriesScreen', { categoryID: item.categoryID, categoryTitle: item.categoryTitle })} >
					<View style={{ padding: 10 }} >
						<Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }} >
							{item.categoryTitle}
						</Text>
						<Text style={{ fontSize: 13, marginTop: 5, color: '#f9f9f9' }} >
							{item.categoryDescription}
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
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
		  width: 0,
		  height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	  },
	  openButton: {
		backgroundColor: "#F194FF",
		borderRadius: 20,
		padding: 10,
		elevation: 2
	  },
	  textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	  },
	  modalText: {
		marginBottom: 15,
		textAlign: "center"
	  }
});

export default renderCategory;