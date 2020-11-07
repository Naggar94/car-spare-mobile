import React from 'react';
import { View, Text, TextInput, I18nManager, Platform, TouchableOpacity,Keyboard } from 'react-native';
import { connect } from 'react-redux';
import actions from './../actions';
import i18n from '../i18n';

class ChangeCartQuantity extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return{
			title:i18n.t('cart.ChangeCartQuantity.title'),
		}
	};

	constructor(props) {
		super(props)
		this.state = {
			bottomSheetItem: this.props.navigation.state.params.bottomSheetItem
		}
    }

    onAcceptChangingItemCount = () => {
    	this.props.ChangePartCount(this.state.bottomSheetItem,this.props.cart);
    	this.props.navigation.goBack(null);
    }

    render(){
    	return(
	    	<View
				style={{
					backgroundColor: 'white',
					padding: 10,
					height: "100%",
					paddingBottom:20,
					alignItems:"center",
					flexDirection:"column",
				}}
			>
				<View style={{
					flexWrap:'wrap',
					width:"100%",
					alignItems:"flex-start",
					padding:10,
				}}>
					<Text style={{
						fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
						fontSize:20,
					}}>{i18n.t('cart.bottomSheetTitle')}</Text>
					<Text style={{
						fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
						fontSize:17,
						color:"rgba(0,0,0,0.5)",
						marginTop:10,
					}}>{this.state.bottomSheetItem?this.state.bottomSheetItem.name:""}</Text>
					<TextInput style={{
						backgroundColor:"#f5f6f8",
						borderColor:'rgba(0,0,0,0.1)',
						borderWidth:1,
						height:50,
						width:"100%",
						marginTop:10,
						paddingHorizontal:10,
					}} defaultValue={this.state.bottomSheetItem?this.state.bottomSheetItem.counter.toString():""}
					autoCompleteType="off"
					keyboardType={"numeric"}
					textAlign={i18n.locale == 'en'?"left":"right"}
					onChangeText={(count) => {
						if(count != "" && parseInt(count) > 0){
							let bottomSheetItem = this.state.bottomSheetItem;
							bottomSheetItem.counter = parseInt(count);
							this.setState({bottomSheetItem});
						}
					}}></TextInput>
				</View>
				<View style={{
					flex:1,
					padding:10,
					width:"100%",
				}}>
					<TouchableOpacity style={{
						backgroundColor:"#357541",
						alignItems:"center",
						justifyContent:"center",
						height:50,
						width:"100%",
						marginTop:10,
						borderRadius:10,
					}} onPress={() => {this.onAcceptChangingItemCount()}}>
						<Text style={{
							color:"#FFFFFF",
							fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
							fontSize:18,
						}}>{i18n.t('cart.bottomSheetChange')}</Text>
					</TouchableOpacity>
				</View>
			</View>
	    );
    }
}

const mapStateToProps = (state) => {
	return {
		cart: state.cart.list,
	}
}

const mapDispatchToProps = () => {
	return actions
}

export default connect(mapStateToProps,mapDispatchToProps())(ChangeCartQuantity);