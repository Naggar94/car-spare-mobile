import React from 'react';
import { Text, View, RefreshControl, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-navigation';
import TypeCard from './../components/TypeCard';
import { connect } from 'react-redux';
import actions from './../actions';
import TypeProvider from '../providers/Type';
import FlatListEmptyView from '../components/FlatListEmptyView';
import i18n from '../i18n';

class ModelGridList extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return{
			title:i18n.t('type.title'),
		}
	}
	constructor(props) {
		super(props)
		this.initialState = {
			refreshing:false,
			types:[],
			lastRowAnomaly:false,
			lastRowItemFlex:0,
			lastRowStartsAfter:0,
			hasLoadedData:false,
		}
		this.state = this.initialState;
    }

    componentDidMount = () => {
		this._loadData();
	}

	_loadData = async () => {
		let response = null;
		if(this.props.model != "" && this.props.submodel != "" && this.props.date != ""){
			response = await TypeProvider.fetchBasedOnBrand(this.props.model,this.props.submodel,this.props.date);
		}else{
			response = await TypeProvider.fetch();
			// console.log(response.data);
		}
		if(response.data.categories.length % 3 == 1){
			this.setState({types:response.data.categories,lastRowAnomaly:true,lastRowItemFlex:1,lastRowStartsAfter:parseInt(response.data.categories.length/3)*3,hasLoadedData:true});
		}else if(response.data.categories.length % 3 == 2){
			this.setState({types:response.data.categories,lastRowAnomaly:true,lastRowItemFlex:0.5,lastRowStartsAfter:parseInt(response.data.categories.length/3)*3,hasLoadedData:true})
		}else{
			this.setState({types:response.data.categories,lastRowStartsAfter:response.data.categories.length,hasLoadedData:true});
		}
	}

    componentWillUnmount(){
    	this.props.SetType("");
    }

    _onRefresh = () => {
		this.setState(this.initialState);
		this._loadData();
	}

    onCardClick = (mainCategoryId) => {
    	this.props.SetType(mainCategoryId);
    	let stopCardClickingAction = this.props.navigation.state.params?this.props.navigation.state.params.stopCardClickingAction:false;
    	if(!stopCardClickingAction){
    		this.props.navigation.navigate('ModelGridList');
    	}else{
    		this.props.navigation.navigate('PartsList');
    	}
    }

    render(){
    	return(
    		this.state.hasLoadedData?
				<View style={{
					width:"100%",
					height:"100%",
					backgroundColor:"#FFF"
				}}>
					<FlatList
						data={this.state.types}
						columnWrapperStyle={{justifyContent: 'space-between'}}
						contentContainerStyle={{
							padding:10,
							height:this.state.types.length == 0 ?"100%":"auto",
							width:this.state.types.length == 0 ?"100%":"auto",
						}}
						ListEmptyComponent={() => {
							return(
								<FlatListEmptyView />
							)
						}}
						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this._onRefresh}
							/>
						}
						numColumns={3}
						renderItem={ ({item,index}) => {
							return(
								<View key={item.mainCategoryId?item.mainCategoryId:item._id} style={{
									flex:index >= this.state.lastRowStartsAfter && this.state.lastRowAnomaly?this.state.lastRowItemFlex:0.33,
									height:150,
									padding:3,
								}}>
									<TypeCard name={item.type} id={item.mainCategoryId?item.mainCategoryId:item._id} pressable={true} preesableAction={this.onCardClick} image={item.typeImgURL} />
								</View>
							);
						}}
						keyExtractor={(item,index) => item.mainCategoryId?item.mainCategoryId:item._id}
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
	    );
    }
}

const mapStateToProps = (state) => {
	return {
		type: state.filter.type,
		submodel: state.filter.submodel,
		model: state.filter.model,
		date: state.filter.date,
	}
}

const mapDispatchToProps = () => {
	return actions
}

export default connect(mapStateToProps,mapDispatchToProps())(ModelGridList);