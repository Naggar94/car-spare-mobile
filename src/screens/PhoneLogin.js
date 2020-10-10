import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Text, View, TouchableOpacity,TextInput,I18nManager,BackHandler, Platform} from 'react-native';
import FontisoIcon from 'react-native-vector-icons/Fontisto';
import RNRestart from 'react-native-restart';
import i18n from '../i18n';
import { connect } from 'react-redux';
import actions from './../actions';
import auth from '@react-native-firebase/auth';	
import AwesomeAlert from 'react-native-awesome-alerts';

export default class PhoneLogin extends React.Component {	
	phoneAuthSnapshot = null;
	static navigationOptions = ({ navigation }) => {
		let locale = null;
		try {
			AsyncStorage.getItem('locale').then((currentLocale) => {
				if(currentLocale != null){
					locale = currentLocale;
				}else{
					locale = 'ar';
				}
			})
		}catch (error) {
			// Error saving data
		}
		const { params = {} } = navigation.state;
		return{
			headerLeft: () => null,
			title:i18n.t('PhoneLogin.title'),
		}
    }

    componentDidMount() {
    	BackHandler.addEventListener('hardwareBackPress', (this._handleBackButton));
    }

    componentWillUnMount(){
    	if(this.phoneAuthSnapshot){
    		this.phoneAuthSnapshot();
    	}
    }

    _handleBackButton = () => {
    	if(this.state.screen > 1){
    		this.setState({screen:this.state.screen - 1})
    	}
    	return true;
    }

    startVerificationProcess = () => {
    	this.setState({showLoadingAlert:true});
    	if(this.phoneAuthSnapshot){
    		this.phoneAuthSnapshot = null;
    	}
		this.phoneAuthSnapshot = auth().verifyPhoneNumber('+2'+this.state.phoneNumber).on('state_changed', async (phnAuthSnapshot) => {
			if(phnAuthSnapshot.state == 'sent'){
				//Go To Code Verification Screen
				console.log(this.state);
				this.setState({verificationId:phnAuthSnapshot.verificationId,screen:2,showLoadingAlert:false});
			}else if(phnAuthSnapshot.state == 'verified'){
				//Show Loading Screen Then link and go to app
				await this.setState({verificationId:phnAuthSnapshot.verificationId});
				this.confirmCode(phnAuthSnapshot.code);
			}
		});
    }

    confirmCode = (code) => {
    	this.setState({showLoadingAlert:true});
		let credential = auth.PhoneAuthProvider.credential(
			this.state.verificationId,
			code
		);

		console.log(this.phoneAuthSnapshot.verificationId);

		auth().currentUser.linkWithCredential(credential).then(async (response) => {
			await this.setState({showLoadingAlert:false});
			let loggedUser = await AsyncStorage.getItem('loggedUser');
			let userObj = JSON.parse(loggedUser);
			userObj.phoneNumber = this.state.phoneNumber;
			userObj.loggedIn = true;
			await AsyncStorage.setItem('loggedUser',JSON.stringify(userObj));
			this.props.navigation.navigate('Authenticating');
		}).catch((error) => {
			//Show Error
			console.log(error);
			this.setState({showLoadingAlert:false,showErrorDialog:true,errorMessage:"Error While Code Confirmation"});
		})
    }

    constructor(props) {
		super(props);
		this.state = {
			verificationId:null,
			confirmationCode:"",
			phoneNumber:"",
			errorMessage:"",
			screen:1,
			showLoadingAlert:false,
			showErrorDialog:false,
		}
    }

