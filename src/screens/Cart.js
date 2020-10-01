import React from 'react';
import { Text, View, I18nManager, TouchableOpacity, TouchableWithoutFeedback, Platform, TextInput, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import actions from './../actions';
import CartProgress from './../components/CartProgress';
import CustomFastImage from './../components/CustomFastImage';
import { FlatList } from 'react-navigation';
import FlatListEmptyView from './../components/FlatListEmptyView';
import CartItem from './../components/CartItem';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import i18n from '../i18n';

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
			bottomSheetItem:null
		};
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

	doShowBottomSheet = (item) => {
		this.setState({showTint:true,bottomSheetItem:item});
		this.sheetRef.current.snapTo(0);
	}

	closeBottomSheet = () => {
		Keyboard.dismiss();
		this.sheetRef.current.snapTo(1);
		this.removeTint();
	}

	removeTint = () => {
		this.setState({showTint:false});
	}

	onAcceptChangingItemCount = () => {
		console.log("hi");
		this.props.ChangePartCount(this.state.bottomSheetItem,this.props.cart);
		this.closeBottomSheet();
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
							this.closeBottomSheet();
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