import React from 'react';
import { Text, View, I18nManager, ActivityIndicator, TouchableOpacity} from 'react-native';
import i18n from './../i18n';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import AwesomeAlert from 'react-native-awesome-alerts';

export default class VerifyEmailAddress extends React.Component {
	authObserver = null;
	constructor(props) {
		super(props)
		this.state = {
			isMailSent:false,
			showVerificationSentAlert:false,
			showLoadingAlert:false,
			showErrorAlert:false,
			errorAlertMsg:"",
			email:""
		}
	}

	// onAuthStateChanged = async (user) => {
	// 	if(user && user.emailVerified){
	// 		this.props.navigation.navigate("App");
	// 	}
	// }

	componentDidMount = async () => {
		// this.authObserver = auth().onAuthStateChanged(this.onAuthStateChanged);
		let user = auth().currentUser;
		this.setState({showLoadingAlert:true})
		try{
			var isMailSent = await AsyncStorage.getItem('verificationMailSent');
			console.log(isMailSent);
			if(!isMailSent || isMailSent != "true"){
				this.resendVerificationMail();
				await AsyncStorage.setItem('verificationMailSent',"true");
			}
		}catch(error){
			console.log(error);
			this.setState({errorAlertMsg:"error"});
		}
		this.setState({
			email: user.email,
			showLoadingAlert:false
		})
	}

	// componentWillUnmount() {
	// 	if(this.authObserver){
	// 		this.authObserver();
	// 	}
	// }

	resendVerificationMail = () => {
		this.setState({showLoadingAlert:true})
		let user = auth().currentUser;
		user.sendEmailVerification().then(() => {
			this.setState({showVerificationSentAlert:true,isMailSent:true});
		}).catch((error) => {
			console.log(error);
			this.setState({errorAlertMsg:"error"});
		})
		this.setState({showLoadingAlert:false})
	}

	onLoadingModalDismiss = () => {
		if(this.state.errorAlertMsg != ""){
			this.setState({
				showErrorAlert:true,
			})
		}else{
			this.setState({
				showVerificationSentAlert:true,
			})
		}
	}

	render(){
		return(
			<View style={{
				justifyContent:'center',
				alignItems:"center",
				width:"100%",
				height:"100%",
				paddingHorizontal:40
			}}>
				<Text style={{
					color:"#034d7e",
					marginTop:10,
					fontSize:23,
					fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
				}}>{i18n.t('VerifyEmailAddress.note') +" "+ this.state.email}</Text>
				<View style={{
					flexDirection:"row",
					width:"100%",
					marginTop:20,
				}}>
						<View style={{
							flex:1,
							padding:10,
						}}>
							<TouchableOpacity onPress={() => {
								this.resendVerificationMail();
							}} style={{
								backgroundColor:"#dfff8f",
								height:60,
								justifyContent:"center",
								alignItems:"center"
							}}>
								<Text>{i18n.t('VerifyEmailAddress.resend')}</Text>
							</TouchableOpacity>
						</View>
					<View style={{
						flex:1,
						padding:10,
					}}>
						<TouchableOpacity onPress={() => {
							auth().signOut().then(async () => {
								try{
									await AsyncStorage.removeItem('verificationMailSent');
									await AsyncStorage.removeItem('loggedUser');
									this.props.navigation.navigate('Auth');
								}catch(error){
									console.log("error:");
									console.log(error);
									this.props.navigation.navigate('Auth');
								}
							});
						}}  style={{
							backgroundColor:"#ff968f",
							height:60,
							justifyContent:"center",
							alignItems:"center"
						}}>
							<Text>{i18n.t('VerifyEmailAddress.relogin')}</Text>
						</TouchableOpacity>
					</View>
				</View>
				<AwesomeAlert
					show={this.state.showVerificationSentAlert}
					closeOnTouchOutside={false}
					closeOnHardwareBackPress={false}
					showProgress={false}
					showConfirmButton={true}
					confirmText={i18n.t('Authentication.authenticationFailedConfirmation')}
					title={i18n.t('Authentication.authenticationFailedConfirmation')}
					message={i18n.t('VerifyEmailAddress.confirmation')}
					onConfirmPressed={async () => {
						this.setState({
							showVerificationSentAlert:false
						})
					}}
				/>
				<AwesomeAlert
					show={this.state.showLoadingAlert}
					onDismiss={this.onLoadingModalDismiss}
					showProgress={true}
					progressSize={20}
					progressColor={"#000000"}
					closeOnTouchOutside={false}
					closeOnHardwareBackPress={false}
					title={i18n.t('General.loading')}
				/>

				<AwesomeAlert
					show={this.state.showErrorAlert}
					closeOnTouchOutside={false}
					closeOnHardwareBackPress={false}
					showProgress={false}
					showConfirmButton={true}
					confirmText={i18n.t('Authentication.authenticationFailedConfirmation')}
					title={i18n.t('Authentication.authenticationFailedConfirmation')}
					message={i18n.t('VerifyEmailAddress.error')}
					onConfirmPressed={() => {
						this.setState({
							showErrorAlert:false,
							errorAlertMsg:""
						});
					}}
				/>
			</View>
		);
	}
}