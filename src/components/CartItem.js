import React from 'react';
import { Text, View, I18nManager, TouchableOpacity } from 'react-native';
import CustomFastImage from './CustomFastImage';
import Icon from 'react-native-vector-icons/Ionicons';

export default class CartItem extends React.Component {
	constructor(props) {
		super(props);
	}

	render(){
		return(
			<View style={{
				height:150,
				flexDirection:"row",
				borderTopWidth:1,
				borderTopColor:"rgba(0, 0, 0, 0.2)"
			}}>
				<View style={{
					flex:3,
					justifyContent:"center",
					alignItems:"center",
				}}>
					<CustomFastImage width={90} height={90} src={this.props.image?this.props.image:"https://www.carlogos.org/logo/Chevrolet-logo-2013-2560x1440.png"}></CustomFastImage>
				</View>

				<View style={{
					flex:4,
					flexDirection:"column",
					paddingVertical:20,
					paddingLeft:10,
				}}>
					<View style={{
						flex:1,
						justifyContent:"center",
						alignItems:"flex-start",
					}}>
						<Text style={{
							fontFamily:"Robotobold",
							fontSize:20,
							color:"#034d7e",
						}} numberOfLines={1}
						ellipsizeMode={"tail"}>{this.props.name}</Text>
					</View>

					<View style={{
						flex:1,
						justifyContent:"center",
						alignItems:"flex-start",
					}}>
						<Text style={{
							fontFamily:"Robotobold",
							fontSize:15,
							color:"#98999b",
						}} numberOfLines={1}
						ellipsizeMode={"tail"}>08:00 AM-12:00 PM</Text>
					</View>

					<View style={{
						flex:1,
						justifyContent:"center",
						alignItems:"flex-start",
					}}>
						<Text style={{
							fontFamily:"Robotobold",
							fontSize:15,
							color:"#98999b",
						}} numberOfLines={1}
						ellipsizeMode={"tail"}>#2211-93189</Text>
					</View>

				</View>

				<View style={{
					flex:3.5,
					justifyContent:"center",
					alignItems:"center",
					width:"100%",
				}}>
					<View style={{
						flexDirection:"row",
						width:"100%",
						height:40,
						paddingLeft:10,
					}}>
						<View style={{
							flex:1,
							borderRadius:5,
							backgroundColor:"#fce1da",
						}}>
							<TouchableOpacity style={{
								width:"100%",
								height:"100%",
								justifyContent:"center",
								alignItems:"center",
							}} onPress={() => {
								let item = {};
								item.id = this.props.id;
								console.log(item);
								this.props.increment(item);
							}}>
								<Text style={{
									fontFamily:"Robotobold",
									fontSize:20,
									color:"#f35257"
								}}>+</Text>
							</TouchableOpacity>
						</View>

						<View style={{
							flex:1,
							justifyContent:"center",
							alignItems:"center",
						}}>
							<Text style={{
								fontFamily:"Robotobold",
								fontSize:20,
								color:"#000000",
							}}>{this.props.count}</Text>
						</View>

						<View style={{
							flex:1,
							borderRadius:5,
							backgroundColor:"#fce1da",
						}}>
							<TouchableOpacity style={{
								width:"100%",
								height:"100%",
								justifyContent:"center",
								alignItems:"center",
							}} onPress={() => {
								if(this.props.count == 1){
									let item = {};
									item.id = this.props.id;
									this.props.remove(item);
								}else{
									let item = {};
									item.id = this.props.id;
									this.props.decrement(item);
								}
							}}>
								<Text style={{
									fontFamily:"Robotobold",
									fontSize:20,
									color:"#f35257"
								}}>{this.props.count == 1?(<Icon name="trash" size={20} />):"-"}</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		);
	}
}