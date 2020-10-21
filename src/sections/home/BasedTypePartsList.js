import React from 'react';
import { View, RefreshControl } from 'react-native';
import { FlatList } from 'react-navigation';
import PartCard from './../../components/PartCard';
import FlatListEmptyView from '../../components/FlatListEmptyView';

export default class BaseTypePartsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	doShowBottomSheet = (item) => {
		this.props.showBottomSheet(item);
	}

	showLoadingAlertDialog = (showLoadingAlert = true) => {
		this.props.showLoadingAlertDialog(showLoadingAlert);
	}

	render(){
		return(
			<View
				style={{
					height:"100%"
				}}
			>
				<FlatList
					refreshControl={
						<RefreshControl
							refreshing={this.props.refreshing}
							onRefresh={this.props.refresh}
						/>
					}
					data={this.props.parts}
					contentContainerStyle={{
						padding:15,
						height:this.props.parts.length == 0 ?"100%":"auto",
						width:this.props.parts.length == 0 ?"100%":"auto",
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
		    					showBottomSheet={this.doShowBottomSheet}
		    					showLoadingAlertDialog={this.showLoadingAlertDialog} />
		    			)
		    		}}
		    		keyExtractor={(item,index) => item.partId}
				/>
			</View>
		)
	}
}