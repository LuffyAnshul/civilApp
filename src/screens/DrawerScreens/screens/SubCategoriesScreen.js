import React from 'react';
import { View, LogBox, Text, StyleSheet, SafeAreaView, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { Chip } from 'react-native-paper';
import { openDatabase } from 'react-native-sqlite-storage';

import renderSubCategory from '../components/renderSubCategory';

const db = openDatabase({ name: 'SQLite.db', location: 'default', createFromLocation: '~SQLite.db' });

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
		await this.setState({ selectedChipId: this.state.params.categoryID, selectedChipTitle: this.state.params.categoryTitle });

		this.getSubCategory();
		this.getCategory();
	}

	async getSubCategory () {
		let temp = [];
		this.setState({ allSubCategoriesData: temp, isLoading: true });
		let { selectedChipId, selectedChipTitle } = this.state;
		
		let selectQuery = selectedChipId === 0 ?
			await this.ExecuteQuery("SELECT * FROM subcategory", []) :
			await this.ExecuteQuery("SELECT * FROM subcategory WHERE categoryID = ?;", [selectedChipId])

		if ( selectQuery.rows.length === 0 ) {
			return alert(`No Sub Category Exist For - Category ${selectedChipTitle}`)
		}

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
					<View style={{ flex: 1 }} >
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