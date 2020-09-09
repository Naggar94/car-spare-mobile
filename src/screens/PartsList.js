import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import TypeSlider from "./../sections/home/TypeSlider";
import BasedTypePartsList from "./../sections/home/BasedTypePartsList";
import { connect } from 'react-redux';
import actions from './../actions';
import PartProvider from '../providers/Part';
import TypeProvider from '../providers/Type';


class PartsList extends React.Component {
	static navigationOptions = {
		title:"اختر القطعة المناسبة",
	};

	constructor(props) {
		super(props)
		this.initialState = {
			refreshing:false,
			parts:[],
			hasLoadedParts:false,
		}
		this.state = {
			...this.initialState,
			types:[],
			hasLoadedTypes:false,
			initialLoadingForParts:false,
			initialLoadingForTypes:false,
		}
    }

    componentDidMount = () => {
    	this._loadTypes();
		this._loadData();
	}

	_loadTypes = async () => {
		let response = await TypeProvider.fetch();
		let types = response.data.categories;
		let typeIndex = types.findIndex(x => x._id === this.props.type);
		if(typeIndex != -1){
			let firstIndex = types[0];
			types[0] = types[typeIndex];
			types[typeIndex] = firstIndex;
		}
		this.setState({types:types,hasLoadedTypes:true,initialLoadingForTypes:true});
	}

	_loadData = async () => {
		try{
			let response = await PartProvider.fetch(this.props.model,this.props.submodel,this.props.date,this.props.type);
			// console.log(response.data.spareParts);
			let state = {
				hasLoadedParts:true,
				parts:response.data.spareParts,
				refreshing:false,
				initialLoadingForParts:true,
			};
			this.setState(state);
		}catch(e){
			//Show Error View
		}
	}

	_onRefresh = () => {
		console.log(this.props.model);
		console.log(this.props.submodel);
		console.log(this.props.date);
		console.log(this.props.type);
		this.setState(this.initialState);
		this._loadData();
	}

    render(){
    	return(
    		this.state.initialLoadingForParts && this.state.initialLoadingForTypes?
				<View style={{
					backgroundColor:"#FFFFFF",
					height:"100%",
					flexDirection:"column",
				}}>
					<View style={{
						flex:1,
						width:"100%"
					}}>
						<TypeSlider types={this.state.types} refresh={this._onRefresh} />
					</View>
					<View style={{
						flex:10,
						width:"100%",
					}}>
						{
							this.state.hasLoadedParts?
								<BasedTypePartsList parts={this.state.parts} refresh={this._onRefresh} refreshing={this.state.refreshing} />
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
						}
					</View>
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

export default connect(mapStateToProps,mapDispatchToProps())(PartsList);