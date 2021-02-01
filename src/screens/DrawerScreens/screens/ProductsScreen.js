import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ 
	name: 'SQLite.db', 
	location: 'default', 
	createFromLocation: '~SQLite.db' 
	},
	() => { 
		console.log('Products DB Opened Successfully') 
	},
	error => {
		console.log("Products DB ERROR: ");
	}
);

export default class ProductsScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			route: props.route,
			navigation: props.navigation,
		}
	}

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

	componentDidMount() {
		console.log(this.state.route)
	}

	render() {

		return (
			<SafeAreaView style={{flex: 1}}>
				<View style={{flex: 1, padding: 16}}>
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 16 }}>
							This is the Products Screen
						</Text>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
});