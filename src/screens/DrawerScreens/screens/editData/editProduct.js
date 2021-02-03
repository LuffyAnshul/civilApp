import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'SQLite.db', location: 'default', createFromLocation: '~SQLite.db' });

export default class EditProductScreen extends React.Component {

	constructor(props) {
		super(props);
		this.productName = React.createRef();
		this.productHSN = React.createRef();
		this.productGST = React.createRef();
		this.productRate = React.createRef();
		this.state = {
			navigation: props.navigation,
			params: props.route.params.item,
			productID: null,
			productName: '',
			productHSN: null,
			productGST: null,
			productRate: null
		}
	}

	componentDidMount() {
		let { productID, productName, productHSN, productGST, productRate } = this.state.params;
		
		productHSN = productHSN.toString();
		productRate = productRate.toString();
		this.setState({ productName, productHSN, productGST, productRate, productID })
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

	async updateProductToDB (productID, productName, productHSN, productGST, productRate) {
		let res = await this.ExecuteQuery("UPDATE product SET productName = ?, productHSN = ?, productGST = ?, productRate = ? WHERE productID = ?", [ productName, productHSN, productGST, productRate, productID]);

		if (res.rowsAffected > 0) {
			return true;
		}
		return false;
	}

	checkInfo = () => {
		const { productID, productName, productHSN, productGST, productRate, navigation } = this.state;

		let hsnReg = /^\d{8}$/;
		let gstReg = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

		if (productName != '') {
			if (hsnReg.test(productHSN) && gstReg.test(productGST)) {
				if(productRate > 0) {
					if (this.updateProductToDB(productID, productName, productHSN, productGST, productRate)) {
						return navigation.goBack();
					}
					
					return alert('Product Registration Failed');
				}
				return alert('Rate cannot be negative');
			}
			return alert('Check HSN and GST Number');
		}
		return alert('Product Title cannot be Empty');

	}

	render() {
		return (
			<SafeAreaView style={{flex: 1}}>
				<ScrollView 
					style={{ margin: 15, borderRadius: 30, backgroundColor: '#fff' }} 
					showsVerticalScrollIndicator={false} 
					contentContainerStyle={{ justifyContent: 'center', paddingVertical: 30 }}
				>

					{/* Product Details */}
					<View style={styles.details}>

						{/* Product Title */}
						<TextInput
							mode="outlined"
							label="Product Title"
							placeholder="Product Title" 
							ref={this.productName}
							value={this.state.productName}
							onChangeText={ (productName) => this.setState({ productName })}
							style={styles.inputStyles}
							returnKeyType="next"
							onSubmitEditing={() => this.productHSN.current.focus()}
							blurOnSubmit={false}
						/>

						{/* HSN Number */}
						<TextInput
							mode="outlined"
							label="HSN Number"
							placeholder="HSN Number" 
							ref={this.productHSN}
							value={this.state.productHSN}
							onChangeText={ (productHSN) => this.setState({ productHSN })}
							style={styles.inputStyles}
							returnKeyType="next"
							onSubmitEditing={() => this.productGST.current.focus()}
							blurOnSubmit={false}
							maxLength={8}
							keyboardType="number-pad"
						/>

						{/* GST Number */}
						<TextInput
							mode="outlined"
							label="GST Number"
							placeholder="GST Number" 
							ref={this.productGST}
							value={this.state.productGST}
							onChangeText={ (productGST) => this.setState({ productGST })}
							style={styles.inputStyles}
							returnKeyType="next"
							onSubmitEditing={() => this.rate.current.focus()}
							blurOnSubmit={false}
						/>

						{/* Product Rate */}
						<TextInput
							mode="outlined"
							label="Rate"
							placeholder="Rate" 
							ref={this.productRate}
							value={this.state.productRate}
							onChangeText={ (productRate) => this.setState({ productRate })}
							style={styles.inputStyles}
							keyboardType="numeric"
							returnKeyType="done"
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

				</ScrollView>
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