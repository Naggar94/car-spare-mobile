import React from 'react';
import { Text, View, I18nManager, TouchableOpacity, TouchableWithoutFeedback, Platform, TextInput } from 'react-native';
import CartProgress from './../components/CartProgress';
import CustomFastImage from './../components/CustomFastImage';
import i18n from '../i18n';
import CartItemsList from './../sections/cart/Items';

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
		};
	}

	showTint = (show = true) => {
		this.setState({showTint:show});
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

				<CartProgress />

				<View style={{
					flex:5,
				}}>
					<CartItemsList showTint={this.showTint} isTintShowed={this.state.showTint}/>
				</View>
			</View>
		);
	}
}