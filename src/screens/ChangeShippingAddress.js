import React from 'react';
import { View, Text, TextInput, I18nManager, Platform, TouchableOpacity,Keyboard,RefreshControl, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import actions from './../actions';
import i18n from '../i18n';
import AwesomeAlert from 'react-native-awesome-alerts';
import { FlatList } from 'react-navigation';
import FlatListEmptyView from '../components/FlatListEmptyView';
import AddressProvider from './../providers/Address';

class ChangeShippingAddress extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return{
			title:i18n.t('cart.ChangeShippingAddress.title'),
		}
	};

	constructor(props) {
		super(props);
		this.streetAddressRef = React.createRef(); 
		this.buildingInfoRef = React.createRef(); 
		this.mobileNumberRef = React.createRef(); 
		this.addressNameRef = React.createRef(); 
		this.state = {
			showLoadingAlert:false,
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
			refreshing:false,
			isLoading:false,
			addresses:this.props.navigation.state.params.addresses
		}
    }

    _onRefresh = () => {
		this.setState({isLoading:true});
		this.loadAddresses()
		//this.props.navigation.state.params.loadAddresses();
	}

	loadAddresses = async () => {
		try{
			let addressResponse = await AddressProvider.fetch();
			console.log(addressResponse);
			this.props.navigation.state.params.setAddresses(addressResponse.address);
			this.setState({isLoading:false,addresses:addressResponse.address});
		}catch(e){
			console.log("Error Fetching Addresses");
			console.log(e);
		}
	}

    showLoadingAlert = (showLoadingAlert = true) => {
    	this.setState({showLoadingAlert})
    }

    submitAddress = async () => {
		this.showLoadingAlert();
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
			this.showLoadingAlert(false);
			return;
		}

		let address = {
			streetAddress:this.state.address.streetAddress,
			buildingInfo:this.state.address.buildingInfo,
			mobileNumber:this.state.address.mobileNumber,
			addressName:this.state.address.addressName,
		}

		try{
			let response = await AddressProvider.add(address);
			console.log(response.status);
			if(response.status){
				let addresses = await AddressProvider.fetch();
				if(addresses.status){
					this.setState({isLoading:true,showAddAddressPanel:false});
					this.loadAddresses();
				}
			}
		}catch(err){
			console.log("Error in address submition");
			console.log(err);
		}

		this.showLoadingAlert(false);
	}

    render(){
		return(
			<View style={{
				backgroundColor: 'white',
				padding: 10,
				height:"100%",
				minHeight:"100%",
				alignItems:"center",
				flexDirection:"column",
			}}>
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
								onChangeText={(text) => {
									let address = this.state.address;
									address.streetAddress = text;
									this.setState({address});
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
								onChangeText={(text) => {
									let address = this.state.address;
									address.buildingInfo = text;
									this.setState({address});
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
								onChangeText={(text) => {
									let address = this.state.address;
									address.mobileNumber = text;
									this.setState({address});
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
								onChangeText={(text) => {
									let address = this.state.address;
									address.addressName = text;
									this.setState({address});
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
							}} onPress={()=>{
								this.submitAddress();
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
						height:"100%",
						width:"100%",
						flexDirection:'column'
					}}>
						<View style={{
							height:"85%"
						}}>
							{
								!this.state.isLoading?
								<FlatList
									style={{
										height:"100%",
									}}
									contentContainerStyle={{
										height:this.state.addresses.length == 0 ?"100%":"auto",
										width:this.state.addresses.length == 0 ?"100%":"auto",
									}}
									refreshControl={
										<RefreshControl
											refreshing={this.state.refreshing}
											onRefresh={this._onRefresh}
										/>
									}
									data={this.state.addresses}
									ListEmptyComponent={() => {
										return(
											<FlatListEmptyView />
										)
									}}
									renderItem={ ({item,index}) => {
										return(
											<TouchableOpacity key={item._id} style={{
												height:100,
												width:"100%",
												justifyContent:'flex-start',
												alignItems:"flex-start",
												flexDirection:"row",
											}} onPress={() => {
												this.props.SetAddress(item._id,item.addressName);
												this.props.navigation.goBack(null);
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
													}}>{item.addressName}</Text>
													<Text style={{
														fontFamily:Platform.OS === 'ios'?"Roboto-Regular":"Robotoregular",
														fontSize:17,
														color:"#000000",
													}}>{item.buildingInfo}</Text>
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
											</TouchableOpacity>
										);
									}}
									keyExtractor={(item,index) => item._id}
								/>
								:
								<View 
									style={{
										width:"100%",
										height:"100%",
										backgroundColor:"#FFF",
										justifyContent:"center",
									}}>
									<ActivityIndicator size="large" color="#034d7e">
									</ActivityIndicator>
								</View>
							}

						</View>
						<View style={{
							flexWrap:'wrap',
							width:"100%",
						}}>
							<TouchableOpacity style={{
								backgroundColor:"#357541",
								alignItems:"center",
								justifyContent:"center",
								height:50,
								width:"100%",
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
					</View>
				}

				<AwesomeAlert
					show={this.state.showLoadingAlert}
					showProgress={true}
					progressSize={20}
					progressColor={"#000000"}
					closeOnTouchOutside={false}
					closeOnHardwareBackPress={false}
					title={i18n.t('General.loading')}
				/>
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

export default connect(mapStateToProps,mapDispatchToProps())(ChangeShippingAddress);