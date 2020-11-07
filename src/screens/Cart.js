import React from 'react';
import { Text, View, I18nManager, TouchableOpacity, TouchableWithoutFeedback, BackHandler, Platform, TextInput, Keyboard } from 'react-native';
import CartProgress from './../components/CartProgress';
import CustomFastImage from './../components/CustomFastImage';
import i18n from '../i18n';
import CartItemsList from './../sections/cart/Items';
import AddressView from './../sections/cart/Address';
import PaymentView from './../sections/cart/Payment';
import AwesomeAlert from 'react-native-awesome-alerts';
import CartBottomSheet from './../sections/cart/sheets/Cart';
import AddressBottomSheet from './../sections/cart/sheets/Address';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { connect } from 'react-redux';
import actions from './../actions';

class Cart extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return{
			title:i18n.t('cart.title'),
		}
	};

	constructor(props) {
		super(props);
		this.sheetRef = React.createRef();
		this.state = {
			showTint:false,
			screen:3,
			showLoadingAlert:false,
			bottomSheetItem:null,
			addresses:[]
		};
	}

	setBottomSheetItem = (bottomSheetItem) => {
		this.setState({bottomSheetItem})
	}

	setAddresses = (addresses) => {
		this.setState({addresses})
	}

	showTint = async (show = true) => {
		await this.setState({showTint:show});
		if(!show){
			this.doShowBottomSheet(show);
		}
	}

	removeTint = () => {
		this.showTint(false);
	}

	addressPage = () => {
		this.setState({screen:2});
	}

	itemsPage = () => {
		this.setState({screen:1});
	}

	paymentPage = () => {
		this.setState({screen:3});
	}

	shoeLoadingAlert = (showLoadingAlert = true) => {
		this.setState({showLoadingAlert})
	}

	componentDidMount = () => {
		this.props.navigation.addListener('willFocus', this.componentDidAppear);
		this.props.navigation.addListener('willBlur', this.componentDidBlur);
	}

	componentWillUnMount = () => {
		BackHandler.removeEventListener('hardwareBackPress', this._handleBackButton);
	}

	componentDidAppear = () => {
		BackHandler.addEventListener('hardwareBackPress', (this._handleBackButton));
	}

	componentDidBlur = () => {
		BackHandler.removeEventListener('hardwareBackPress', this._handleBackButton);
	}

	_handleBackButton = () => {
		if(this.state.screen == 2){
			this.setState({screen:1})
		}else if(this.state.screen == 3){
			this.setState({screen:2});
		}else{
			if(this.state.showTint && Platform.OS == 'android'){
				this.doShowBottomSheet(false);
			}else{
				this.props.navigation.navigate('Home');	
			}
		}
		return true;
    }

	renderContent = () => {
		if(this.state.screen == 1){
			return(
				<CartBottomSheet 
					bottomSheetItem={this.state.bottomSheetItem}
					onAcceptChangingItemCount={this.onAcceptChangingItemCount} />
			)
		}else{
			return(
				<AddressBottomSheet 
					showLoadingAlert={this.showLoadingAlert}
					addresses={this.state.addresses}/>
			)
		}
	}

	onAcceptChangingItemCount = (counter) => {
		let bottomSheetItem = this.state.bottomSheetItem;
		bottomSheetItem.counter = counter;
		this.setState({bottomSheetItem});
		this.props.ChangePartCount(bottomSheetItem,this.props.cart);
		this.doShowBottomSheet(false);
	}

	doShowBottomSheet = (show = true) => {
		Keyboard.dismiss();
		if(this.state.showTint || show){
			this.showTint(show);
		}
		this.sheetRef.current.snapTo(show?0:1);
	}

	render(){
		return(
			<View style={{
				height:"100%",
				width:"100%",
				backgroundColor:"#FFFFFF",
				flexDirection:"column",
			}}>
				{
					this.state.showTint?
					<View style={{
						position:"absolute",
						height:"100%",
						width:"100%",
						backgroundColor:"rgba(0,0,0,0.5)",
						zIndex:Platform.OS == 'ios'?2:2,
					}}>
						<TouchableWithoutFeedback onPress={() => {
							//this.closeBottomSheet();
							this.showTint(false);
						}} style={{
							width:"100%",
							height:"100%",
						}}>
							<View style={{
								width:"100%",
								height:"100%",
							}}>
							</View>
						</TouchableWithoutFeedback>
					</View>
					:
					null
				}


				<CartProgress screen={this.state.screen} />

				<View style={{
					flex:5,
				}}>
					{
						this.state.screen == 1?
						<CartItemsList 
							showTint={this.showTint} 
							isTintShowed={this.state.showTint} 
							addressPage={this.addressPage}
							setBottomSheetItem={this.setBottomSheetItem}
							doShowBottomSheet={this.doShowBottomSheet}/>
						:
						this.state.screen == 2?
						<AddressView 
							showTint={this.showTint} 
							isTintShowed={this.state.showTint} 
							itemsPage={this.itemsPage}
							showLoadingAlert={this.showLoadingAlert}
							setAddresses={this.setAddresses}
							doShowBottomSheet={this.doShowBottomSheet}
							paymentPage={this.paymentPage}/>
						:
						<PaymentView 
							showTint={this.showTint} 
							isTintShowed={this.state.showTint} 
							addressPage={this.addressPage}
							itemsPage={this.itemsPage}/>
						}

				</View>
				<AwesomeAlert
					show={this.state.showLoadingAlert}
					showProgress={true}
					progressSize={20}
					progressColor={"#000000"}
					closeOnTouchOutside={false}
					closeOnHardwareBackPress={false}
					title={i18n.t('General.loading')}
				/>

				<BottomSheet
					ref={this.sheetRef}
					snapPoints={Platform.OS == 'ios'?['65%', 0]:['45%',0]}
					borderRadius={10}
					renderContent={this.renderContent}
					initialSnap={1}
					onCloseEnd={this.removeTint}
					enabledInnerScrolling={true}
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

export default connect(mapStateToProps,mapDispatchToProps())(Cart);