import React from 'react';
import { View, Text, TextInput, I18nManager, Platform, TouchableOpacity,Keyboard } from 'react-native';
import { connect } from 'react-redux';
import actions from './../../actions';
import CustomFastImage from '../../components/CustomFastImage';
import Icon from 'react-native-vector-icons/Ionicons';
import i18n from '../../i18n';
import { FlatList } from 'react-navigation';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import FlatListEmptyView from './../../components/FlatListEmptyView';
import CartItem from './../../components/CartItem';
import AsyncStorage from '@react-native-community/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';

class Items extends React.Component {
	constructor(props) {
		super(props);
		this.sheetRef = React.createRef();
		this.state = {
			isTintShowed:false,
			bottomSheetItem:null
		};
	}

	doShowBottomSheet = (item) => {
		this.props.showTint();
		this.setState({bottomSheetItem:item,isTintShowed:true});
		this.sheetRef.current.snapTo(0);
	}

	closeBottomSheet = () => {
		Keyboard.dismiss();
		this.sheetRef.current.snapTo(1);
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

	onAcceptChangingItemCount = () => {
		this.props.ChangePartCount(this.state.bottomSheetItem,this.props.cart);
		this.closeBottomSheet();
	}

	removeTint = () => {
		this.setState({isTintShowed:false});
		this.props.showTint(false);
	}

	componentDidUpdate() {
		if(!this.props.isTintShowed && this.state.isTintShowed){
			this.closeBottomSheet();
		}
	}

	renderContent = () => {
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
					backgroundColor:"rgba(0,0,0,0.4)",
					width:"40%",
					height:5,
					borderRadius:10
				}}>
				</View>
				<View style={{
					flex:2,
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
		)
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

				<BottomSheet
					ref={this.sheetRef}
					snapPoints={['35%', 0]}
					borderRadius={10}
					renderContent={this.renderContent}
					initialSnap={1}
					onCloseEnd={this.removeTint}
				/>
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