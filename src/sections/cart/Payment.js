import React from 'react';
import { View, Text, TextInput, I18nManager, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import actions from './../../actions';
import CustomFastImage from '../../components/CustomFastImage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import i18n from '../../i18n';
import { withNavigation } from 'react-navigation';
import AwesomeAlert from 'react-native-awesome-alerts';
import OrderProvider from './../../providers/Order';

class Payment extends React.Component {
	constructor(props) {
		super(props);
		this.listeners = [];
		this.state = {
			total:0,
			shipping:50,
			showLoadingAlert:false,
			showStatusAlert:false,
			transactionSuccess:false,
			message:"",
		};
	}

	componentDidMount = () => {
		if(this.props.addressId == ""){
			this.props.itemsPage();
		}

		let total = 0;
		this.props.cart.forEach(item => {
			total += item.count * item.price;
			this.setState({total});
		})
	}

	onLoadingModalDismiss = () => {
		this.setState({showStatusAlert:true});
	}

	onStatusAlertDismiss = () => {
		if(this.state.transactionSuccess){
			this.props.ResetAddress();
			this.props.ResetCart();
			this.props.itemsPage();
			this.props.navigation.navigate('Home');
		}
	}

	onPaymentSubmit = async () => {
		this.setState({showLoadingAlert:true});
		try{
			let parts = [];
			this.props.cart.forEach(item => {
				let part = {};
				part.partId = item.id;
				part.NumberOfPieces = item.count;
				parts.push(part);
			})
			let order = {};
			order.parts = parts;
			order.address = this.props.addressId;

			let response = await OrderProvider.submit(order);
			if(response.status){
				this.setState({showLoadingAlert:false,message:i18n.t('cart.Payment.success'),transactionSuccess:true});
			}else{
				this.setState({showLoadingAlert:false,message:i18n.t('cart.Payment.failure'),transactionSuccess:false});
			}
		}catch(e){
			this.setState({showLoadingAlert:false,message:i18n.t('cart.Payment.failure'),transactionSuccess:false});
		}
	}

	render(){
		return(
			<View style={{
				height:"100%",
				flexDirection:"column",
			}}>
				<View style={{
					flex:3,
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
						//Call OrderProvider Submit
					}}>
						<View style={{
							flex: 1,
							height:"100%",
							justifyContent:"center",
							alignItems:"flex-start"
						}}>
							<Text style={{
								fontSize:20,
								fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
								paddingHorizontal:10
							}}>{i18n.t('cart.Payment.cashOnDelivery')}</Text>
						</View>

						<View style={{
							flex: 1,
							height:"100%",
							justifyContent:"center",
							alignItems:"flex-end"
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
							textAlign={I18nManager.isRTL?'right':'left'}
							placeholder={i18n.t('cart.Payment.voucher')}/>

					</View>
				</View>
				<View style={{
					flex:4,
					justifyContent:"flex-end"
				}}>
					<View style={{
						width:"100%",
						padding:10,
						height:50,
						justifyContent:"center",
						alignItems:"flex-start",
						flexDirection:"row",
					}}>
						<View style={{
							flexWrap: 'wrap',
							height:"100%",
							justifyContent:"center",
							alignItems:"flex-start"
						}}>
							<Text style={{
								fontSize:20,
								fontFamily:Platform.OS === 'ios'?"Roboto-Regular":"Robotoregular",
								paddingHorizontal:10,
								color:"#070537",
							}}>{i18n.t('cart.Payment.totalOrders')}</Text>
						</View>

						<View style={{
							flex: 1,
							height:"100%",
							justifyContent:"center",
							alignItems:"flex-end"
						}}>
							<Text style={{
								fontSize:20,
								fontFamily:Platform.OS === 'ios'?"Roboto-Regular":"Robotoregular",
								paddingHorizontal:10,
								color:"#625e81"
							}}>{this.state.total} {i18n.t('cart.Payment.egp')}</Text>
						</View>
					</View>

					<View style={{
						width:"100%",
						padding:10,
						height:50,
						justifyContent:"center",
						alignItems:"flex-start",
						flexDirection:"row",
					}}>
						<View style={{
							flexWrap: 'wrap',
							height:"100%",
							justifyContent:"center",
							alignItems:"flex-start"
						}}>
							<Text style={{
								fontSize:20,
								fontFamily:Platform.OS === 'ios'?"Roboto-Regular":"Robotoregular",
								paddingHorizontal:10,
								color:"#070537",
							}}>{i18n.t('cart.Payment.shipping')}</Text>
						</View>

						<View style={{
							flex: 1,
							height:"100%",
							justifyContent:"center",
							alignItems:"flex-end"
						}}>
							<Text style={{
								fontSize:20,
								fontFamily:Platform.OS === 'ios'?"Roboto-Regular":"Robotoregular",
								paddingHorizontal:10,
								color:"#625e81"
							}}>{this.state.shipping} {i18n.t('cart.Payment.egp')}</Text>
						</View>
					</View>

					<View style={{
						width:"100%",
						padding:10,
						height:75,
						borderTopWidth:1,
						borderBottomWidth:1,
						borderColor: "rgba(0,0,0,0.2);",
						justifyContent:"center",
						alignItems:"flex-start",
						flexDirection:"row",
					}}>
						<View style={{
							flexWrap: 'wrap',
							height:"100%",
							justifyContent:"center",
							alignItems:"flex-start"
						}}>
							<Text style={{
								fontSize:20,
								fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
								paddingHorizontal:10
							}}>{i18n.t('cart.Payment.total')}</Text>
						</View>

						<View style={{
							flex: 1,
							height:"100%",
							justifyContent:"center",
							alignItems:"flex-end"
						}}>
							<Text style={{
								fontSize:20,
								fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
								paddingHorizontal:10
							}}>{this.state.total + this.state.shipping} {i18n.t('cart.Payment.egp')}</Text>
						</View>
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
							this.onPaymentSubmit();
						}
					}}><Text style={{
						color:"#FFFFFF",
						fontSize:18,
						fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
					}}>{i18n.t('cart.Payment.pay')}</Text></TouchableOpacity>
				</View>

				<AwesomeAlert
					show={this.state.showLoadingAlert}
					onDismiss={this.onLoadingModalDismiss}
					showProgress={true}
					progressSize={20}
					progressColor={"#000000"}
					closeOnTouchOutside={false}
					closeOnHardwareBackPress={false}
					title={i18n.t('General.loading')}
				/>

				<AwesomeAlert
					show={this.state.showStatusAlert}
					onDismiss={this.onStatusAlertDismiss}
					closeOnTouchOutside={false}
					closeOnHardwareBackPress={false}
					showProgress={false}
					showConfirmButton={true}
					confirmText="OK"
					title="Alert"
					message={this.state.message}
					onConfirmPressed={() => {
						this.setState({showStatusAlert:false});
					}}
				/>
			</View>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		addressId: state.address.addressId,
		cart: state.cart.list,
	}
}

const mapDispatchToProps = () => {
	return actions
}

export default connect(mapStateToProps,mapDispatchToProps())(withNavigation(Payment));