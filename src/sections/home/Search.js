import React from 'react';
import { View, Text, TextInput, I18nManager, Platform, TouchableOpacity } from 'react-native';
import CustomFastImage from '../../components/CustomFastImage';
import Icon from 'react-native-vector-icons/Ionicons';
import i18n from '../../i18n';
import { FlatList } from 'react-navigation';
import FlatListEmptyView from '../../components/FlatListEmptyView';
import { connect } from 'react-redux';
import actions from './../../actions';
import { withNavigation } from 'react-navigation';

class Search extends React.Component {
	constructor(props) {
		super(props);
	}

	render(){
		return(
			<FlatList
				contentContainerStyle={{
					height:"auto",
					width:"auto",
				}}
				data={this.props.items}
				ListEmptyComponent={() => {
					return(
						<FlatListEmptyView />
					)
				}}
				renderItem={ ({item,index}) => {
					return(
						<TouchableOpacity key={item.modelId} style={{
							height:65,
							borderBottomColor: 'black',
							borderBottomWidth: 2,
							justifyContent:"center",
							paddingLeft:10,
						}} onPress={() => {
							this.props.SetModel(item.brandId,item.brandName);
							this.props.SetSubModel(item.modelId);
							this.props.navigation.navigate('ManufactureDateList');
						}}>
							<Text style={{fontSize:20,fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",alignSelf:"flex-start"}}>{item.type}</Text>
						</TouchableOpacity>
					);
				}}
				keyExtractor={(item,index) => item.modelId}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {

	}
}

const mapDispatchToProps = () => {
	return actions
}

export default connect(mapStateToProps,mapDispatchToProps())(withNavigation(Search));