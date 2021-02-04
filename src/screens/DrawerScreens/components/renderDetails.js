import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

function renderDetails (item) {

	return (
		<View style={styles.categoryStyles} >
			<TouchableHighlight>
				<View style={{ flexDirection: 'row' }} >
					<View style={{ flex: 8, padding: 10 }} >
						<Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }} >
							{item.productName}
						</Text>
						<Text style={{ fontSize: 13, marginTop: 5, color: '#f9f9f9' }} >
							GST NUMBER: {item.productGST}
						</Text>
					</View>
					<View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }} >
						<Text style={{ fontSize: 13, marginTop: 5, color: '#f9f9f9' }}>Rate</Text>
						<Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>₹ {item.productRate}</Text>
					</View>
				</View>
			</TouchableHighlight>
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
	},
});

export default renderDetails;