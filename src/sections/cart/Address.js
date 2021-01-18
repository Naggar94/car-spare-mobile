import React from 'react';
import { View, Text, TextInput, I18nManager, Platform, TouchableOpacity,Keyboard, ActivityIndicator } from 'react-native';
import CustomFastImage from '../../components/CustomFastImage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import i18n from '../../i18n';
import { FlatList, withNavigation } from 'react-navigation';
import FlatListEmptyView from './../../components/FlatListEmptyView';
import CartItem from './../../components/CartItem';
import AddressProvider from './../../providers/Address';
import { connect } from 'react-redux';
import actions from './../../actions';

class Address extends React.Component {
	constructor(props) {
		super(props);
		//this.sheetRef = React.createRef();
		this.tintRemovalCallCounter = 0;
		this.listeners = [];
		this.state = {
			note:"",
			hasLoadedData:false,
			selectedAddress:null,
			addresses:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19"],
		};
	}

	doShowBottomSheet = () => {
		this.props.setAddresses(this.state.addresses);
		this.props.doShowBottomSheet();
		this.tintRemovalCallCounter = 0;
	}

	closeBottomSheet = () => {
		this.props.doShowBottomSheet(false);
		this.removeTint();
	}

	removeTint = () => {
		this.props.showTint(false);
	}

	componentDidMount = async () => {
		//console.log(this.props.navigation);
		try{
			let addressResponse = await AddressProvider.fetch();
			console.log(addressResponse);
			this.setState({hasLoadedData:true,addresses:addressResponse.address});
		}catch(e){
			console.log("Error Fetching Addresses");
			console.log(e);
			this.props.itemsPage();
		}
		
	}

	setAddresses = (addresses) => {
		this.setState({addresses});
	}

	componentDidUpdate() {
		if(!this.props.isTintShowed && this.tintRemovalCallCounter == 0){
			console.log("BOTTOMSHEET REMOVAL");
			this.tintRemovalCallCounter++;
			this.closeBottomSheet();
		}
	}

	render(){
		return(
			<View style={{
				height:"100%",
				width:"100%",
			}}>
				{
					this.state.hasLoadedData?
					<View style={{
						height:"100%",
						flexDirection:"column",
					}}>
						<View style={{
							flex:4,
						}}>
							<TouchableOpacity style={{
								width:"100%",
								padding:10,
								height:75,
								borderTopWidth:1,
								borderBottomWidth:1,
								borderColor: "rgba(0,0,0,0.2);",
								justifyContent:"center",
								alignItems:"flex-start",
								flexDirection:"row",
							}} onPress={() => {
								if(Platform.OS == 'android' || Platform.OS == 'ios'){
									this.props.navigation.navigate('ChangeShippingAddress',{
										addresses: this.state.addresses,
										setAddresses: this.setAddresses
									});
								}else{
									this.doShowBottomSheet()
								}
							}}>
								<View style={{
									flexWrap: "wrap",
									height:"100%",
									justifyContent:"center",
									alignItems:"flex-start"
								}}>
									<Text style={{
										fontSize:20,
										fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
										paddingHorizontal:10
									}}>{this.props.addressId == ""?i18n.t('cart.noDeliveryAddressMSG'):this.props.addressName}</Text>
								</View>

								<View style={{
									flex: 1,
									height:"100%",
									justifyContent:"center",
									alignItems:"flex-start"
								}}>
									<Icon name="keyboard-arrow-down" size={25} color={"#000000"} />
								</View>

							</TouchableOpacity>

							<View style={{
								width:"100%",
								padding:10,
								height:75,
								borderBottomWidth:1,
								borderColor: "rgba(0,0,0,0.2);",
								justifyContent:"center",
								alignItems:"flex-start",
							}}>
								<TextInput 
								style={{
									width:"100%",
								}}
								onChangeText={(note) => {
									this.setState({note})
								}}
								textAlign={I18nManager.isRTL?'right':'left'}
								placeholder={i18n.t('cart.deliveryNotesPlaceholder')}/>

							</View>
						</View>

						<View style={{
							flex:1,
							justifyContent:"center",
							alignItems:"center",
						}}>
							<TouchableOpacity style={{
								width:"90%",
								height:60,
								backgroundColor:"#034d7e",
								justifyContent:"center",
								alignItems:"center",
								borderRadius:9,
							}} onPress={() => {
								if(this.props.addressId != ""){
									//Navigate To Payment
									this.props.SetNote(this.state.note);
									this.props.paymentPage();
								}
							}}><Text style={{
								color:"#FFFFFF",
								fontSize:18,
								fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
							}}>{i18n.t('cart.butToPayment')}</Text></TouchableOpacity>
						</View>
					</View>
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
		)
	}
}

const mapStateToProps = (state) => {
	return {
		addressId: state.address.addressId,
		addressName: state.address.addressName,
	}
}

const mapDispatchToProps = () => {
	return actions
}

export default connect(mapStateToProps,mapDispatchToProps())(withNavigation(Address));