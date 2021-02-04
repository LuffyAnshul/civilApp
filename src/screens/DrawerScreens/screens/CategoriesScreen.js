import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, RefreshControl, TouchableOpacity, FlatList } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

import renderCategory from '../components/renderCategory';

const db = openDatabase({ name: 'SQLite.db', location: 'default', createFromLocation: '~SQLite.db' });

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

	async componentDidMount() {
		await this.ExecuteQuery("CREATE TABLE IF NOT EXISTS category (categoryID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, categoryTitle MEDIUMTEXT NOT NULL, categoryDescription LONGTEXT NOT NULL)", []);
		await this.ExecuteQuery("CREATE TABLE IF NOT EXISTS subcategory (subCategoryID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, categoryID INTEGER NOT NULL, subCategoryTitle TEXT NOT NULL, CONSTRAINT categoryID FOREIGN KEY (categoryID) REFERENCES category (categoryID) ON DELETE CASCADE ON UPDATE CASCADE)", []);
		await this.ExecuteQuery("CREATE TABLE IF NOT EXISTS product (productID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, categoryID INTEGER NOT NULL, subCategoryID INTEGER NOT NULL, productName TEXT NOT NULL, productHSN INTEGER NOT NULL, productGST TEXT NOT NULL, productRate FLOAT NOT NULL, CONSTRAINT subCategoryID FOREIGN KEY (subCategoryID) REFERENCES subcategory (subCategoryID) ON DELETE CASCADE ON UPDATE CASCADE)", []);
		
		await this.ExecuteQuery("CREATE TABLE IF NOT EXISTS orderTemp (orderID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, productID INTEGER NOT NULL, orderhistoryID INTEGER NOT NULL )", [])
		await this.ExecuteQuery("CREATE TABLE IF NOT EXISTS orderhistory (orderhistoryID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, status TEXT NOT NULL, date TEXT NOT NULL, checkoutDate TEXT NOT NULL, customer NO NULL)", []);
		await this.ExecuteQuery("CREATE TABLE IF NOT EXISTS orders (orderID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, productName TEXT NOT NULL, productGST TEXT NOT NULL, productRate FLOAT NOT NULL, orderhistoryID INTEGER NOT NULL )", []);
		await this.ExecuteQuery("CREATE TABLE IF NOT EXISTS orderAmount (orderAmtID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, amount FLOAT NOT NULL)")

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

					{/* Category FlatList */}
					<View style={{ flex: 1 }} >
						<Text style={{ fontSize: 25, fontWeight: 'bold', margin: 10, textDecorationLine: 'underline' }} >Categories</Text>
						{
							!this.state.isLoading && this.state.allCategoriesData.length ? 
							<FlatList 
								data={this.state.allCategoriesData}
								keyExtractor={(item) => item.categoryID.toString()}
								renderItem={({ item }) => renderCategory(item, navigation)}
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