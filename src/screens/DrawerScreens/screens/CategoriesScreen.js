import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, RefreshControl, TouchableOpacity, FlatList } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

import renderCategory from '../components/renderCategory';

const db = openDatabase({ 
	name: 'SQLite.db', 
	location: 'default', 
	createFromLocation: '~SQLite.db' 
	},
	() => { 
		console.log('Category DB Opened Successfully') 
	},
	error => {
		console.log("Category DB ERROR: ");
	}
);

export default class CategoriesScreen extends React.Component {

	constructor(props) {
		super(props);
		this.getData = this.getData.bind(this);
		this.state = {
			navigation: props.navigation,
			allCategoriesData: [],
			isLoading: true
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

		let create = this.ExecuteQuery("CREATE TABLE IF NOT EXISTS category(categoryID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, categoryTitle MEDIUMTEXT NOT NULL, categoryDescription LONGTEXT NOT NULL)", []);

		this.getData();
	}

	async getData () {
		let tempvar = []
		this.setState({ allCategoriesData: tempvar, isLoading: true })

		let selectQuery = await this.ExecuteQuery("SELECT * FROM category", []);

		var temp = [];
		for (let i = 0; i < selectQuery.rows.length; ++i){
			temp.push(selectQuery.rows.item(i));
		}
		this.setState({ allCategoriesData: temp, isLoading: false })
	}

	render() {
		const { navigation } = this.state;

		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
				<View style={{ flex: 1 }} >

					{/* ADD NEW CATEGORY */}
					<View style={{ position: 'absolute', right: 5, marginRight: 10, marginVertical: 10 }}>
						<TouchableOpacity 
							onPress={() => navigation.navigate('addCategoryScreen')}
							style={{ paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10, backgroundColor: 'lightblue', elevation: 15 }} >
							<Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>
								Add New
							</Text>
						</TouchableOpacity>
					</View>

					<View style={{ flex: 1, marginTop: 30 }} >
						<Text style={{ fontSize: 25, fontWeight: 'bold', margin: 10, textDecorationLine: 'underline' }} >Categories</Text>
						{
							!this.state.isLoading && this.state.allCategoriesData.length ? 
							<FlatList 
								data={this.state.allCategoriesData}
								keyExtractor={(item) => item.categoryID.toString()}
								renderItem={renderCategory}
								ItemSeparatorComponent={() => 
									<View style={{ marginVertical: 5 }}  />
								}
								refreshControl={
									<RefreshControl
										refreshing={this.state.isLoading}
										onRefresh={this.getData}
									/>
								}
							/> 
							: 
							<View style={{ alignItems: 'center' }} >
								<Text style={{ marginVertical: 10, fontWeight: 'bold', fontSize: 20 }} >"No Categories"</Text>
								<TouchableOpacity onPress={this.getData} style={{ backgroundColor: 'cyan', borderRadius: 15 }} >
									<Text style={{ margin: 20, fontSize: 20 }} >Refresh</Text>
								</TouchableOpacity>
							</View>
						}
					</View>

				</View>
			</SafeAreaView>
		
		);
	}
}

const styles = StyleSheet.create({
});