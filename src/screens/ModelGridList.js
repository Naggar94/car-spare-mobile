import React from 'react';
import { Text, View, ActivityIndicator, RefreshControl} from 'react-native';
import { FlatList } from 'react-navigation';
import ModelCard from './../components/ModelCard';
import { connect } from 'react-redux';
import actions from './../actions';
import BrandProvider from '../providers/Brand';
import FlatListEmptyView from '../components/FlatListEmptyView';
import i18n from '../i18n';

class ModelGridList extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return{
			title:i18n.t('model.title'),
		}
	}
	constructor(props) {
		super(props);
		this.initialState = {
			refreshing:false,
			models:[],
			lastRowAnomaly:false,
			lastRowItemFlex:0,
			lastRowStartsAfter:0,
			hasLoadedData:false,
		}
		this.state = this.initialState;
    }

    onCardClick = (brandId,brandName) => {
    	this.props.SetModel(brandId,brandName);
    	this.props.navigation.navigate('SubModelList');
    }

    componentDidMount = () => {
		this._loadData();
	}

	_loadData = async () => {
		try{
			let response = await BrandProvider.fetch();
			let state = {
				hasLoadedData:true,
				models:response.data.brands,
				refreshing:false,
			};
			if(response.data.brands.length % 3 == 1){
				state.lastRowAnomaly = true;
				state.lastRowItemFlex = 1;
				state.lastRowStartsAfter = parseInt(response.data.brands.length/3)*3;
			}else if(response.data.brands.length % 3 == 2){
				state.lastRowAnomaly = true;
				state.lastRowItemFlex = 0.5;
				state.lastRowStartsAfter = parseInt(response.data.brands.length/3)*3;
			}else{
				state.lastRowStartsAfter = response.data.brands.length;
			}
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
						width:"100%",
						height:"100%",
						backgroundColor:"#FFF"
					}}>
						<FlatList
							data={this.state.models}
							columnWrapperStyle={{justifyContent: 'space-between'}}
							contentContainerStyle={{
								padding:10,
								height:this.state.models.length == 0 ?"100%":"auto",
								width:this.state.models.length == 0 ?"100%":"auto",
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
									<View key={item.brandId} style={{
										flex:index >= this.state.lastRowStartsAfter && this.state.lastRowAnomaly?this.state.lastRowItemFlex:0.33,
										height:100,
										padding:3,
									}}>
										<ModelCard id={item.brandId} name={item.brandName} pressable={true} preesableAction={this.onCardClick} image={item.brangLogoURL} />
									</View>
								);
							}}
							keyExtractor={(item,index) => item.brandId}
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
		
	}
}

const mapDispatchToProps = () => {
	return actions
}

export default connect(mapStateToProps,mapDispatchToProps())(ModelGridList);