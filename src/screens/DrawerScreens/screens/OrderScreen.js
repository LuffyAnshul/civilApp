import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, RefreshControl, Modal, TouchableHighlight } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { TextInput } from 'react-native-paper';

import renderOrders from '../components/renderOrders';

const db = openDatabase({ name: 'SQLite.db', location: 'default', createFromLocation: '~SQLite.db' });

export default class OrderScreen extends React.Component {

	constructor(props) {
		super(props);
		this.getOrderData = this.getOrderData.bind(this)
		this.state = {
			navigation: props.navigation,
			allOrderData: [],
			orderhistoryID: null,
			isLoading: true,
			modalVisible: false,
			customerName: '',
			totalPrice: 0,
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
		this._focusListener = this.props.navigation.addListener('focus', () => {
			this.getOrderData();
		})
	}

	componentWillUnmount() {
		this._focusListener();
	}

	async getOrderData () {
		let temp = [];
		let { totalPrice } = this.state;

		let selectQuery = await this.ExecuteQuery("SELECT * FROM orderTemp", []);
		let selectAmtQuery = await this.ExecuteQuery("SELECT * FROM orderAmount", []);

		if (selectQuery.rows.length === 0) {
			return this.setState({ allOrderData: temp, isLoading: false, totalPrice: 0 });
		}
		if (selectAmtQuery.rows.length === 0) {
			await this.ExecuteQuery("INSERT INTO orderAmount (amount) VALUES (?)", [0]);
		}
		totalPrice = 0
		this.setState({ allOrderData: temp, isLoading: true, orderhistoryID: selectQuery.rows.item(0).orderhistoryID })
		
		for (let i = 0; i < selectQuery.rows.length; ++i){
			let productID = selectQuery.rows.item(i).productID;

			let val = await this.ExecuteQuery("SELECT * FROM product WHERE productID = ?", [productID]);
			temp.push(val.rows.item(0));

			let res = await this.ExecuteQuery("SELECT amount FROM orderAmount WHERE orderAmtID = 1")

			let price = val.rows.item(0).productRate;
			totalPrice = totalPrice + price;
			await this.ExecuteQuery("UPDATE orderAmount SET amount = ? WHERE orderAmtID = 1", [totalPrice]);

		}
		return this.setState({ allOrderData: temp, isLoading: false, totalPrice })
	}

	async uploadDataToOrdersDB () {
		let { allOrderData, orderhistoryID, modalVisible } = this.state;
		
		for (let i = 0; i < allOrderData.length; ++i){
			let { productName, productGST, productRate } = allOrderData[i];
			
			await this.ExecuteQuery("INSERT INTO orders (productName, productGST, productRate, orderhistoryID) VALUES (?, ?, ?, ?)", [productName, productGST, productRate, orderhistoryID]);
		}
		
		return this.setState({ modalVisible: !modalVisible });
	}
	
	async uploadDataToHistoryDB() {
		let { orderhistoryID, customerName } = this.state;

		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; 
		var yyyy = today.getFullYear();
		today = dd+'/'+mm+'/'+yyyy;

		await this.ExecuteQuery("UPDATE orderhistory SET status = ?, checkoutDate = ?, customer = ? WHERE orderhistoryID = ? ", ["completed", today, customerName, orderhistoryID]);
		await this.ExecuteQuery("DELETE FROM orderTemp", []);
		await this.ExecuteQuery("DELETE FROM orderAmount", []);
		this.getOrderData();
	}

	render() {

		let { modalVisible, totalPrice } = this.state;

		return (
			<SafeAreaView style={{ flex: 1 }}>
				<View style={{ flex: 1 }} >
					<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						Alert.alert("Modal has been closed.");
					}}
					>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text style={styles.modalText}>Enter Customer Name</Text>

							<TextInput
								mode="outlined"
								label="Customer Name"
								placeholder="Customer Name" 
								returnKeyType="done"
								value={this.state.customerName}
								onChangeText={ (customerName) => this.setState({ customerName })}
								style={styles.inputStyles}
							/>

							<TouchableHighlight
								style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
								onPress={() => {
									this.uploadDataToHistoryDB();
									this.setState({ modalVisible: !modalVisible });
									this.getOrderData();
								}}
							>
								<Text style={styles.textStyle}>Submit</Text>
							</TouchableHighlight>
							</View>
					</View>
				</Modal>

					{/* Orders FlatList */}
					<View style={{ marginTop: 30 }} >
						<Text style={{ fontSize: 25, fontWeight: 'bold', margin: 10, textDecorationLine: 'underline' }} >Order List</Text>
						{
							!this.state.isLoading && this.state.allOrderData.length ? 
							<FlatList 
								data={this.state.allOrderData}
								keyExtractor={(item) => item.productID.toString()}
								renderItem={({ item }) => renderOrders(item)}
								ItemSeparatorComponent={() => 
									<View style={{ marginVertical: 5 }}  />
								}
								refreshControl={
									<RefreshControl
										refreshing={this.state.isLoading}
										onRefresh={this.getOrderData}
									/>
								}
							/> 
							: 
							<View style={{ alignItems: 'center' }} >
								<Text style={{ marginVertical: 10, fontWeight: 'bold', fontSize: 20 }} >"No Orders"</Text>
								<TouchableOpacity onPress={this.getOrderData} style={{ backgroundColor: 'cyan', borderRadius: 15 }} >
									<Text style={{ margin: 20, fontSize: 20 }} >Refresh</Text>
								</TouchableOpacity>
							</View>
						}
					</View>

					<View style={{ position: 'absolute', right: 5, bottom: 10 }} >
						<TouchableOpacity onPress={() => this.uploadDataToOrdersDB()} >
							<Text style={styles.checkoutBtn}>CheckOut</Text>
						</TouchableOpacity>
					</View>

					<View style={{ position: 'absolute', left: 5, bottom: 10 }} >
						<TouchableOpacity>
							<Text style={styles.checkoutBtn}>Total Price: ₹ {totalPrice}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		
		);
	}
}

const styles = StyleSheet.create({
	checkoutBtn: {
		color: '#fff',
		fontSize: 20, 
		fontWeight: 'bold', 
		backgroundColor: '#ec3e63', 
		paddingVertical: 15, 
		paddingHorizontal: 20,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 10,
		borderTopRightRadius: 20
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		elevation: 5
	},
	openButton: {
		backgroundColor: "#F194FF",
		borderRadius: 20,
		padding: 10,
		elevation: 2
	},
	modalText: {
		marginBottom: 15,
		paddingHorizontal: 10,
		textAlign: "center"
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
		paddingHorizontal: 10
	},
	inputStyles: {
		height: 40,
		width: 200,
		marginBottom: 10
	},
});