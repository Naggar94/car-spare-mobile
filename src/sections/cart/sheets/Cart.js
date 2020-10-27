import React from 'react';
import { View, Text, TextInput, I18nManager, Platform, TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import i18n from '../../../i18n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Cart extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			counter: this.props.bottomSheetItem?this.props.bottomSheetItem.counter:0
		}
	}

	render(){
		return(
			<KeyboardAwareScrollView style={{
				height:"100%",
				backgroundColor:"white",
			}}>
				<View
					style={{
						padding: 10,
						height: "100%",
						paddingBottom:20,
						alignItems:"center",
						flexDirection:"column",
					}}
				>
					<View style={{
						backgroundColor:"rgba(0,0,0,0.4)",
						width:"40%",
						height:5,
						borderRadius:10
					}}>
					</View>
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
						}}>{this.props.bottomSheetItem?this.props.bottomSheetItem.name:""}</Text>
						<TextInput style={{
							backgroundColor:"#f5f6f8",
							borderColor:'rgba(0,0,0,0.1)',
							borderWidth:1,
							height:50,
							width:"100%",
							marginTop:10,
							paddingHorizontal:10,
						}} defaultValue={this.props.bottomSheetItem?this.props.bottomSheetItem.counter.toString():""}
						autoCompleteType="off"
						keyboardType={"numeric"}
						textAlign={i18n.locale == 'en'?"left":"right"}
						onChangeText={(count) => {
							if(count != "" && parseInt(count) > 0){
								this.setState({counter:parseInt(count)});
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
						}} onPress={() => {this.props.onAcceptChangingItemCount(this.state.counter)}}>
							<Text style={{
								color:"#FFFFFF",
								fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
								fontSize:18,
							}}>{i18n.t('cart.bottomSheetChange')}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAwareScrollView>
		);
	}
}