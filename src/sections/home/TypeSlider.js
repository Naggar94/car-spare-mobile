import React from 'react';
import { View, Text, TextInput, TouchableOpacity, I18nManager, Platform } from 'react-native';
import CustomFastImage from '../../components/CustomFastImage';
import { FlatList } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import actions from './../../actions';

class TypeSlider extends React.Component {
	constructor(props) {
		super(props);
		I18nManager.allowRTL(true);
		I18nManager.forceRTL(true);
		this.state = {
			renderedIndex:0,
		};
	}

	render(){
		return(
			<View style={{
				alignItems:"flex-start",
			}}>
				<FlatList
					style={{height:"100%"}}
					contentContainerStyle={{alignItems:"center"}}
					showsHorizontalScrollIndicator={false}
					data={this.props.types}
					horizontal={true}
					renderItem={ ({item,index}) => {
		    			return(
		    				<TouchableOpacity key={item._id} style={{
		    					padding:10,
		    					borderColor:"#000000",
		    					borderWidth:1,
		    					borderRadius:10,
		    					height:"80%",
		    					marginHorizontal:5,
		    					backgroundColor:this.state.renderedIndex == index?"#034d7e":"#FFFFFF",
		    				}} onPress={async () => {
		    					if(index != this.state.renderedIndex){
			    					this.setState({renderedIndex:index});
			    					await this.props.SetType(item._id);
			    					this.props.refresh();
			    				}
		    				}}>
		    					<Text style={{fontSize:16,fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",color:this.state.renderedIndex == index?"#FFFFFF":"#000000",}}>{item.type}</Text>
		    				</TouchableOpacity>
		    			);
		    		}}
					keyExtractor={(item,index) => item._id}
				/>
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

export default connect(mapStateToProps,mapDispatchToProps())(TypeSlider);