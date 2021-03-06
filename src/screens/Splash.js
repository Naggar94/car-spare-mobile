import React from 'react';
import { Text, View, I18nManager, Image} from 'react-native';
import i18n from './../i18n';
import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart';
import { connect } from 'react-redux';
import actions from './../actions';
import auth from '@react-native-firebase/auth';

class Splash extends React.Component {
	authObserver = null;
	constructor(props) {
		super(props)
    }

	componentDidMount() {
		this.authObserver = auth().onAuthStateChanged(this.onAuthStateChanged);
	}

    componentWillUnmount() {
		this.authObserver();
	}

	onAuthStateChanged = async (user) => {
		console.log("Splash");
		console.log(user);
		let navigationTo = 'Auth';
		if (user && user.phoneNumber != null) {
			if(user && !user.emailVerified){
	        	navigationTo = 'VerifyEmailAddress';
	        }else{
	        	try{
	        		await AsyncStorage.removeItem('verificationMailSent');
	        	}catch(error){

	        	}
	        	navigationTo = 'App';
	        }
        }

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
				console.log(navigationTo);
				this.props.navigation.navigate(navigationTo);
			}else{
				i18n.locale = 'ar';
				I18nManager.allowRTL(true);
				I18nManager.forceRTL(true);
				await AsyncStorage.setItem('locale','ar');
				RNRestart.Restart();
			}
		} catch (error) {
			console.log(error);
			this.props.navigation.navigate(navigationTo);
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
	    		<Image source={require('./../images/carspare.png')} style={{
	    			width:200,
	    			height:200,
	    		}} />
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