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

	IncrementItem = (payload) => {
		this.props.IncrementPartCount(payload,this.props.cart)
	}

	DecrementItem = (payload) => {
		this.props.DecrementPartCount(payload,this.props.cart)
	}

	DeleteItem = (payload) => {
		this.props.RemovePartCount(payload,this.props.cart)
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
									count={item.count}
									increment={this.IncrementItem}
									decrement={this.DecrementItem}
									remove={this.DeleteItem} />
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