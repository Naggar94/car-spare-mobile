import React from 'react';
import { Text, View, I18nManager, ActivityIndicator} from 'react-native';
import i18n from './../i18n';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import AwesomeAlert from 'react-native-awesome-alerts';
import SignInProvider from '../providers/SignIn';
import SignUpProvider from '../providers/SignUp';

export default class Authentication extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showErrorAlert:false,
		}
	}

	componentDidMount = async () => {
		try{
			var loggedUser = await AsyncStorage.getItem('loggedUser');
			if(loggedUser !== null){
				var userObj = JSON.parse(loggedUser);
				if(userObj.loggedIn){
					let loginResponse = await SignInProvider.byMail(userObj.email,userObj.password);
					if(!loginResponse.success){
						let signUpResponse = await SignUpProvider.fetch(userObj.firstName,userObj.familyName,userObj.phoneNumber,userObj.email,"mail",userObj.uid,userObj.password);
						if(signUpResponse.success){
							userObj.token = signUpResponse.payload.token;
							await AsyncStorage.setItem('loggedUser',JSON.stringify(userObj));
							let user = auth().currentUser;
							if(user && !user.emailVerified){
								this.props.navigation.navigate('VerifyEmailAddress');
							}else{
								this.props.navigation.navigate('App');
							}
						}else{
							throw new Error('Sign up Failed');
						}
					}else{
						userObj.token = loginResponse.payload.token;
						await AsyncStorage.setItem('loggedUser',JSON.stringify(userObj));
						let user = auth().currentUser;
						if(user && !user.emailVerified){
							this.props.navigation.navigate('VerifyEmailAddress');
						}else{
							this.props.navigation.navigate('App');
						}
					}
				}
			}else{
				throw new Error('No Authentication');
			}
		}catch(e){
			console.log(e);
			auth().signOut().then(async () => {
				await AsyncStorage.removeItem('loggedUser');
				this.setState({showErrorAlert:true});
			});
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
				<ActivityIndicator size="large" color="#000000" />
				<Text style={{
					color:"#034d7e",
					marginTop:10,
					fontSize:35,
					fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
				}}>{i18n.t('Authentication.loading')}</Text>
				<AwesomeAlert
					show={this.state.showErrorAlert}
					closeOnTouchOutside={false}
					closeOnHardwareBackPress={false}
					showProgress={false}
					showConfirmButton={true}
					confirmText={i18n.t('Authentication.authenticationFailedConfirmation')}
					title={i18n.t('Authentication.authenticationFailedTitle')}
					message={i18n.t('Authentication.authenticationFailedMSG')}
					onConfirmPressed={async () => {
						//await this.setState({showErrorDialog:false});
						this.props.navigation.navigate('Auth');
					}}
				/>
			</View>
		);
	}
}