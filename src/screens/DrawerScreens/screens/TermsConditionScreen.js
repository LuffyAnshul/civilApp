import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default class TermsConditionScreen extends React.Component {
	render() {
		return (
			<SafeAreaView style={{flex: 1}}>
				<View style={{flex: 1, padding: 16}}>
					<View
						style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
						}}>
						<Text
						style={{
							fontSize: 20,
							textAlign: 'center',
							marginBottom: 16,
						}}>
						This is the Terms And Condition Screen
						</Text>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	btnView: {
		flexDirection: 'row', 
		justifyContent: 'space-around', 
		marginVertical: 30
	},
	touchableBtn: {
		height: 40, 
		backgroundColor: 'red', 
		justifyContent: 'center', 
		paddingHorizontal: 10, 
		borderRadius: 10, 
		elevation: 5 
	}
});