	render(){	
		return(
			<View>
				{
				this.state.screen == 1?
					(
						<View>
							<View style={{
								padding:10,
							}}>
								<Text style={{
									fontSize:20,
									fontFamily:Platform.OS === 'ios'?"Roboto-Regular":"Robotoregular",
									color:"#98999b",
								}}>{i18n.t('PhoneLogin.phoneNumber')} *</Text>

							</View>
							<View style={{
									flexDirection:'column',
									height:180,
									width:"100%",
									borderWidth:2,
									borderColor:'rgba(0,0,0,0.1)',
									padding:10,
								}}>
								<View style={{
									flex:2,
									alignItems:"center",
									justifyContent:"center",
								}}>
									<View style={{
										flexDirection:'row',
										height:50,
									}}>
						    			<TextInput style={{
						    				flex:11,
						    				backgroundColor:"#f5f6f8",
						    				borderColor:'rgba(0,0,0,0.1)',
						    				borderWidth:1,
						    				height:"100%",
						    			}}
						    			keyboardType={"number-pad"}
						    			autoCompleteType={"tel"}
						    			onChangeText={text => {
											this.setState({phoneNumber:text})
										}}></TextInput>
						    			<View style={{
						    				flex:2,
						    				backgroundColor:"#034d7e",
						    				height:"100%",
						    				alignItems:"center",
						    				justifyContent:"center",
						    			}}>
							    			<Text style={{
						    					fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
						    					fontSize:18,
						    					color:"#FFFFFF",
						    				}}>+20</Text>
						    			</View>
						    		</View>
								</View>
								<View style={{
									flex:2,
									alignItems:"center",
									justifyContent:"center",
								}}>
									<TouchableOpacity 
									style={{
										width:"90%",
										height:50,
						    			justifyContent: 'center',
						    			alignItems:"center",
						    			paddingLeft:25,
						    			paddingRight:25,
						    			backgroundColor:"#034d7e",
						    			borderRadius:8
									}} onPress={() => {
										var reg = /^([0]((\d){10}))$/
										console.log(reg.test(this.state.phoneNumber));
										if(!reg.test(this.state.phoneNumber)){
											this.setState({showErrorDialog:true,"errorMessage":"Not Valid Phone Number"});
											return;
										}

										this.startVerificationProcess();
									}}>

										<Text style={{
											fontSize:20,
						    				fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
						    				color:"#FFFFFF",
										}}>{i18n.t('PhoneLogin.checkNumber')}</Text>

									</TouchableOpacity>
								</View>
								<View style={{
									flex:1,
									justifyContent:"center",
									alignItems:"center",
								}}>
									<TouchableOpacity style={{
										height:"100%",
										width:"50%",
										justifyContent:"center",
										alignItems:"center",
									}} onPress={() => {
										auth().signOut().then(() => {
											this.props.navigation.navigate('Login');
										});

									}}>
										<Text>Log Out</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					)
					:
					(
						<View>
							<View style={{
								padding:10,
							}}>
								<Text style={{
									fontSize:20,
									fontFamily:Platform.OS === 'ios'?"Roboto-Regular":"Robotoregular",
									color:"#98999b",
								}}>Verify Code *</Text>

							</View>
							<View style={{
									flexDirection:'column',
									height:180,
									width:"100%",
									borderWidth:2,
									borderColor:'rgba(0,0,0,0.1)',
									padding:10,
								}}>
								<View style={{
									flex:2,
									alignItems:"center",
									justifyContent:"center",
								}}>
									<TextInput style={{
										height:50,
										width:"100%",
										backgroundColor:"#f5f6f8",
										borderColor:'rgba(0,0,0,0.1)',
										borderWidth:1,
									}}
									keyboardType={"number-pad"}
									defaultValue={this.state.confirmationCode}
									onChangeText={text => {
										this.setState({confirmationCode:text})
									}}></TextInput>
								</View>
								<View style={{
									flex:2,
									alignItems:"center",
									justifyContent:"center",
								}}>
									<TouchableOpacity 
									style={{
										width:"90%",
										height:50,
						    			justifyContent: 'center',
						    			alignItems:"center",
						    			paddingLeft:25,
						    			paddingRight:25,
						    			backgroundColor:"#034d7e",
						    			borderRadius:8
									}} onPress={() => {
										var reg = /^((\d+))$/
										if(!reg.test(this.state.confirmationCode)){
											this.setState({showErrorDialog:true,"errorMessage":"Not Valid Phone Number"});
											return;
										}

										this.confirmCode(this.state.confirmationCode);
									}}>

										<Text style={{
											fontSize:20,
						    				fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
						    				color:"#FFFFFF",
										}}>Confirm Code</Text>

									</TouchableOpacity>
								</View>
							</View>
						</View>
					)
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

				<AwesomeAlert
					show={this.state.showErrorDialog}
					closeOnTouchOutside={false}
					closeOnHardwareBackPress={false}
					showProgress={false}
					showConfirmButton={true}
					confirmText="OK"
					title="Error"
					message={this.state.errorMessage}
					onConfirmPressed={() => {
						this.setState({showErrorDialog:false});
					}}
				/>
			</View>
		);
	}
}