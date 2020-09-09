import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class FlatListEmptyView extends React.Component {
	constructor(props) {
		super(props);
	}

	render(){
		return(
			<View style={{
				height:"100%",
				width:"100%",
				justifyContent:"center",
				alignItems:"center",
			}}>
				<Icon name="warning" size={70} color={"#034d7e"} />
				<Text style={{
					fontSize:20,
					fontFamily:"Robotobold",
				}}>عفوا لا يوجد بيانات حاليا</Text>
			</View>
		);
	}
}