import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'SQLite.db', location: 'default', createFromLocation: '~SQLite.db' });

export default class AddCategoryScreen extends React.Component {

	constructor(props) {
		super(props);
		this.productTitle = React.createRef();
		this.state = {
			navigation: props.navigation,
			allCategoriesData: 0,
			allSubCategoriesData: 0,
			productTitle: '',
			selectedCategoryId: 0,
			selectedCategory: '',
			selectedSubCategoryId: 0,
			selectedSubCategory: ''
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

	async componentDidMount () {
		let selectQuery = await this.ExecuteQuery("SELECT * FROM category", [])

		var temp = [];
		for (let i = 0; i < selectQuery.rows.length; ++i){
			let arr = {
				"id": selectQuery.rows.item(i).categoryID,
				"name": selectQuery.rows.item(i).categoryTitle
			}
			temp.push(arr);
		}
		this.setState({ allCategoriesData: temp });

	}

	async getSubCategory (selectedCategoryId) {
		let selectQuery = await this.ExecuteQuery("SELECT * FROM subCategory WHERE categoryID = ?", [selectedCategoryId])

		var temp = [];
		for (let i = 0; i < selectQuery.rows.length; ++i){
			let arr = {
				"id": selectQuery.rows.item(i).subCategoryID,
				"name": selectQuery.rows.item(i).subCategoryTitle
			}
			temp.push(arr);
		}
		this.setState({ allSubCategoriesData: temp });
	}

	async uploadProductToDB (){

		const { selectedId, subCategoryTitle } = this.state;

		let res = await this.ExecuteQuery("INSERT INTO subcategory (categoryID, subCategoryTitle) VALUES (?,?)", [selectedId, subCategoryTitle])
		
		if (res.rowsAffected > 0) {
			return true;
		}
		return false;
	}

	checkInfo = () => {
		const { selectedCategory, subCategoryTitle, navigation } = this.state;

		if (selectedCategory != '') {
			if (subCategoryTitle != '') {
				if (this.uploadSubCategoryToDB()) {
					return navigation.goBack();
				}
				return alert('Sub-Category Registration Failed');
			}
			return alert('Sub-Category Title cannot be Empty');
		}
		return alert('Select Parent Category');
	}

	render() {

		let { selectedCategoryId } = this.state;

		return (
			<SafeAreaView style={{flex: 1}}>
				<View 
					style={{ flex: 1, margin: 15, borderRadius: 30, backgroundColor: '#fff', justifyContent: 'center' }}
				>
					{/* Select Category */}
					<View style={styles.details} >
						<SearchableDropdown
							onItemSelect={(item) => {
								this.setState({ selectedCategoryId: item.id, selectedCategory: item.name });
								this.getSubCategory(item.id)
							}}
							containerStyle={{
								padding: 1
							}}
							textInputStyle={{
								padding: 12,
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
								color: '#000',
							}}
							itemsContainerStyle={{
								maxHeight: 100,
							}}
							items={this.state.allCategoriesData}
							resetValue={false}
							placeholder='Select Category'
							underlineColorAndroid="transparent"
						/>
						<View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 6, marginTop: 10 }} >
							<Text style={{ fontSize: 16, fontWeight: 'bold' }} >Selected Category: </Text>
							<Text style={{ fontSize: 16, textDecorationLine: 'underline' }} >{this.state.selectedCategory === '' ? 'Nothing Selected' : this.state.selectedCategory}</Text>
						</View>
					</View>

					{/* Select Sub- Category */}
					<View style={styles.details} pointerEvents={ selectedCategoryId ===0 ? 'none' : 'auto' } >
						<SearchableDropdown
							onItemSelect={(item) => {
								this.setState({ selectedSubCategoryId: item.id, selectedSubCategory: item.name })
							}}
							containerStyle={{
								padding: 1
							}}
							textInputStyle={{
								padding: 12,
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
								color: '#000',
							}}
							itemsContainerStyle={{
								maxHeight: 100,
							}}
							items={this.state.allSubCategoriesData}
							resetValue={false}
							placeholder='Select Category'
							underlineColorAndroid="transparent"
						/>
						<View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 6, marginTop: 10 }} >
							<Text style={{ fontSize: 16, fontWeight: 'bold' }} >Selected Sub- Category: </Text>
							<Text style={{ fontSize: 16, textDecorationLine: 'underline' }} >{this.state.selectedSubCategory === '' ? 'Nothing Selected' : this.state.selectedSubCategory}</Text>
						</View>
					</View>

					{/* Product Details */}
					<View style={styles.details}>
						<TextInput
							mode="outlined"
							label="Product Title"
							placeholder="Product Title" 
							returnKeyType="done"
							ref={this.productTitle}
							value={this.state.productTitle}
							onChangeText={ (productTitle) => this.setState({ productTitle })}
							style={styles.inputStyles}
						/>
					</View>

					{/* Save the Product Button */}
					<View style={{ marginHorizontal: 30, marginTop: 20 }} >
						<TouchableOpacity 
							onPress={() => alert('YEllo')}
							style={{ paddingVertical: 15, backgroundColor: '#000', paddingHorizontal: 20, borderRadius: 20 }} >
							<Text style={{ textAlign: 'center', color: '#fff' }} >
								Submit
							</Text>
						</TouchableOpacity>
					</View>

				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	details: {
		padding: 10, 
	},
	inputStyles: {
		height: 40
	},
});