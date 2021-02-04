import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

import renderHistory from '../components/renderHistory';

const db = openDatabase({ name: 'SQLite.db', location: 'default', createFromLocation: '~SQLite.db' });

export default class HistoryScreen extends React.Component {

	constructor(props) {
		super(props);
		this.getHistoryData = this.getHistoryData.bind(this)
		this.state = {
			navigation: props.navigation,
			allOrderHistory: [],
			isLoading: true
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

	componentDidMount () {
		this.getHistoryData();
	}

	async getHistoryData() {
		let selectQuery = await this.ExecuteQuery("SELECT * FROM orderhistory", []);

		let temp = [];
		this.setState({ allOrderHistory: temp, isLoading: true });

		for (let i = 0; i < selectQuery.rows.length; ++i){
			temp.push(selectQuery.rows.item(i));
		}
		this.setState({ allOrderHistory: temp, isLoading: false })
	}

	render() {
		let { navigation } = this.state;

		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<View style={{ flex: 1 }} >

				{/* Order History FlatList */}
				<View style={{ flex: 1 }} >
					<Text style={{ fontSize: 25, fontWeight: 'bold', margin: 10, textDecorationLine: 'underline' }} >History</Text>
					{
						!this.state.isLoading && this.state.allOrderHistory.length ? 
						<FlatList 
							data={this.state.allOrderHistory}
							keyExtractor={(item) => item.orderhistoryID.toString()}
							renderItem={({ item }) => renderHistory(item, navigation)}
							ItemSeparatorComponent={() => 
								<View style={{ marginVertical: 5 }}  />
							}
							refreshControl={
								<RefreshControl
									refreshing={this.state.isLoading}
									onRefresh={this.getHistoryData}
								/>
							}
						/> 
						: 
						<View style={{ alignItems: 'center' }} >
							<Text style={{ marginVertical: 10, fontWeight: 'bold', fontSize: 20 }} >"No History"</Text>
							<TouchableOpacity onPress={this.getHistoryData} style={{ backgroundColor: 'cyan', borderRadius: 15 }} >
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
});