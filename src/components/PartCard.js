import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomFastImage from './CustomFastImage';

export default class PartCard extends React.Component {
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
					justifyContent:"center",
					width:"100%"
				}}>
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
						fontFamily:"Robotobold",
					}}>{this.props.name}</Text>

					<View style={{
						flex:1.5,
						justifyContent:"flex-start",
					}}>
						<Text style={{
							color:"#FFFFFF",
							fontSize:14,
							fontFamily:"Robotobold",
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
    							fontFamily:"Robotobold",
							}}>
								السعر: {this.props.price} ج.م
							</Text>
						</View>
						<View style={{
							flex:1,
							justifyContent:"center",
							alignItems:"flex-end",
						}}>
							<View style={{
								backgroundColor:"#cd9500",
								width:170,
								height:40,
								borderRadius:10,
								justifyContent:"center",
								alignItems:"flex-start",
								padding:10,
								flexDirection:"row"
							}}>
								<Text style={{
									flex:10,
									color:"#FFFFFF",
									fontSize:15
								}}>اضف الي عربة الشراء</Text>
								<Icon name="cart" size={20} color={"#FFFFFF"} style={{flex:2}}/>
							</View>
						</View>
					</View>
				</View>
			</View>
		);
	}
}