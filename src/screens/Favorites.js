import React from 'react';
import { View, RefreshControl, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-navigation';
import PartCard from './../components/PartCard';
import FlatListEmptyView from './../components/FlatListEmptyView';
import FavoriteProvider from './../providers/Favorite';
import AwesomeAlert from 'react-native-awesome-alerts';
import i18n from '../i18n';

export default class BaseTypePartsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading:true,
			favorities:[],
			refreshing:false,
			showLoadingAlert:false,
		};
	}

	componentDidMount = async () => {
		this.loadData();
	}

	onFavoriteRemove = (index) => {
		let favorities = this.state.favorities;
		let newFavorities = [];
		for(var i=0;i<favorities.length;i++){
			if(i != index){
				newFavorities.push(favorities[i]);
			}
		}
		this.setState({favorities:newFavorities});
	}

	loadData = async () => {
		try{
			this.setState({isLoading:true,refreshing:true});
			let favorities = await FavoriteProvider.fetch();
			console.log(favorities.userFavourite);
			this.setState({favorities:favorities.userFavourite,isLoading:false,refreshing:false});
		}catch(error){
			this.setState({isLoading:false,refreshing:false});
		}
	}

	showLoadingAlertDialog = (showLoadingAlert = true) => {
		this.setState({showLoadingAlert});
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
							if(item != undefined){
								return(
									<PartCard 
										key={item.partId} 
										itemIndex={index}
										id={item.partId}
										name={item.partName} 
										description={item.partDescription} 
										image={item.partImgURL} 
										price={item.partPrice}
										isFavorite={true}
										onFavoriteRemove={this.onFavoriteRemove}
										doNotShowAddToCart={true}
										showLoadingAlertDialog={this.showLoadingAlertDialog} />
								)
							}
						}}
						keyExtractor={(item,index) => item.partId}
					/>
				}
				<AwesomeAlert
					show={this.state.showLoadingAlert}
					showProgress={true}
					progressSize={20}
					progressColor={"#000000"}
					closeOnTouchOutside={false}
					closeOnHardwareBackPress={false}
					title={i18n.t('General.loading')}
				/>
			</View>
		)
	}
}