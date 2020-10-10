import React from 'react';
import { ScrollView, TouchableOpacity, ActivityIndicator, View} from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import FastImage from "react-native-fast-image";
import ModelSection from '../sections/home/Model';
import TypeSection from '../sections/home/Type';
import HeaderSection from '../sections/home/Header';
import SearchSection from '../sections/home/Search';
import HomeProvider from '../providers/Home';
import SearchProvider from '../providers/Search';

export default class Home extends React.Component {
	static navigationOptions = ({navigation}) => {
		return {
			tabbarLabel:"asdasdasd",
			title: '',
			headerStyle: {
				height: 0,
				backgroundColor: '#034d7e',
			}
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			images: [],
			brands: [],
			categories: [],
			searchResponse: [],
			query:"",
			hasLoadedData:false,
		};
	}

	componentDidMount = async () => {
		try{
			let response = await HomeProvider.fetch();
			//console.log(response.data);
			this.setState({hasLoadedData:true,brands:response.data.brands,categories:response.data.categories,images:response.data.ADS});
		}catch(e){
			//Show Error View
			console.log(e);
		}
	}

	onSearchBoxChange = async (query) => {
		try{
			if(query != ""){
				let response = await SearchProvider.fetch(query);
				console.log(response.data);
				this.setState({hasLoadedData:true, searchResponse:response.data.search,query});
			}else{
				this.setState({hasLoadedData:true, searchResponse:[],query});
			}
		}catch(e){
			//Show Error View
		}
	}

	showLoading = () => {
		this.setState({hasLoadedData:false})
	}

	render(){
		return(
			<View style={{
				backgroundColor:'#FFFFFF',
				width:"100%",
				height:"100%",
			}}>
				<HeaderSection onSearchBoxChange={this.onSearchBoxChange} showLoading={this.showLoading}/>
				{
					this.state.hasLoadedData && this.state.query == ""?
					<ScrollView>
						<View>
							<SliderBox 
							images={this.state.images.map(({adsImgURL})=>(adsImgURL))} 
							sliderBoxHeight={200} 
							ImageComponent={FastImage}
							autoplay
							circleLoop
							imageLoadingColor="#034d7e" />

							<ModelSection brands={this.state.brands}/>

							<TypeSection categories={this.state.categories}/>
						</View>
					</ScrollView>
					:
					this.state.hasLoadedData && this.state.query != ""?
					<View>
						<SearchSection items={this.state.searchResponse} />
					</View>
					:
					<View>
						<ActivityIndicator size="large" color="#034d7e">
						</ActivityIndicator>
					</View>
				}
			</View>
	    );
	}
	}