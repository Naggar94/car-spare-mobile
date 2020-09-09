import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import TypeCard from '../../components/TypeCard';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import actions from './../../actions'
import FontisoIcon from 'react-native-vector-icons/Fontisto';

class Type extends React.Component {
	constructor(props) {
		super(props);
	}

	render(){
		return(
			<View style={{
				width:"100%",
				height:400,
				marginTop:10,
				padding:10,
				flexDirection:"column",
			}}>
				<Text style={{
					flex:1,
					fontFamily:"Robotobold",
					fontSize:23,
					color:"#034d7e",
				}}>اختر حسب نوع قطع الغيار</Text>
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
							this.props.categories.slice(0,3).map((value,key) => {
								return(
									<View 
										key={value.mainCategoryId}
										style={{
											flex:1,
											padding:5,
											width:"100%",
											height:"100%",
										}}
									>
										<TypeCard name={value.type} id={value.mainCategoryId} image={value.typeImgURL} />
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
							this.props.categories.slice(3,6).map((value,key) => {
								return(
									<View 
										key={value.mainCategoryId}
										style={{
											flex:1,
											padding:5,
											width:"100%",
											height:"100%",
										}}
									>
										<TypeCard name={value.type} id={value.mainCategoryId} image={value.typeImgURL} />
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
						this.props.navigation.navigate('TypeGridList');
					}}>
						<Text style={{
							fontSize:15
						}}>
							جميع قطع الغيار
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
		model: state.filter.model,
	}
}

const mapDispatchToProps = () => {
	return actions
}

export default connect(mapStateToProps,mapDispatchToProps())(withNavigation(Type));