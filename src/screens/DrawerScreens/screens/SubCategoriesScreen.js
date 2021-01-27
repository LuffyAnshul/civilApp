import React from 'react';
import { View, LogBox, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Chip } from 'react-native-paper';

import renderSubCategory from '../components/renderSubCategory';

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
	render() {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
				<View style={{ flex: 1 }} >

					{/* ADD NEW CATEGORY */}
					<View style={{ alignItems: 'center', marginRight: 10, marginVertical: 10 }}>
						<TouchableOpacity 
							onPress={() => alert('Add New Sub Category')}
							style={{ paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10, backgroundColor: 'lightblue', elevation: 15 }} >
							<Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>
								Add New
							</Text>
						</TouchableOpacity>
					</View>

					<View>

						<Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }} >
							Categories
						</Text>

						<View>
							<FlatList 
								contentContainerStyle={{ flexDirection : "row", flexWrap : "wrap" }}
								data={dataSource}
								keyExtractor={(item) => item.id}
								renderItem={({ item }) => 
									<View style={{ margin: 5 }}>
										<Chip
											mode="outlined" //changing display mode, default is flat.
											height={30} //give desirable height to chip
											textStyle={{ color:'#000',fontSize: 15 }} //label properties
											onPress={() => alert('Clicked Chip'+ item.name)}
										>
											{item.name}
										</Chip>
									</View>
								}
							/>
							{/* {
								dataSource.map((item, index) => {
									return (
										<View style={{ margin: 5 }}>
											<Chip
												key={index}
												mode="outlined" //changing display mode, default is flat.
												height={30} //give desirable height to chip
												textStyle={{ color:'#000',fontSize: 15 }} //label properties
												style={{ }} //display diff color BG
												onPress={() => Alert.alert('Clicked Chip'+ item)}
											>
												{item.name}
											</Chip>
										</View>
									);
								})
							} */}
						</View>

					</View>
					
					<View>
						<Text style={{ fontSize: 25, fontWeight: 'bold', margin: 10, textDecorationLine: 'underline' }} >Sub Categories</Text>
						<FlatList 
							data={data}
							keyExtractor={(item) => item.subCategoryID.toString()}
							renderItem={renderSubCategory}
							ItemSeparatorComponent={() => 
								<View style={{ marginVertical: 5 }}  />
							}
						/>
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