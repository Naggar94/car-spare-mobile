import React from 'react';
import { Text, View, TouchableOpacity,ActivityIndicator, RefreshControl} from 'react-native';
import { FlatList } from 'react-navigation';
import { connect } from 'react-redux';
import actions from './../actions'
import ModelProvider from '../providers/Model';
import FlatListEmptyView from '../components/FlatListEmptyView';

class SubModelList extends React.Component {
	static navigationOptions = {
	    title: 'اختر حسب ماركة سيارتك',
	};
	constructor(props) {
		super(props)
		this.initialState = {
			refreshing:false,
			submodels:[],
			hasLoadedData:false,
		}
		this.state = this.initialState;
    }

	componentDidMount = () => {
		this._loadData();
	}

	_loadData = async () => {
		try{
			let response = await ModelProvider.fetch(this.props.model);
			console.log(response.data);
			let state = {
				hasLoadedData:true,
				submodels:response.data.carModels,
				refreshing:false,
			};
			this.setState(state);
		}catch(e){
			//Show Error View
		}
	}

	_onRefresh = () => {
		this.setState(this.initialState);
		this._loadData();
	}

    render(){
    	return(
    		this.state.hasLoadedData?
				<View style={{
					backgroundColor:"#FFFFFF",
					width:"100%",
					height:"100%",
				}}>
					<FlatList
						contentContainerStyle={{
							height:this.state.submodels.length == 0 ?"100%":"auto",
							width:this.state.submodels.length == 0 ?"100%":"auto",
						}}
						data={this.state.submodels}
						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this._onRefresh}
							/>
						}
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
									this.props.SetSubModel(item.modelId);
									this.props.navigation.navigate('ManufactureDateList');
								}}>
									<Text style={{fontSize:20,fontFamily:"Robotobold",}}>{item.model}</Text>
								</TouchableOpacity>
							);
						}}
						keyExtractor={(item,index) => item.modelId}
					/>
				</View>
			:
				<View 
					style={{
						width:"100%",
						height:"100%",
						backgroundColor:"#FFF",
						justifyContent:"center",
					}}>
					<ActivityIndicator size="large" color="#034d7e">
					</ActivityIndicator>
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

export default connect(mapStateToProps,mapDispatchToProps())(SubModelList);