import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'SQLite.db', location: 'default', createFromLocation: '~SQLite.db' });

export default class EditSubCategoryScreen extends React.Component {

	constructor(props) {
		super(props);
		this.subCategoryTitle = React.createRef();
		this.state = {
			navigation: props.navigation,
			params: props.route.params.item,
			subCategoryID: null,
			subCategoryTitle: '',
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
		let { subCategoryID, subCategoryTitle } = this.state.params;

		this.setState({ subCategoryID, subCategoryTitle })
	}

	async updateSubCategoryToDB (subCategoryID, subCategoryTitle) {
		let res = await this.ExecuteQuery("UPDATE subcategory SET subCategoryTitle = ? WHERE subCategoryID = ?", [subCategoryTitle, subCategoryID]);

		console.log(res);
		if (res.rowsAffected > 0) {
			return true;
		}
		return false;
	}

	checkInfo = () => {
		const { subCategoryID, subCategoryTitle, navigation } = this.state;

		if (subCategoryTitle != '') {
			if (this.updateSubCategoryToDB(subCategoryID, subCategoryTitle)) {
				return navigation.goBack();
			}
			return alert('Sub-Category Registration Failed');
		}
		return alert('Sub-Category Title cannot be Empty');
	}

	render() {
		return (
			<SafeAreaView style={{flex: 1}}>
				<ScrollView 
					style={{ margin: 15, borderRadius: 30, backgroundColor: '#fff' }} 
					showsVerticalScrollIndicator={false} 
					contentContainerStyle={{ justifyContent: 'center', paddingVertical: 30 }}
				>

					{/* Sub Category Update */}
					<View style={styles.details}>
						<TextInput
							mode="outlined"
							label="Sub-Category Title"
							placeholder="Sub-Category Title" 
							returnKeyType="done"
							ref={this.subCategoryTitle}
							value={this.state.subCategoryTitle}
							onChangeText={ (subCategoryTitle) => this.setState({ subCategoryTitle })}
							style={styles.inputStyles}
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