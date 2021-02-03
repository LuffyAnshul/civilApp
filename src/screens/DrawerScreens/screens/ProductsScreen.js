import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, RefreshControl, TouchableOpacity, ScrollView } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { openDatabase } from 'react-native-sqlite-storage';

import renderProduct from '../components/renderProduct';

const db = openDatabase({ name: 'SQLite.db', location: 'default', createFromLocation: '~SQLite.db' });


export default class ProductsScreen extends React.Component {

	constructor(props) {
		super(props);
		this.getProducts = this.getProducts.bind(this);
		this.state = {
			navigation: props.navigation,
			params: props.route.params,
			isLoading: true,
			allCategories: [],
			allSubCategories: [],
			allProductsData: [],
			category: null,
			subCategory: null,
			categoryID: null,
			subCategoryID: null,
			categoryFilter: null,
			categoryIDFilter: null,
			subCategoryFilter: null,
			subCategoryIDFilter: null,
			toggleSubCategoryDropDown: false
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
		this.getCategory();
		this.getSubCategory();

		this.getSpecificCategory();
		this.getProducts();	
	}

	async getSpecificCategory() {
		let { categoryID, subCategoryID, subCategoryTitle } = this.state.params;
		await this.setState({ categoryID, subCategoryID });

		let selectQuery = await this.ExecuteQuery("SELECT categoryTitle FROM category WHERE categoryID = ?", [categoryID])
		await this.setState({ category: selectQuery.rows.item(0).categoryTitle, subCategory: subCategoryTitle });
	}

	async getProducts(subCategoryIDFilter) {
		let { subCategoryID, subCategoryTitle } = this.state.params;

		let selectQuery = subCategoryIDFilter != null ?
			await this.ExecuteQuery("SELECT * FROM product WHERE subCategoryID = ?", [subCategoryIDFilter])
			:
			await this.ExecuteQuery("SELECT * FROM product WHERE subCategoryID = ?", [subCategoryID])
		
		await this.setState({ categoryFilter: null, subCategoryFilter: null, categoryIDFilter: null, subCategoryIDFilter: null })
		if ( selectQuery.rows.length === 0 ) {
			return alert(`No Product Exist For - Sub-Category ${subCategoryTitle}`)
		}

		let temp = [];
		for (let i = 0; i < selectQuery.rows.length; ++i){
			temp.push(selectQuery.rows.item(i));
		}
		this.setState({ allProductsData: temp, isLoading: false });
	}	

	async getSubCategory (categoryIDFilter) {
		let selectQuery = categoryIDFilter == null ? 
			await this.ExecuteQuery("SELECT * FROM subcategory;", [])
			:
			await this.ExecuteQuery("SELECT * FROM subcategory WHERE categoryID = ?;", [categoryIDFilter])

		let temp = [];
		for (let i = 0; i < selectQuery.rows.length; ++i){
			let arr = {
				"id": selectQuery.rows.item(i).subCategoryID,
				"name": selectQuery.rows.item(i).subCategoryTitle
			}
			temp.push(arr);
		}
		if (temp.length === 0) {
			alert("No Sub-Category Exist");
			this.setState({ categoryFilter: null, categoryIDFilter: null })
		}
		this.setState({ allSubCategories: temp });
	}

	async getCategory () {
		let selectQuery = await this.ExecuteQuery("SELECT * FROM category;", []);

		let temp = [];
		for (let i = 0; i < selectQuery.rows.length; ++i){
			let arr = {
				"id": selectQuery.rows.item(i).categoryID,
				"name": selectQuery.rows.item(i).categoryTitle
			}
			temp.push(arr);
		}
		this.setState({ allCategories: temp });
	}

	render() {

		let { category, subCategory, categoryFilter, subCategoryFilter, subCategoryIDFilter, navigation } = this.state;

		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

				{/* Filter Category and Sub-Category */}
				<View>

					{/* Filter Title */}
					<View>
						<Text style={{ fontWeight: 'bold', fontSize: 20, paddingHorizontal: 10, paddingVertical: 10 }} >Filter :</Text>
					</View>

					{/* Filter */}
					<View style={{ flexDirection: 'row'}} >

						{/* Category Filter */}
						<View style={{ flex: 1, padding: 3 }} >
							<SearchableDropdown
								onItemSelect={(item) => {
									this.setState({ categoryIDFilter: item.id, categoryFilter: item.name, toggleSubCategoryDropDown: true })
									this.getSubCategory(item.id);
								}}
								containerStyle={{
									padding: 1
								}}
								textInputStyle={{
									// padding: 12,
									borderWidth: 1,
									borderColor: '#ccc',
									backgroundColor: '#FAF7F6',
								}}
								itemStyle={{
									padding: 10,
									marginVertical: 1,
									borderColor: '#000',
									borderRadius: 5, 
									borderWidth: 1,
								}}
								itemTextStyle={{
									color: 'red',
								}}
								itemsContainerStyle={{
									maxHeight: 100,
								}}
								items={this.state.allCategories}
								resetValue={false}
								placeholder='Select Category'
								underlineColorAndroid="transparent"
							/>
							{
								categoryFilter !== null ? <Text style={{ marginLeft: 5, marginTop: 5, fontWeight: 'bold', fontSize: 17 }} >Selected: {categoryFilter}</Text> : null
							}
						</View>

						{/* Sub Category Filter */}
						<View style={{ flex: 1, padding: 3 }} pointerEvents={ this.state.toggleSubCategoryDropDown ? 'auto': 'none' } >
							<SearchableDropdown
								onItemSelect={(item) => {
									this.setState({ subCategoryIDFilter: item.id, subCategoryFilter: item.name })
								}}
								containerStyle={{
									padding: 1
								}}
								textInputStyle={{
									// padding: 12,
									borderWidth: 1,
									borderColor: '#ccc',
									backgroundColor: '#FAF7F6',
								}}
								itemStyle={{
									padding: 10,
									marginVertical: 1,
									borderColor: '#000',
									borderRadius: 5, 
									borderWidth: 1,
								}}
								itemTextStyle={{
									color: 'red',
								}}
								itemsContainerStyle={{
									maxHeight: 100,
								}}
								items={this.state.allSubCategories}
								resetValue={false}
								placeholder='Select Sub-Category'
								underlineColorAndroid="transparent"
							/>
							{
								subCategoryFilter !== null ? <Text style={{ marginLeft: 5, marginTop: 5, fontWeight: 'bold', fontSize: 17 }} >Selected: {subCategoryFilter}</Text> : null
							}
						</View>
					
					</View>

					{
						categoryFilter != null && subCategoryFilter != null ?
						<TouchableOpacity 
							style={{ alignItems: 'center', justifyContent: 'center', padding: 10, backgroundColor: 'orange' }} 
							onPress={() => {
								this.setState({ allProductsData: [], category: categoryFilter, subCategory: subCategoryFilter })
								this.getProducts(subCategoryIDFilter);
							}} 
						>
							<Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }} >Filter ME !</Text>

						</TouchableOpacity> :null
					}
					
				
				</View>
				
