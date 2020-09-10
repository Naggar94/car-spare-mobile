import React from 'react';
import { Text, View, TouchableOpacity,I18nManager, ActivityIndicator, RefreshControl, Platform} from 'react-native';
import { FlatList } from 'react-navigation';
import { connect } from 'react-redux';
import actions from './../actions';
import ModelYearProvider from '../providers/ModelYear';
import FlatListEmptyView from '../components/FlatListEmptyView';

class ManufactureDateList extends React.Component {
	static navigationOptions = {
	    title: 'اختر سنة صنع السيارة',
	};
	constructor(props) {
		super(props);
		I18nManager.forceRTL(true);
		this.initialState = {
			refreshing:false,
			dates:[],
			hasLoadedData:false,
		}
		this.state = this.initialState;
    }

    componentDidMount = () => {
		this._loadData();
	}

	_onRefresh = () => {
		this.setState(this.initialState);
		this._loadData();
	}

    _loadData = async () => {
		try{
			let response = await ModelYearProvider.fetch(this.props.model,this.props.submodel);
			let state = {
				hasLoadedData:true,
				dates:response.data.modelYears.modelYears,
				refreshing:false,
			};
			this.setState(state);
		}catch(e){
			//Show Error View
		}
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
							height:this.state.dates.length == 0 ?"100%":"auto",
							width:this.state.dates.length == 0 ?"100%":"auto",
						}}
						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this._onRefresh}
							/>
						}
						data={this.state.dates}
						ListEmptyComponent={() => {
							return(
								<FlatListEmptyView />
							)
						}}
						renderItem={ ({item,index}) => {
							return(
								<TouchableOpacity key={item} style={{
									height:65,
									borderBottomColor: 'black',
									borderBottomWidth: 2,
									justifyContent:"center",
									paddingLeft:10,
								}} onPress={() => {
									this.props.SetDate(item);
									if(this.props.type == ""){
										this.props.navigation.navigate('TypeGridList',{
								    		stopCardClickingAction:true
								    	});
									}else{
										this.props.navigation.navigate('PartsList');
									}
								}}>
									<Text style={{fontSize:20,fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",alignSelf:"flex-start"}}>{item}</Text>
								</TouchableOpacity>
							);
						}}
						keyExtractor={(item,index) => item}
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
		type: state.filter.type,
		submodel: state.filter.submodel,
		model: state.filter.model,
	}
}

const mapDispatchToProps = () => {
	return actions
}

export default connect(mapStateToProps,mapDispatchToProps())(ManufactureDateList);