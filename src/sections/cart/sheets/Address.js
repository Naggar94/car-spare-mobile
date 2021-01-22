import React from 'react';
import { View, Text, TextInput, I18nManager, Platform, TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import i18n from '../../../i18n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddressProvider from './../../../providers/Address';

export default class Address extends React.Component {
	constructor(props){
		super(props);
		this.streetAddressRef = React.createRef(); 
		this.buildingInfoRef = React.createRef(); 
		this.mobileNumberRef = React.createRef(); 
		this.addressNameRef = React.createRef(); 
		this.state = {
			showAddAddressPanel:false,
			textInputState:[
				{
					focused:false,
					error:false
				},
				{
					focused:false,
					error:false
				},
				{
					focused:false,
					error:false
				},
				{
					focused:false,
					error:false
				},
			],
			address:{
				streetAddress:"",
				buildingInfo:"",
				mobileNumber:"",
				addressName:"",
			},
		}
	}

	submitAddress = async () => {
		this.props.showLoadingAlert();
		let textInputState = this.state.textInputState;
		let hasFoundError = false;
		if(this.state.address.streetAddress == ""){
			hasFoundError = true;
			textInputState[0].error = true;
		}

		if(this.state.address.buildingInfo == ""){
			hasFoundError = true;
			textInputState[1].error = true;
		}

		if(this.state.address.mobileNumber == ""){
			hasFoundError = true;
			textInputState[2].error = true;
		}

		if(this.state.address.addressName == ""){
			hasFoundError = true;
			textInputState[3].error = true;
		}

		if(hasFoundError){
			return;
		}

		let address = {
			address:this.state.address.streetAddress,
			buildingInfo:this.state.address.buildingInfo,
			phoneNumber:this.state.address.mobileNumber,
			addressName:this.state.address.addressName,
		}

		try{
			let response = await AddressProvider.add(address);
			if(response.status){
				let addresses = await AddressProvider.fetch;
				if(addresses.status){
					this.setState({addresses:addresses.address});
				}
			}
		}catch(err){
			console.log("Error in address submition");
			console.log(err);
		}

		this.props.showLoadingAlert(false);
	}

	render(){
		return(
			<View style={{
				backgroundColor: 'white',
				padding: 10,
				minHeight:"100%",
				paddingBottom:20,
				alignItems:"center",
				flexDirection:"column",
			}}>
				<View style={{
					backgroundColor:"rgba(0,0,0,0.4)",
					width:"40%",
					height:5,
					borderRadius:10
				}}>
				</View>
				{
					this.state.showAddAddressPanel?
					<View style={{
						width:"100%",
						padding:10,
					}}>
						<View style={{
							width:"100%",
							height:70,
							borderBottomWidth:1,
							borderColor: this.state.textInputState[0].error?'red':"rgba(0,0,0,0.2);",
							justifyContent:"center",
							alignItems:"flex-start",
						}}>
							<TouchableOpacity style={{
								height:"100%",
								width:"100%",
								backgroundColor:"rgba(0,0,0,0)",
								position:"absolute",
								zIndex:this.state.textInputState[0].focused?0:2,
							}} onPress={() => {
								let textInputState = this.state.textInputState;
								textInputState[0].focused = true;
								this.setState({textInputState});
								this.streetAddressRef.current.focus();
							}}>
							</TouchableOpacity>
							<TextInput 
								ref={this.streetAddressRef}
								style={{
									height:"100%",
									width:"100%",
								}}
								textAlign={I18nManager.isRTL?'right':'left'}
								placeholder={i18n.t('cart.Address.textInputStreetAddress')}
								placeholderTextColor="#000"
								onChange={(text) => {
									this.setState({'address.streetAddress':text});
								}}
								onBlur={e => {
									let textInputState = this.state.textInputState;
									textInputState[0].focused = false;
									this.setState({textInputState});
								}}
							/>
						</View>

						<View style={{
							width:"100%",
							height:70,
							borderBottomWidth:1,
							borderColor: this.state.textInputState[1].error?'red':"rgba(0,0,0,0.2);",
							justifyContent:"center",
							alignItems:"flex-start",
						}}>
							<TouchableOpacity style={{
								height:"100%",
								width:"100%",
								backgroundColor:"rgba(0,0,0,0)",
								position:"absolute",
								zIndex:this.state.textInputState[1].focused.focused?0:2,
							}} onPress={() => {
								let textInputState = this.state.textInputState;
								textInputState[1].focused = true;
								this.setState({textInputState});
								this.buildingInfoRef.current.focus();
							}}>
							</TouchableOpacity>
							<TextInput 
								ref={this.buildingInfoRef}
								style={{
									height:"100%",
									width:"100%",
								}}
								textAlign={I18nManager.isRTL?'right':'left'}
								placeholder={i18n.t('cart.Address.textInputBuildingInfo')}
								placeholderTextColor="#000"
								onChange={(text) => {
									this.setState({'address.buildingInfo':text});
								}}
								onBlur={e => {
									let textInputState = this.state.textInputState;
									textInputState[1].focused = false;
									this.setState({textInputState});
								}}
							/>
						</View>

						<View style={{
							width:"100%",
							height:70,
							borderBottomWidth:1,
							borderColor: this.state.textInputState[2].error?'red':"rgba(0,0,0,0.2);",
							justifyContent:"center",
							alignItems:"flex-start",
						}}>
							<TouchableOpacity style={{
								height:"100%",
								width:"100%",
								backgroundColor:"rgba(0,0,0,0)",
								position:"absolute",
								zIndex:this.state.textInputState[2].focused?0:2,
							}} onPress={() => {
								let textInputState = this.state.textInputState;
								textInputState[2].focused = true;
								this.setState({textInputState});
								this.mobileNumberRef.current.focus();
							}}>
							</TouchableOpacity>
							<TextInput 
								ref={this.mobileNumberRef}
								style={{
									height:"100%",
									width:"100%",
								}}
								textAlign={I18nManager.isRTL?'right':'left'}
								placeholder={i18n.t('cart.Address.textInputMobileNumber')}
								placeholderTextColor="#000"
								onChange={(text) => {
									this.setState({'address.mobileNumber':text});
								}}
								onBlur={e => {
									let textInputState = this.state.textInputState;
									textInputState[2].focused = false;
									this.setState({textInputState});
								}}
							/>
						</View>

						<View style={{
							width:"100%",
							height:70,
							borderBottomWidth:1,
							borderColor: this.state.textInputState[3].error?'red':"rgba(0,0,0,0.2);",
							justifyContent:"center",
							alignItems:"flex-start",
						}}>
							<TouchableOpacity style={{
								height:"100%",
								width:"100%",
								backgroundColor:"rgba(0,0,0,0)",
								position:"absolute",
								zIndex:this.state.textInputState[3].focused.focused?0:2,
							}} onPress={() => {
								let textInputState = this.state.textInputState;
								textInputState[3].focused = true;
								this.setState({textInputState});
								this.addressNameRef.current.focus();
							}}>
							</TouchableOpacity>
							<TextInput 
								ref={this.addressNameRef}
								style={{
									height:"100%",
									width:"100%",
								}}
								textAlign={I18nManager.isRTL?'right':'left'}
								placeholder={i18n.t('cart.Address.textInputAddressName')}
								placeholderTextColor="#000"
								onChange={(text) => {
									this.setState({'address.addressName':text});
								}}
								onBlur={e => {
									let textInputState = this.state.textInputState;
									textInputState[3].focused = false;
									this.setState({textInputState});
								}}
							/>
						</View>

						<View style={{
							height:50,
							width:"100%",
						}}>
							<TouchableOpacity style={{
								backgroundColor:"#357541",
								alignItems:"center",
								justifyContent:"center",
								height:"100%",
								width:"100%",
								marginTop:10,
								borderRadius:10,
							}}>
								<Text style={{
									color:"#FFFFFF",
									fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
									fontSize:18,
								}}>{i18n.t('cart.bottomSheetAdd')}</Text>
							</TouchableOpacity>
						</View>
					</View>
					:
					<View style={{
						width:"100%",
					}}>
						<View style={{
							height:50,
							width:"100%",
						}}>
							<TouchableOpacity style={{
								backgroundColor:"#357541",
								alignItems:"center",
								justifyContent:"center",
								height:"100%",
								width:"100%",
								marginTop:10,
								borderRadius:10,
							}} onPress={() => {
								this.setState({showAddAddressPanel:true});
							}}>
								<Text style={{
									color:"#FFFFFF",
									fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
									fontSize:18,
								}}>{i18n.t('cart.bottomSheetAdd')}</Text>
							</TouchableOpacity>
						</View>

						<View>

							{
								this.props.addresses.length > 0 ?
								this.props.addresses.map((item) => {
									return (
										<View key={item} style={{
											height:100,
											width:"100%",
											alignItems:"flex-start",
											padding:10,
											marginTop:10,
											flexDirection:"row",
										}}>
											<View style={{
												flex:4,
												height:"100%",
												alignItems:"flex-start"
											}}>
												<Text style={{
													fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
													fontSize:20,
													color:"#000000"
												}}>Address 1</Text>
												<Text style={{
													fontFamily:Platform.OS === 'ios'?"Roboto-Regular":"Robotoregular",
													fontSize:17,
													color:"#000000",
													marginTop:10,
												}}>12 adham street</Text>
												<Text style={{
													fontFamily:Platform.OS === 'ios'?"Roboto-Regular":"Robotoregular",
													fontSize:17,
													color:"#000000",
												}}>Block 4,32</Text>
											</View>
											<View style={{
												flex:1,
												height:"100%",
											}}>
											</View>
										</View>
									)
								})
								:
								<View style={{
									marginTop:50,
									justifyContent:"center",
									alignItems:"center"
								}}>
									<Icon name="warning" size={70} color={"#034d7e"} />
									<Text style={{
										fontSize:20,
										fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
									}}>{i18n.t('FlatListEmpty.alert')}</Text>
								</View>
							}

						</View>
					</View>
				}
			</View>
		);
	}
}