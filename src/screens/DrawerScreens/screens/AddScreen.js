import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';

export default class AddScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			navigation: props.navigation
		}
	}

	render() {
		
		const { navigation } = this.state

		return (
			<SafeAreaView style={{ flex: 1 }} >
				<ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }} >

					{/* Heading */}
					<View style={styles.container} >
						<Text style={styles.headingStyle} >
							Add Categories, Sub-Categories & Products
						</Text>
						<View style={styles.divider} />
					</View>

					{/* ADD NEW CATEGORY */}
					<View style={styles.container}>
						<TouchableOpacity 
							onPress={() => navigation.navigate('AddCategoryScreen')}
							style={styles.tile} 
						>
							<Text style={styles.tileText}>
								Add New Category
							</Text> 
						</TouchableOpacity>
					</View>

					{/* ADD NEW SUB CATEGORY */}
					<View style={styles.container}>
						<TouchableOpacity 
							onPress={() => navigation.navigate('AddSubCategoryScreen')}
							style={styles.tile}
						>
							<Text style={styles.tileText}>
								Add New Sub Category
							</Text>
						</TouchableOpacity>
					</View>

					{/* ADD NEW PRODUCT */}
					<View style={styles.container}>
						<TouchableOpacity 
							onPress={() => navigation.navigate('AddProductScreen')}
							style={styles.tile}
						>
							<Text style={styles.tileText}>
								Add New Product
							</Text>
						</TouchableOpacity>
					</View>

				</ScrollView>
			</SafeAreaView>
		
		);
	}
}

const styles = StyleSheet.create({
	container: { 
		margin: 10, 
		alignItems: 'center' 
	},
	headingStyle: { 
		fontSize: 26, 
		fontWeight: 'bold', 
		textAlign: 'center' 
	},
	divider: { 
		height: 4, 
		width: 200, 
		borderRadius: 20, 
		margin: 10, 
		backgroundColor: '#000' 
	},
	tile: { 
		paddingVertical: 10, 
		paddingHorizontal: 15, 
		borderRadius: 10, 
		backgroundColor: 'lightblue', 
		elevation: 15 
	},
	tileText: { 
		fontSize: 20, 
		textAlign: 'center', 
		fontWeight: 'bold' 
	}
});