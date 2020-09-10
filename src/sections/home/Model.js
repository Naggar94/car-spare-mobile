import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import FontisoIcon from 'react-native-vector-icons/Fontisto';
import ModelCard from '../../components/ModelCard';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import actions from './../../actions'

class Model extends React.Component {
	constructor(props) {
		super(props);
	}

	render(){
		return(
			<View style={{
				width:"100%",
				height:300,
				marginTop:10,
				padding:10,
				flexDirection:"column",
			}}>
				<Text style={{
					alignSelf:"flex-start",
					flex:1,
					fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
					fontSize:23,
					color:"#034d7e",
				}}>اختر حسب ماركة سيارتك</Text>
				<View
					style={{
						flexDirection:"column",
						flex:6,
					}}
				>
					<View
						style={{
							flexDirection:"row",
							flex:1,
						}}
					>
						{
							this.props.brands.slice(0,3).map((value,key) => {
								return(
									<View 
										key={value.brandId}
										style={{
											flex:1,
											padding:5,
											width:"100%",
											height:"100%",
										}}
									>
										<ModelCard id={value.brandId} image={value.logoURL} />
									</View>
								);
							})
						}
					</View>
					<View
						style={{
							flexDirection:"row",
							flex:1,
						}}
					>
						{
							this.props.brands.slice(3,6).map((value,key) => {
								return(
									<View 
										key={value.brandId}
										style={{
											flex:1,
											padding:5,
											width:"100%",
											height:"100%",
										}}
									>
										<ModelCard id={value.brandId} image={value.logoURL} />
									</View>
								);
							})
						}
					</View>
				</View>
				<View style={{
					flex:1,
					paddingHorizontal:10,
					flexDirection:"row"
				}}>
					<View
						style={{
							flex:1
						}}
					>
					</View>
					<TouchableOpacity style={{
						flex:1,
						flexDirection:"row",
						alignItems:"center",
						justifyContent:"flex-end",
						height:"100%",
					}} onPress={() => {
						this.props.ResetFilter();
						this.props.navigation.navigate('ModelGridList');
					}}>
						<Text style={{
							fontSize:15
						}}>
							جميع السيارات
						</Text>
						<FontisoIcon name="angle-left" size={15} style={{paddingRight:10}}/>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		
	}
}

const mapDispatchToProps = () => {
	return actions
}

export default connect(mapStateToProps,mapDispatchToProps())(withNavigation(Model));