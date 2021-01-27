import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const renderCategory = ({ item }) => {
	return (
		<View style={styles.categoryStyles} >
			<TouchableOpacity>
				<View style={{ padding: 10 }} >
					<Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }} >
						{item.categoryTitle}
					</Text>
					<Text style={{ fontSize: 13, marginTop: 5, color: '#f9f9f9' }} >
						{item.categoryDescription}
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	)
};

const styles = StyleSheet.create({
	categoryStyles: {
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

export default renderCategory;