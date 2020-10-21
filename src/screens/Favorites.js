import React from 'react';
import { View, RefreshControl, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-navigation';
import PartCard from './../components/PartCard';
import FlatListEmptyView from './../components/FlatListEmptyView';
import FavoriteProvider from './../providers/Favorite';

export default class BaseTypePartsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading:true,
			favorities:[],
			refreshing:false,
		};
	}

	componentDidMount = async () => {
		this.loadData();
	}

	loadData = async () => {
		try{
			this.setState({isLoading:true,refreshing:true});
			let favorities = await FavoriteProvider.fetch();
			console.log(favorities);
			this.setState({favorites:favorities.userFavourite,isLoading:false,refreshing:false});
		}catch(error){
			this.setState({isLoading:false,refreshing:false});
		}
	}

	showLoadingAlertDialog = () => {

	}

	render(){
		return(
			<View
				style={{
					height:"100%",
					width:"100%"
				}}
			>
				{
					this.state.isLoading?
					<View style={{
						height:"100%",
						width:"100%",
						alignItems:"center",
						justifyContent:"center"
					}}>
						<ActivityIndicator size="large" color="#034d7e" />
					</View>
					:
					<FlatList
						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this.loadData}
							/>
						}
						data={this.state.favorities}
						contentContainerStyle={{
							padding:15,
							height:this.state.favorities.length == 0 ?"100%":"auto",
							width:this.state.favorities.length == 0 ?"100%":"auto",
						}}
						ListEmptyComponent={() => {
							return(
								<FlatListEmptyView />
							)
						}}
						renderItem={ ({item,index}) => {
							return(
								<PartCard 
									key={item.partId} 
									id={item.partId}
									name={item.partName} 
									description={item.partDescription} 
									image={item.partImgURL} 
									price={item.partPrice}
									doNotShowAddToCart={true}
									showLoadingAlertDialog={this.showLoadingAlertDialog} />
							)
						}}
						keyExtractor={(item,index) => item.partId}
					/>
				}
			</View>
		)
	}
}