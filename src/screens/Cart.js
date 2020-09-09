import React from 'react';
import { Text, View, I18nManager, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import actions from './../actions';
import CartProgress from './../components/CartProgress';
import CustomFastImage from './../components/CustomFastImage';
import { FlatList } from 'react-navigation';
import FlatListEmptyView from './../components/FlatListEmptyView';
import CartItem from './../components/CartItem';

class Cart extends React.Component {
	static navigationOptions = {
		title: 'الدفع',
	};
	constructor(props) {
		super(props);
		I18nManager.allowRTL(true);
		I18nManager.forceRTL(true);
		this.state = {
			parts:["1","2","3"]
		};
	}

	render(){
		return(
			<View style={{
				height:"100%",
				width:"100%",
				backgroundColor:"#FFFFFF",
				flexDirection:"column",
			}}>

				<CartProgress />

				<View style={{
					flex:4,
				}}>
					<FlatList
						data={this.state.parts}
						contentContainerStyle={{
							padding:15,
							height:this.state.parts.length == 0 ?"100%":"auto",
							width:this.state.parts.length == 0 ?"100%":"auto",
						}}
						ListEmptyComponent={() => {
							return(
								<FlatListEmptyView />
							)
						}}
						renderItem={ ({item,index}) => {
			    			return(
								<CartItem key={item} />
			    			)
			    		}}
			    		keyExtractor={(item,index) => item}
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
						backgroundColor:this.state.parts.length > 0 ?"#034d7e":"#8a8a8a",
						justifyContent:"center",
						alignItems:"center",
						borderRadius:9,
					}}><Text style={{
						color:"#FFFFFF",
						fontSize:18,
						fontFamily:"Robotobold",
					}}>بيانات التوصيل</Text></TouchableOpacity>
				</View>

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