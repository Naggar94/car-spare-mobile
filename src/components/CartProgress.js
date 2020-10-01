import React from 'react';
import { Text, View, I18nManager, Platform } from 'react-native';
import i18n from '../i18n';


export default class CartProgress extends React.Component {
	constructor(props) {
		super(props);
	}

	render(){
		return(
			<View style={{
				flex:1,
				justifyContent:"center",
				alignItems:"center",
				padding:20,
				flexDirection:"row",
			}}>
				<View style={{
					flex:1,
					justifyContent:"center",
					alignItems:"center",
				}}>
					<View style={{
						borderRadius:30,
						height:30,
						width:30,
						borderWidth:1,
						justifyContent:"center",
						alignItems:"center",
						backgroundColor:"#034d7e",
					}}>
						<Text style={{
							color:"#FFFFFF",
							fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
							fontSize:15
						}}>1</Text>
					</View>
					<Text style={{
						color:"#cd9500",
						fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
						fontSize:18
					}}>{i18n.t('cart.progressItem1')}</Text>
				</View>

				<View style={{
					flex:1,
					justifyContent:"center",
					alignItems:"center",
				}}>
					<View style={{
						borderRadius:30,
						height:30,
						width:30,
						borderWidth:1,
						borderColor:"#000000",
						justifyContent:"center",
						alignItems:"center",
						backgroundColor:"#FFFFFF",
					}}>
						<Text style={{
							color:"#034d7e",
							fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
							fontSize:15
						}}>2</Text>
					</View>
					<Text style={{
						color:"#cd9500",
						fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
						fontSize:18
					}}>{i18n.t('cart.progressItem2')}</Text>
				</View>

				<View style={{
					flex:1,
					justifyContent:"center",
					alignItems:"center",
				}}>
					<View style={{
						borderRadius:30,
						height:30,
						width:30,
						borderWidth:1,
						justifyContent:"center",
						alignItems:"center",
						backgroundColor:"#FFFFFF",
					}}>
						<Text style={{
							color:"#034d7e",
							fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
							fontSize:15
						}}>3</Text>
					</View>
					<Text style={{
						color:"#cd9500",
						fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
						fontSize:18
					}}>{i18n.t('cart.progressItem3')}</Text>
				</View>

			</View>
		);
	}
}