				{/* Products Render */}
				<View  style={{ flex: 1 }} >
						<View style={{ marginVertical: 20, alignItems: 'center' }} >
							<View style={{ flexDirection: 'row' }} >
								<Text style={{ alignSelf: 'flex-end', marginBottom: 2 }} >Category: </Text>
								<Text style={{ fontSize: 20, fontWeight: 'bold' }}>{category}</Text>
							</View>
							<View style={{ flexDirection: 'row' }} >
								<Text style={{ alignSelf: 'flex-end', marginBottom: 2 }} >Sub Category: </Text>
								<Text style={{ fontSize: 20, fontWeight: 'bold' }} >{subCategory}</Text>
							</View>
						</View>
						<Text style={{ fontSize: 25, fontWeight: 'bold', margin: 10, textDecorationLine: 'underline' }} >Products</Text>
						{ !this.state.isLoading && this.state.allProductsData.length ?
							<FlatList 
								data={this.state.allProductsData}
								keyExtractor={(item) => item.productID.toString()}
								renderItem={({ item }) => renderProduct(item, navigation)}
								ItemSeparatorComponent={() => 
									<View style={{ marginVertical: 5 }}  />
								}
								refreshControl={
									<RefreshControl
										refreshing={this.state.isLoading}
										onRefresh={this.getProducts}
									/>
								}
							/>
							:
							<View style={{ alignItems: 'center' }} >
								<Text style={{ marginVertical: 10, fontWeight: 'bold', fontSize: 20 }} >"No Products"</Text>
								<TouchableOpacity 
									onPress={() => { 
										this.getSpecificCategory();
										this.getProducts();
									}}
									style={{ backgroundColor: 'cyan', borderRadius: 15 }} >
									<Text style={{ margin: 20, fontSize: 20 }} >Refresh</Text>
								</TouchableOpacity>
							</View>
						}
				</View>
			
			</SafeAreaView>
		
		);
	}
}

const styles = StyleSheet.create({
	btnView: {
		flexDirection: 'row', 
		justifyContent: 'space-around', 
		marginVertical: 30
	},
	touchableBtn: {
		height: 40, 
		backgroundColor: 'red', 
		justifyContent: 'center', 
		paddingHorizontal: 10, 
		borderRadius: 10, 
		elevation: 5 
	}
});