import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const renderSubCategory = ({ item }) => {
	return (
		<View style={styles.subCategoryStyles} >
			<TouchableOpacity>
				<View style={{ padding: 10 }} >
					<Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff' }} >
						{item.subCategoryTitle}
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	)
};

const styles = StyleSheet.create({
	subCategoryStyles: {
		backgroundColor: '#00b2bd', 
		borderRadius: 10, 
		elevation: 5, 
		margin: 5, 
		borderTopWidth: 1, 
		borderEndWidth: 5, 
		borderStartWidth: 5, 
		borderBottomWidth: 5, 
		borderColor: '#eee'
	}
});

export default renderSubCategory;