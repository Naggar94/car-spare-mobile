import React from 'react';
import { View, ActivityIndicator, TouchableOpacity, Text, Platform } from 'react-native';
import FastImage from "react-native-fast-image";
import CustomFastImage from './CustomFastImage';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import actions from './../actions';

class TypeCard extends React.Component {
	constructor(props) {
		super(props);
	}

	render(){
		return(
			<TouchableOpacity style={{
				borderColor:"rgba(0,0,0,0.1)",
				borderWidth:1,
				borderRadius:5,
				width:"100%",
				height:"100%",
				justifyContent:"center",
				alignItems:"center"
			}} onPress={() => {
				if(this.props.pressable){
					this.props.preesableAction(this.props.id);
				}else{
					this.props.ResetFilter();
					this.props.SetType(this.props.id);
					this.props.navigation.navigate('ModelGridList');
				}
			}}>
				<Text style={{
					fontSize:20,
					fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold"
				}}>{this.props.name?this.props.name:'لا يوجد'}</Text>
				<CustomFastImage width={70} height={70} src={this.props.image?this.props.image:"https://www.carlogos.org/logo/Chevrolet-logo-2013-2560x1440.png"}></CustomFastImage>
			</TouchableOpacity>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		
	}
}

const mapDispatchToProps = () => {
	return actions
}

export default connect(mapStateToProps,mapDispatchToProps())(withNavigation(TypeCard));