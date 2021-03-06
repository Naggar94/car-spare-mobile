import React from 'react';
import { View, Text, TextInput, I18nManager, Platform } from 'react-native';
import CustomFastImage from '../../components/CustomFastImage';
import Icon from 'react-native-vector-icons/Ionicons';
import i18n from '../../i18n';

export default class Header extends React.Component {
	searchTimeout = null;
	constructor(props) {
		super(props);
	}

	render(){
		return(
			<View style={{
				width:'100%',
				height:Platform.OS == 'ios'?i18n.locale == 'ar'?215:240:180,
				alignItems:'flex-start',
				flexDirection:'column',
				justifyContent:Platform.OS == 'ios'?'flex-end':'flex-start',
				backgroundColor:'#034d7e',
				padding:20,
				marginBottom:20,
			}}>
				<Text style={{
					fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
					fontSize:23,
					color:"#FFF",
					marginBottom:10
				}}>{i18n.t('home.headerTitle')}</Text>

				<Text style={{
					fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
					fontSize:23,
					color:"#cd9500",
					marginBottom:20
				}}>{i18n.t('home.headerDescription')}</Text>

				<View style={{
					flexDirection:'row',
    				height:50,
    				backgroundColor:"#f5f6f8",
    			}}>
	    			<TextInput style={{
	    				flex:11,
	    				backgroundColor:"#f5f6f8",
	    				borderColor:'rgba(0,0,0,0.1)',
	    				borderWidth:1,
	    				height:"100%",
	    				paddingHorizontal:10,
	    				textAlign :  I18nManager.isRTL ? 'right' : 'left',
	    			}}
	    			placeholder={i18n.t('home.searchBarPlaceHolder')}
	    			placeholderTextColor="#98999b"
	    			numberOfLines={1}
	    			onChangeText={(text) => {
	    				if(text != ""){
	    					this.props.showLoading();
							if(this.searchTimeout){
								clearTimeout(this.searchTimeout);
							}

							this.searchTimeout = setTimeout(() => {
								this.props.onSearchBoxChange(text);
							}, 1000);
	    				}else{
	    					if(this.searchTimeout){
								clearTimeout(this.searchTimeout);
							}
							this.props.onSearchBoxChange(text);
	    				}
	    			}}
	    			></TextInput>
	    			<View style={{
	    				flex:2,
	    				height:"100%",
	    				alignItems:"center",
	    				justifyContent:"center",
	    			}}>
		    			<Icon name="search" size={25} color="#000" />
	    			</View>
	    		</View>
			</View>
		)
	}
}