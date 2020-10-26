import React from 'react';
import { Text, View, ActivityIndicator, Platform, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import TypeSlider from "./../sections/home/TypeSlider";
import BasedTypePartsList from "./../sections/home/BasedTypePartsList";
import { connect } from 'react-redux';
import actions from './../actions';
import PartProvider from '../providers/Part';
import TypeProvider from '../providers/Type';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import i18n from '../i18n';
import AwesomeAlert from 'react-native-awesome-alerts';


class PartsList extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return{
			title:i18n.t('parts.title'),
		}
	};

	constructor(props) {
		super(props);
		this.sheetRef = React.createRef();
		this.initialState = {
			showLoadingAlert:false,
			refreshing:false,
			parts:[],
			hasLoadedParts:false,
			showTint:false,
			bottomSheetItem:{},
		}
		this.state = {
			...this.initialState,
			types:[],
			hasLoadedTypes:false,
			initialLoadingForParts:false,
			initialLoadingForTypes:false,
		}
    }

    componentDidMount = () => {
    	this._loadTypes();
		this._loadData();
	}

	_loadTypes = async () => {
		let response = await TypeProvider.fetch();
		let types = response.data.categories;
		let typeIndex = types.findIndex(x => x._id === this.props.type);
		if(typeIndex != -1){
			let firstIndex = types[0];
			types[0] = types[typeIndex];
			types[typeIndex] = firstIndex;
		}
		this.setState({types:types,hasLoadedTypes:true,initialLoadingForTypes:true});
	}

	_loadData = async () => {
		try{
			let response = await PartProvider.fetch(this.props.model,this.props.submodel,this.props.date,this.props.type);
			console.log(response.spareParts);
			let state = {
				hasLoadedParts:true,
				parts:response.spareParts,
				refreshing:false,
				initialLoadingForParts:true,
			};
			this.setState(state);
		}catch(e){
			console.log(e);
			//Show Error View
		}
	}

	_onRefresh = () => {
		console.log(this.props.model);
		console.log(this.props.submodel);
		console.log(this.props.date);
		console.log(this.props.type);
		this.setState(this.initialState);
		this._loadData();
	}

	doShowBottomSheet = (item) => {
		this.setState({showTint:true,bottomSheetItem:item});
		this.sheetRef.current.snapTo(0);
	}

	closeBottomSheet = () => {
		this.sheetRef.current.snapTo(1);
		this.removeTint();
	}

	removeTint = () => {
		this.setState({showTint:false});
	}

	onAcceptAddingItemToCart = () => {
		this.props.AddToCart(this.state.bottomSheetItem,this.props.cart);
		this.closeBottomSheet();
	}

	showLoadingAlertDialog = (showLoadingAlert = true) => {
		this.setState({showLoadingAlert});
	}

	onLoadingModalDismiss = () => {

	}

	onFavoriteRemove = (index) => {
		let parts = this.state.parts;
		parts[index].favourite = false;
		this.setState({parts});
	}

	setFavorite = (index) => {
		let parts = this.state.parts;
		parts[index].favourite = true;
		this.setState({parts});
	}

	renderContent = () => {
		return(
			<View
				style={{
					backgroundColor: 'white',
					padding: 10,
					height: "100%",
					paddingBottom:20,
					alignItems:"center"
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
					width:"100%",
					alignItems:"flex-start",
					padding:10,
				}}>
					<Text style={{
						fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
						fontSize:20,
					}}>{i18n.t('parts.bottomSheetTitle')}</Text>
					<Text style={{
						fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
						fontSize:17,
						color:"rgba(0,0,0,0.5)",
						marginTop:10,
					}}>{this.state.bottomSheetItem?this.state.bottomSheetItem.name:""}</Text>
				</View>
				<View style={{
					width:"100%",
					flexDirection:"row",
					alignItems:"center"
				}}>
					<View style={{
						flex:1,
						alignItems:"center",
						justifyContent:"center",
						height:"70%",
						paddingHorizontal:10,
					}}>
						<TouchableOpacity style={{
							backgroundColor:"#357541",
							alignItems:"center",
							justifyContent:"center",
							height:"80%",
							width:"100%",
							borderRadius:10,
						}} onPress={() => {this.onAcceptAddingItemToCart()}}>
							<Text style={{
								color:"#FFFFFF",
								fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
								fontSize:18,
							}}>{i18n.t('parts.bottomSheetAccept')}</Text>
						</TouchableOpacity>
					</View>
					<View style={{
						flex:1,
						alignItems:"center",
						justifyContent:"center",
						height:"70%",
						paddingHorizontal:10,
					}}>
						<TouchableOpacity style={{
							backgroundColor:"#821c00",
							alignItems:"center",
							justifyContent:"center",
							height:"80%",
							width:"100%",
							borderRadius:10,
						}} onPress={() => {this.closeBottomSheet()}}>
							<Text style={{
								color:"#FFFFFF",
								fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
								fontSize:18,
							}}>{i18n.t('parts.bottomSheetReject')}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		)
	}

    render(){
    	return(
    		this.state.initialLoadingForParts && this.state.initialLoadingForTypes?
				<View style={{
					backgroundColor:"#FFFFFF",
					height:"100%",
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
					<View style={{
						flex:1,
						width:"100%"
					}}>
						<TypeSlider types={this.state.types} refresh={this._onRefresh} />
					</View>
					<View style={{
						flex:10,
						width:"100%",
					}}>
						{
							this.state.hasLoadedParts?
								<BasedTypePartsList 
									parts={this.state.parts} 
									refresh={this._onRefresh} 
									refreshing={this.state.refreshing} 
									showBottomSheet={this.doShowBottomSheet} 
									showLoadingAlertDialog={this.showLoadingAlertDialog}
									setFavorite={this.setFavorite}
									onFavoriteRemove={this.onFavoriteRemove} />
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
					<BottomSheet
						ref={this.sheetRef}
						snapPoints={['25%', 0]}
						borderRadius={10}
						renderContent={this.renderContent}
						initialSnap={1}
						onCloseEnd={this.removeTint}
					/>
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
	    );
    }
}

const mapStateToProps = (state) => {
	return {
		type: state.filter.type,
		submodel: state.filter.submodel,
		model: state.filter.model,
		date: state.filter.date,
		cart: state.cart.list,
	}
}

const mapDispatchToProps = () => {
	return actions
}

export default connect(mapStateToProps,mapDispatchToProps())(PartsList);