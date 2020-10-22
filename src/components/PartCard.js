import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomFastImage from './CustomFastImage';
import { connect } from 'react-redux';
import actions from './../actions';
import FavoriteProvider from './../providers/Favorite';
import i18n from '../i18n';

class PartCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			
		};
	}

	render(){
		return(
			<View style={{
				width:"100%",
				height:400,
				borderWidth:1,
				borderRadius:15,
				backgroundColor:"#FFFFFF",
				borderColor:"#000000",
				flexDirection:"column",
				marginBottom:15,
			}}>
				<View style={{
					borderBottomWidth:0,
					flex:4,
					width:"100%"
				}}>
					<TouchableOpacity style={{
						position:"absolute",
						width:60,
						height:60,
						zIndex:1000,
						alignSelf:"flex-end",
						alignItems:"center",
						justifyContent:"center"
					}} onPress={async () => {
						if(!this.props.isFavorite){
							this.props.showLoadingAlertDialog();
							try{
								let response = await FavoriteProvider.add(this.props.id,
									this.props.mainCategoryId,
									this.props.modelYear,
									this.props.modelId,
									this.props.brandId);
								console.log(response);
								if(response.status){
									this.props.setFavorite(this.props.itemIndex);
								}
							}catch(err){
								console.log(err);
							}

							this.props.showLoadingAlertDialog(false);
						}else{
							this.props.showLoadingAlertDialog();
							try{
								let response = await FavoriteProvider.remove(this.props.id);
								if(response.status){
									this.props.onFavoriteRemove(this.props.itemIndex);
								}
							}catch(err){
								console.log(err);
							}

							this.props.showLoadingAlertDialog(false);
						}
					}}>
						<Icon name={this.props.isFavorite?"heart":"heart-outline"} size={35} color={"#821c00"} />
					</TouchableOpacity>
					<CustomFastImage width={"100%"} height={"100%"} src={this.props.image?this.props.image:"https://www.carlogos.org/logo/Chevrolet-logo-2013-2560x1440.png"}></CustomFastImage>
				</View>
				<View style={{
					flex:3,
					borderBottomRightRadius:15,
					borderBottomLeftRadius:15,
					backgroundColor:"#034d7e",
					flexDirection:"column",
					justifyContent:"center",
					alignItems:"flex-start",
					padding:10,
				}}>
					<Text style={{
						flex:1,
						color:"#FFFFFF",
						fontSize:20,
						fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
					}}>{this.props.name}</Text>

					<View style={{
						flex:1.5,
						justifyContent:"flex-start",
					}}>
						<Text style={{
							color:"#FFFFFF",
							fontSize:14,
							fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
						}}>
    						{this.props.description}
						</Text>
					</View>

					<View style={{
						flex:1,
						flexDirection:"row",
					}}>
						<View style={{
							flex:1,
							alignItems:"flex-start",
							justifyContent:"center",
						}}>
							<Text style={{
    							color:"#FFFFFF",
    							fontSize:18,
    							fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
							}}>
								{i18n.t('parts.price')}: {this.props.price} ج.م
							</Text>
						</View>
						<View style={{
							flex:1,
							justifyContent:"center",
							alignItems:"flex-end",
						}}>
							{
								!this.props.doNotShowAddToCart?
								<TouchableOpacity style={{
									backgroundColor:"#cd9500",
									width:170,
									height:40,
									borderRadius:10,
									justifyContent:"center",
									alignItems:"flex-start",
									padding:10,
									flexDirection:"row"
								}} onPress={() => {
									let item = {};
									item.id = this.props.id;
									item.price = this.props.price;
									item.name = this.props.name;
									item.image = this.props.image;
									item.modelName = this.props.modelName;
									item.count = 1;

									this.props.showBottomSheet(item);
									//this.props.AddToCart(item,this.props.cart);
								}}>
									<Text style={{
										flex:10,
										color:"#FFFFFF",
										fontSize:15
									}}>{i18n.t('parts.addToCart')}</Text>
									<Icon name="cart" size={20} color={"#FFFFFF"} style={{flex:2}}/>
								</TouchableOpacity>
								:
								null
							}
						</View>
					</View>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cart: state.cart.list,
		modelName:state.filter.modelName,
	}
}

const mapDispatchToProps = () => {
	return actions
}

export default connect(mapStateToProps,mapDispatchToProps())(PartCard);