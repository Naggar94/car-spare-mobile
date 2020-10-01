import React from 'react';
import { Text, View, I18nManager} from 'react-native';
import i18n from './../i18n';
import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart';
import { connect } from 'react-redux';
import actions from './../actions';

class Splash extends React.Component {
	constructor(props) {
		super(props)
    }

    componentDidMount = async () => {
		try {
			const cart = await AsyncStorage.getItem('cart');
			if(cart !== null){
				this.props.FillCart(JSON.parse(cart));
				await AsyncStorage.removeItem('cart');
			}
			const locale = await AsyncStorage.getItem('locale');
			if (locale !== null) {
				if(locale == 'ar'){
					i18n.locale = 'ar';
					I18nManager.allowRTL(true);
					I18nManager.forceRTL(true);
				}else{
					i18n.locale = 'en';
					I18nManager.allowRTL(false);
					I18nManager.forceRTL(false);
				}

				this.props.navigation.navigate('Auth');
			}else{
				i18n.locale = 'ar';
				I18nManager.allowRTL(true);
				I18nManager.forceRTL(true);
				await AsyncStorage.setItem('locale','ar');
				RNRestart.Restart();
			}
		} catch (error) {
			console.log(error);
			this.props.navigation.navigate('Auth');
		}
    }

    render(){
    	return(
	    	<View style={{
	    		justifyContent:'center',
	    		alignItems:"center",
	    		width:"100%",
	    		height:"100%",
	    	}}>
	    		<Text style={{
	    			color:"#034d7e",
					fontSize:35,
					fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
	    		}}>تطبيق قطع غياري</Text>
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

export default connect(mapStateToProps,mapDispatchToProps())(Splash);