import React from 'react';
import { ScrollView, TouchableOpacity,I18nManager, ActivityIndicator, View} from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import FastImage from "react-native-fast-image";
import ModelSection from '../sections/home/Model';
import TypeSection from '../sections/home/Type';
import HeaderSection from '../sections/home/Header';
import HomeProvider from '../providers/Home';

export default class Home extends React.Component {
	static navigationOptions = {
	    title: '',
	    headerStyle: {
			height: 0,
			backgroundColor: '#034d7e',
		}
	};

	constructor(props) {
		super(props);
		I18nManager.forceRTL(true);
		this.state = {
			images: [
				"https://source.unsplash.com/1024x768/?nature",
				"https://source.unsplash.com/1024x768/?water",
				"https://source.unsplash.com/1024x768/?girl",
				"https://source.unsplash.com/1024x768/?tree", // Network image
			],
			brands: [],
			categories: [],
			hasLoadedData:false,
		};
    }

    componentDidMount = async () => {
    	try{
    		let response = await HomeProvider.fetch();
    		console.log(response.data);
    		this.setState({hasLoadedData:true,brands:response.data.brands,categories:response.data.categories});
    	}catch(e){
    		//Show Error View
    	}
    }

    render(){
    	return(
    		<ScrollView style={{
    			backgroundColor:'#FFFFFF'
    		}}>
				
    			<HeaderSection/>
    			{
    				this.state.hasLoadedData?
    				<View>
	    				<SliderBox 
						images={this.state.images} 
						sliderBoxHeight={200} 
						ImageComponent={FastImage}
						autoplay
						circleLoop
						imageLoadingColor="#034d7e" />

						<ModelSection brands={this.state.brands}/>

						<TypeSection categories={this.state.categories}/>
					</View>
					:
					<View>
						<ActivityIndicator size="large" color="#034d7e">
						</ActivityIndicator>
					</View>
    			}
			</ScrollView>
	    );
    }
}