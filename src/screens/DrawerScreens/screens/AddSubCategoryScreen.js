import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ 
	name: 'SQLite.db', 
	location: 'default', 
	createFromLocation: '~SQLite.db' 
	},
	() => { 
		console.log('Add Sub Category DB Opened Successfully') 
	},
	error => {
		console.log("Add Sub Category ERROR: ");
	}
);

export default class AddCategoryScreen extends React.Component {

	constructor(props) {
		super(props);
		this.subCategoryTitle = React.createRef();
		this.state = {
			navigation: props.navigation,
			allCategoriesData: 0,
			subCategoryTitle: '',
			selectedId: 0,
			selectedCategory: ''
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
		this.setState({ allCategoriesData: temp })

	}

	async uploadSubCategoryToDB (){

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
		return (
			<SafeAreaView style={{flex: 1}}>
				<View 
					style={{ flex: 1, margin: 15, borderRadius: 30, backgroundColor: '#fff', justifyContent: 'center' }}
				>
					{/* Select Category */}
					<View style={styles.details} >
						<SearchableDropdown
							onItemSelect={(item) => {
								this.setState({ selectedId: item.id, selectedCategory: item.name })
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
							<Text style={{ fontSize: 16 }} >{this.state.selectedCategory === '' ? 'Nothing Selected' : this.state.selectedCategory}</Text>
						</View>
					</View>

					{/* Sub Category Title */}
					<View style={styles.details}>
						<TextInput
							mode="outlined"
							label="Sub-Category Title"
							placeholder="Sub-Category Title" 
							returnKeyType="done"
							ref={this.subCategoryTitle}
							value={this.state.subCategoryTitle}
							onChangeText={ (subCategoryTitle) => this.setState({ subCategoryTitle })}
							style={styles.inputStyles}
						/>
					</View>

					<View style={{ marginHorizontal: 30, marginTop: 20 }} >
						<TouchableOpacity 
							onPress={this.checkInfo}
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