import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'SQLite.db', location: 'default', createFromLocation: '~SQLite.db' });

export default class AddCategoryScreen extends React.Component {

	constructor(props) {
		super(props);
		this.categoryTitle = React.createRef();
		this.categoryDescription = React.createRef();
		this.state = {
			navigation: props.navigation,
			categoryTitle: '',
			categoryDescription: ''
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

	async uploadCategoryToDB () {

		const { categoryTitle, categoryDescription } = this.state;

		let res = await this.ExecuteQuery("INSERT INTO category (categoryTitle, categoryDescription) VALUES (?,?)", [categoryTitle, categoryDescription]);

		if (res.rowsAffected > 0) {
			return true;
		}
		return false;
	}

	checkInfo = () => {
		const { categoryTitle, categoryDescription, navigation } = this.state;

		if (categoryTitle != '') {
			if (categoryDescription != '') {
				if (this.uploadCategoryToDB()) {
					return navigation.goBack();
				}
				return alert('Category Registration Failed');
			}
			return alert('Description cannot be empty');
		}
		return alert('Title cannot be empty');
	}

	render() {

		return (
			<SafeAreaView style={{flex: 1}}>
				<ScrollView 
					style={{ margin: 15, borderRadius: 30, backgroundColor: '#fff' }} 
					showsVerticalScrollIndicator={false} 
					contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
				>

					{/* Category Title */}
					<View style={styles.details}>
						<TextInput
							mode="outlined"
							label="Category Title"
							placeholder="Category Title" 
							returnKeyType="next"
							blurOnSubmit={false}
							ref={this.categoryTitle}
							value={this.state.categoryTitle}
							onChangeText={ (categoryTitle) => this.setState({ categoryTitle })}
							onSubmitEditing={() => this.categoryDescription.current.focus()}
							style={styles.inputStyles}
						/>
					</View>

					{/* Category Description */}
					<View style={styles.details}>
						<TextInput
							mode="outlined"
							label="Category Description"
							placeholder="Category Description" 
							returnKeyType="done"
							ref={this.categoryDescription}
							value={this.state.categoryDescription}
							onChangeText={ (categoryDescription) => this.setState({ categoryDescription })}
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