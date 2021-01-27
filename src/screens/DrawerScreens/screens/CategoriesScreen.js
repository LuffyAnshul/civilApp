import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

import renderCategory from '../components/renderCategory';

// const db = SQLite.openDatabase({ name: 'categoriesDB.db' })

const data = [  
	{
		categoryID: 1,
		categoryTitle: 'Cable',
		categoryDescription: 'Short Description on Cable'
	},
	{
		categoryID: 2,
		categoryTitle: 'Tray',
		categoryDescription: 'Short Description on Cable'
	},
	{
		categoryID: 3,
		categoryTitle: 'uPVC',
		categoryDescription: 'Short Description on Cable'
	},
	{
		categoryID: 4,
		categoryTitle: 'Cable',
		categoryDescription: 'Short Description on Cable'
	},
	{
		categoryID: 5,
		categoryTitle: 'Tray',
		categoryDescription: 'Short Description on Cable'
	},
	{
		categoryID: 6,
		categoryTitle: 'uPVC',
		categoryDescription: 'Short Description on Cable'
	},
	{
		categoryID: 7,
		categoryTitle: 'Cable',
		categoryDescription: 'Short Description on Cable'
	},
	{
		categoryID: 8,
		categoryTitle: 'Tray',
		categoryDescription: 'Short Description on Cable'
	},
	{
		categoryID: 9,
		categoryTitle: 'uPVC',
		categoryDescription: 'Short Description on Cable'
	},
	{
		categoryID: 10,
		categoryTitle: 'Cable',
		categoryDescription: 'Short Description on Cable'
	},
	{
		categoryID: 12,
		categoryTitle: 'Tray',
		categoryDescription: 'Short Description on Cable'
	},
	{
		categoryID: 13,
		categoryTitle: 'uPVC',
		categoryDescription: 'Short Description on Cable'
	}
]

export default class CategoriesScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {

	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
				<View>

					{/* ADD NEW CATEGORY */}
					<View style={{ alignItems: 'flex-end', marginRight: 10, marginVertical: 10 }}>
						<TouchableOpacity 
							onPress={() => alert('Add New Category')}
							style={{ paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10, backgroundColor: 'lightblue', elevation: 15 }} >
							<Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>
								Add New
							</Text>
						</TouchableOpacity>
					</View>

					<View>
						<Text style={{ fontSize: 25, fontWeight: 'bold', margin: 10, textDecorationLine: 'underline' }} >Categories</Text>
						<FlatList 
							data={data}
							keyExtractor={(item) => item.categoryID.toString()}
							renderItem={renderCategory}
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
});