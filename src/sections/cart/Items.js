import React from 'react';
import { View, Text, TextInput, I18nManager, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import actions from './../../actions';
import CustomFastImage from '../../components/CustomFastImage';
import Icon from 'react-native-vector-icons/Ionicons';
import i18n from '../../i18n';
import { FlatList } from 'react-navigation';
import FlatListEmptyView from './../../components/FlatListEmptyView';
import CartItem from './../../components/CartItem';
import AsyncStorage from '@react-native-community/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';

class Items extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	doShowBottomSheet = (item) => {
		this.props.setBottomSheetItem(item);
		this.props.doShowBottomSheet();
	}

	closeBottomSheet = () => {
		this.props.doShowBottomSheet(false);
		this.removeTint();
	}

	IncrementItem = (payload) => {
		this.props.IncrementPartCount(payload,this.props.cart)
	}

	DecrementItem = (payload) => {
		this.props.DecrementPartCount(payload,this.props.cart)
	}

	DeleteItem = (payload) => {
		this.props.RemovePartCount(payload,this.props.cart)
	}

	removeTint = () => {
		this.props.showTint(false);
	}

	componentDidUpdate() {
		if(!this.props.isTintShowed){
			this.closeBottomSheet();
		}
	}

	render(){
		return(
			<View style={{
				height:"100%",
				flexDirection:"column",
			}}>
				<View style={{
					flex:4,
				}}>
					<FlatList
						data={this.props.cart}
						contentContainerStyle={{
							padding:15,
							height:this.props.cart.length == 0 ?"100%":"auto",
							width:this.props.cart.length == 0 ?"100%":"auto",
						}}
						ListEmptyComponent={() => {
							return(
								<FlatListEmptyView />
							)
						}}
						renderItem={ ({item,index}) => {
							return(
								<CartItem 
									key={item.id}
									id={item.id}
									image={item.image}
									name={item.name}
									modelName={item.modelName}
									count={item.count}
									increment={this.IncrementItem}
									decrement={this.DecrementItem}
									remove={this.DeleteItem}
									counter={this.doShowBottomSheet} />
							)
						}}
						keyExtractor={(item,index) => item.id}
					/>

				</View>

				<View style={{
					flex:1,
					justifyContent:"center",
					alignItems:"center",
				}}>
					<TouchableOpacity style={{
						width:"90%",
						height:60,
						backgroundColor:this.props.cart.length > 0 ?"#034d7e":"#8a8a8a",
						justifyContent:"center",
						alignItems:"center",
						borderRadius:9,
					}} onPress={async () => {
						if(this.props.cart.length > 0){
							try{
								var loggedUser = await AsyncStorage.getItem('loggedUser');
								if(loggedUser != null){
									this.props.addressPage();
								}else{
									this.setState({showErrorAlert:true});
								}
							}catch(e){

							}
						}
					}}><Text style={{
						color:"#FFFFFF",
						fontSize:18,
						fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
					}}>{i18n.t('cart.butToShippingInfo')}</Text></TouchableOpacity>
				</View>
				<AwesomeAlert
					show={this.state.showErrorAlert}
					closeOnTouchOutside={true}
					closeOnHardwareBackPress={true}
					showProgress={false}
					showConfirmButton={true}
					confirmText={i18n.t('cart.okMessage')}
					title={i18n.t('cart.notAuthenticatedTitle')}
					message={i18n.t('cart.notAuthenticatedMessage')}
					onConfirmPressed={async () => {
						await this.setState({showErrorAlert:false});
					}}
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

export default connect(mapStateToProps,mapDispatchToProps())(Items);