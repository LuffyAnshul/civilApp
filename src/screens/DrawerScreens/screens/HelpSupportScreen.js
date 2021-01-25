import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableHighlight, Linking } from 'react-native';

export default class HelpSupportScreen extends React.Component {
	render() {
		return (
			<SafeAreaView >
				<ScrollView>
					<View style={styles.container}>
						<Text style={styles.titleStyles} >Support FAQ's</Text>
					</View>
					<View style={styles.container}>
						<Image 
							source={require('../../../assets/DB.png')} 
							style={{ height: 100, width: 130 }}
						/>
					</View>
					<View style={[styles.container, { paddingHorizontal: 20 }]}>
						<Text style={styles.privacyStyles}>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry.
						</Text>
						<Text style={styles.privacyStyles}>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry.
						</Text>
						<Text style={styles.privacyStyles}>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry.
						</Text>
						<TouchableHighlight
							activeOpacity={0.6}
							underlayColor="#DDDDDD"
							style={{ padding: 20, borderRadius: 10 }}
							onPress={() => Linking.openURL('mailto:contactus@dummycontact.in')} 
						>
							<Text style={{ borderBottomWidth: 1 }} >
								contactus@dummycontact.in
							</Text>
						</TouchableHighlight>
					</View>
				</ScrollView>
			</SafeAreaView>
		
		);
	}
}

const styles = StyleSheet.create({
	container: { 
		flex: 1, 
		alignItems: 'center', 
		marginVertical: 20 
	},
	titleStyles: { 
		fontSize: 20, 
		fontWeight: 'bold' 
	},
	privacyStyles: { 
		textAlign: 'center', 
		marginVertical: 10 
	}
});