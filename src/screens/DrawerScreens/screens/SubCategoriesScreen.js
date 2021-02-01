import React from 'react';
import { View, LogBox, Text, StyleSheet, SafeAreaView, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { Chip } from 'react-native-paper';
import { openDatabase } from 'react-native-sqlite-storage';

import renderSubCategory from '../components/renderSubCategory';

const db = openDatabase({ name: 'SQLite.db', location: 'default', createFromLocation: '~SQLite.db' });

const data = [  
	{
		subCategoryID: 1,
		categoryID: 1,
		categoryTitle: 'Cables',
		subCategoryTitle: 'Termination Gland for Armoured Cable'
	},
	{
		subCategoryID: 2,
		categoryID: 1,
		categoryTitle: 'Cables',
		subCategoryTitle: 'Copper Armoured Cable'
	},
	{
		subCategoryID: 3,
		categoryID: 1,
		categoryTitle: 'Cables',
		subCategoryTitle: 'Aluminium Armoured Cable'
	},
	{
		subCategoryID: 4,
		categoryID: 2	,
		categoryTitle: 'Tray',
		subCategoryTitle: 'Perforated-Hot Dip Galvanised'
	},
	{
		subCategoryID: 5,
		categoryID: 2,
		categoryTitle: 'Tray',
		subCategoryTitle: 'Perforated-Powder Coated'
	},
	{
		subCategoryID: 6,
		categoryID: 2,
		categoryTitle: 'Tray',
		subCategoryTitle: 'Perforated-PreGalvanised'
	},
	{
		subCategoryID: 7,
		categoryID: 2,
		categoryTitle: 'Tray',
		subCategoryTitle: 'Perforated-PreGalvanised'
	},
	{
		subCategoryID: 8,
		categoryID: 2,
		categoryTitle: 'Tray',
		subCategoryTitle: 'Perforated-PreGalvanised'
	},
	{
		subCategoryID: 9,
		categoryID: 2,
		categoryTitle: 'Tray',
		subCategoryTitle: 'Perforated-PreGalvanised'
	},
	{
		subCategoryID: 10,
		categoryID: 2,
		categoryTitle: 'Tray',
		subCategoryTitle: 'Perforated-PreGalvanised'
	},
	{
		subCategoryID: 11,
		categoryID: 2,
		categoryTitle: 'Tray',
		subCategoryTitle: 'Perforated-PreGalvanised'
	},
	{
		subCategoryID: 12,
		categoryID: 2,
		categoryTitle: 'Tray',
		subCategoryTitle: 'Perforated-PreGalvanised'
	},
	{
		subCategoryID: 13,
		categoryID: 2,
		categoryTitle: 'Tray',
		subCategoryTitle: 'Perforated-PreGalvanised'
	},

]

const dataSource = [
	{
		id: '1',
		name: "Cables",
	},
	{
		id: '2',
		name: "Tray",
	},
	{
		id: '3',
		name: "Cables",
	},
	{
		id: '4',
		name: "Tray",
	},
	{
		id: '5',
		name: "Cables",
	},
	{
		id: '6',
		name: "Tray",
	},
	{
		id: '7',
		name: "Cables",
	},
	{
		id: '8',
		name: "Tray",
	},
	
]

// Disable FlatList Render Warning for categories display
LogBox.ignoreLogs(['`flexWrap: `wrap`` is not supported'])

export default class SubCategoriesScreen extends React.Component {

	constructor(props) {
		super(props);
		this.getSubCategory = this.getSubCategory.bind(this);
		this.state = {
			navigation: props.navigation,
			params: props.route.params,
			allCategories: [],
			allSubCategoriesData: [],
			isLoading: true,
			selectedChipId: null,
			selectedChipTitle: ''
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

		let create = await this.ExecuteQuery("CREATE TABLE IF NOT EXISTS subcategory (subCategoryID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, categoryID INTEGER NOT NULL, subCategoryTitle TEXT NOT NULL, CONSTRAINT categoryID FOREIGN KEY (categoryID) REFERENCES category (categoryID) ON DELETE CASCADE ON UPDATE CASCADE)", [])
		this.setState({ selectedChipId: this.state.params.categoryID, selectedChipTitle: this.state.params.categoryTitle });

		this.getSubCategory();
		this.getCategory();
	}

	async getSubCategory () {
		let tempvar = []
		this.setState({ allSubCategoriesData: tempvar, isLoading: true });
		let { selectedChipId, selectedChipTitle } = this.state;
		
		let selectQuery = selectedChipId === 0 ?
			await this.ExecuteQuery("SELECT * FROM subcategory", []) :
			await this.ExecuteQuery("SELECT * FROM subcategory WHERE categoryID = ?;", [selectedChipId])

		if ( selectQuery.rows.length === 0 ) {
			return alert(`No Sub Category Exist For - Category ${selectedChipTitle}`)
		}	
		var temp = [];
		for (let i = 0; i < selectQuery.rows.length; ++i){
			temp.push(selectQuery.rows.item(i));
		}
		this.setState({ allSubCategoriesData: temp, isLoading: false });
	}

	async getCategory () {

		let selectQuery = await this.ExecuteQuery("SELECT * FROM category", []);
		var temp = [];
		for (let i = 0; i < selectQuery.rows.length; ++i){
			temp.push(selectQuery.rows.item(i));
		}
		this.setState({ allCategories: temp})
	}

	render() {
		const { navigation, selectedChipId } = this.state;

		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
				<View style={{ flex: 1 }} >

					{/* Chips */}
					<View>
						<Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10, marginTop: 10 }} >
							Categories
						</Text>

						<View style={{ flexWrap: 'wrap', flexDirection: 'row' }} >
							<View style={{ margin: 5, flexWrap: 'wrap' }}>
								<Chip
									mode="outlined" //changing display mode, default is flat.
									height={30} //give desirable height to chip
									
									textStyle={{ fontSize: 15 }} //label properties
									onPress={async() => {
										await this.setState({ selectedChipId: 0 })
										this.getSubCategory()
									}}
									selected={ selectedChipId === 0 ? true : false }
								>
									All
								</Chip>
							</View>
							<FlatList 
								contentContainerStyle={{ flexDirection : "row", flexWrap : "wrap" }}
								data={this.state.allCategories}
								keyExtractor={(item) => item.categoryID.toString()}
								renderItem={({ item }) => 
									<View style={{ margin: 5 }}>
										<Chip
											mode="outlined" //changing display mode, default is flat.
											height={30} //give desirable height to chip
											textStyle={{ fontSize: 15 }} //label properties
											onPress={async() => {
												await this.setState({ selectedChipId: item.categoryID, selectedChipTitle: item.categoryTitle });
												this.getSubCategory()
											}}
											selected={ item.categoryID === selectedChipId ? true : false }
										>
											{item.categoryTitle}
										</Chip>
									</View>
								}
							/>
						</View>

					</View>
					
					{/* Sub Category FlatList */}
					<View>
						<Text style={{ fontSize: 25, fontWeight: 'bold', margin: 10, textDecorationLine: 'underline' }} >Sub Categories</Text>
						{ !this.state.isLoading && this.state.allSubCategoriesData.length ? 
							<FlatList 
								data={this.state.allSubCategoriesData}
								keyExtractor={(item) => item.subCategoryID.toString()}
								renderItem={({ item }) => renderSubCategory(item, navigation)}
								ItemSeparatorComponent={() => 
									<View style={{ marginVertical: 5 }}  />
								}
								refreshControl={
									<RefreshControl
										refreshing={this.state.isLoading}
										onRefresh={this.getSubCategory}
									/>
								}
							/>
							:
							<View style={{ alignItems: 'center' }} >
								<Text style={{ marginVertical: 10, fontWeight: 'bold', fontSize: 20 }} >"No Sub Categories"</Text>
								<TouchableOpacity onPress={this.getSubCategory} style={{ backgroundColor: 'cyan', borderRadius: 15 }} >
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