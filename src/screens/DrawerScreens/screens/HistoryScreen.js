import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';

export default class HistoryScreen extends React.Component {

	ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
		db.transaction((trans) => {
			trans.executeSql(sql, params, (trans, results) => {
				resolve(results);
			},
			(error) => {
				reject(error);
			});
		});
	});

	render() {
		return (
			<SafeAreaView >
				<View>
					<Text>MY HISTORY</Text>
					{/* <FlatList 
					
					/> */}
				</View>
			</SafeAreaView>
		
		);
	}
}

const styles = StyleSheet.create({
	container: { 
		flex: 1, 
		alignItems: 'center', 
		marginVertical: 20 
	},
	titleStyles: { 
		fontSize: 20, 
		fontWeight: 'bold' 
	},
	privacyStyles: { 
		textAlign: 'center', 
		marginVertical: 10 
	}
});