import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

import renderDetails from '../components/renderDetails';

const db = openDatabase({ name: 'SQLite.db', location: 'default', createFromLocation: '~SQLite.db' });

export default class HistoryDetailScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			navigation: props.navigation,
			params: props.route.params.item,
			orderhistoryID: null,
			allOrders: [],
			isLoading: true,
			totalPrice: 0
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

	componentDidMount() {
		let { orderhistoryID } = this.state.params;

		this.getData(orderhistoryID);
	}

	async getData(orderhistoryID){
		let selectQuery = await this.ExecuteQuery("SELECT * FROM orders WHERE orderhistoryID = ?", [orderhistoryID])
		let { totalPrice } = this.state;
		let temp = [];
		this.setState({ allOrders: temp, isLoading: true });

		for (let i = 0; i < selectQuery.rows.length; ++i){
			temp.push(selectQuery.rows.item(i));

			let price = selectQuery.rows.item(i).productRate;
			totalPrice = totalPrice + price;
		}
		this.setState({ allOrders: temp, totalPrice, isLoading: false })
	}

	render() {
		let { isLoading, allOrders, totalPrice } = this.state;

		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
				<View style={{ flex: 1 }} >

					{/* Order Details FlatList */}
					<View style={{ flex: 1 }} >
						<Text style={{ fontSize: 25, fontWeight: 'bold', margin: 10, textDecorationLine: 'underline' }} >Order Details</Text>
						{
							!isLoading && allOrders.length ? 
							<FlatList 
								data={this.state.allOrders}
								keyExtractor={(item) => item.orderID.toString()}
								renderItem={({ item }) => renderDetails(item)}
								ItemSeparatorComponent={() => 
									<View style={{ marginVertical: 5 }}  />
								}
							/> 
							: 
							null
						}
					</View>
				</View>
				<View style={{ position: 'absolute', right: 5, bottom: 10 }} >
					<TouchableOpacity>
						<Text style={styles.checkoutBtn}>Total Price: ₹ {totalPrice}</Text>
					</TouchableOpacity>
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
});