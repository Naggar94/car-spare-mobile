import React from 'react';
import { Text, View, I18nManager, TouchableOpacity, TouchableWithoutFeedback, Platform, TextInput } from 'react-native';
import CartProgress from './../components/CartProgress';
import CustomFastImage from './../components/CustomFastImage';
import i18n from '../i18n';
import CartItemsList from './../sections/cart/Items';
import AddressView from './../sections/cart/Address';
import AwesomeAlert from 'react-native-awesome-alerts';

export default class Cart extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return{
			title:i18n.t('cart.title'),
		}
	};

	constructor(props) {
		super(props);
		this.state = {
			showTint:false,
			screen:2,
			showLoadingAlert:false,
		};
	}

	showTint = (show = true) => {
		console.log(show);
		this.setState({showTint:show});
	}

	addressPage = () => {
		this.setState({screen:2});
	}

	itemsPage = () => {
		this.setState({screen:1});
	}

	shoeLoadingAlert = (showLoadingAlert = true) => {
		this.setState({showLoadingAlert})
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
						zIndex:2,
					}}>
						<TouchableWithoutFeedback onPress={() => {
							//this.closeBottomSheet();
							this.setState({showTint:false});
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
						<CartItemsList showTint={this.showTint} isTintShowed={this.state.showTint} addressPage={this.addressPage}/>
						:
						<AddressView 
							showTint={this.showTint} 
							isTintShowed={this.state.showTint} 
							itemsPage={this.itemsPage}
							showLoadingAlert={this.showLoadingAlert}/>
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
			</View>
		);
	}
}