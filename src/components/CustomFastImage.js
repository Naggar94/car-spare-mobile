import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import FastImage from "react-native-fast-image";

export default class CustomFastImage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			finishedLoading:false,
		}
	}

	render(){
		return(
			<View>
				{
					!this.state.finishedLoading?
					<View
						style={{
							position:"absolute",
							width:this.props.width,
							height:this.props.height,
							zIndex:2,
							justifyContent:"center",
							alignItems:"center",
						}}
					>
						<ActivityIndicator size="large" color="#034d7e">
						</ActivityIndicator>
					</View>
					:
					null
				}
				<FastImage
					style={{ width: this.props.width, height: this.props.height, borderRadius:15, }}
					source={{
						uri: this.props.src,
					}}
					resizeMode={FastImage.resizeMode.contain}
					onLoad={e => this.setState({finishedLoading:true})}
				></FastImage>
			</View>
		);
	}
}