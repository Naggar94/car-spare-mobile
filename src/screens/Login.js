import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Text, View, TouchableOpacity,TextInput,I18nManager,BackHandler, Platform, ActivityIndicator} from 'react-native';
import FontisoIcon from 'react-native-vector-icons/Fontisto';
import RNRestart from 'react-native-restart';
import i18n from '../i18n';
import { connect } from 'react-redux';
import actions from './../actions';
import auth from '@react-native-firebase/auth';
import AwesomeAlert from 'react-native-awesome-alerts';
// import { LoginManager, AccessToken } from 'react-native-fbsdk';

class Login extends React.Component {

	authObserver = null;
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
			title:i18n.t('Login.title'),
			headerRight:() => (
				locale?
				<TouchableOpacity style={{
					width:40,
					height:"100%",
					justifyContent:"center",
					alignItems:"center",
				}} onPress={async () => {
					await AsyncStorage.setItem('cart',JSON.stringify(navigation.getParam('cart')));
					try {
						let newLocale = 'ar';
						if (locale !== null) {
							if(locale == 'ar'){
								newLocale = 'en';
								I18nManager.allowRTL(false);
		  						I18nManager.forceRTL(false);
							}else{
								I18nManager.allowRTL(true);
		  						I18nManager.forceRTL(true);
							}
						}else{
							newLocale = 'en';
							I18nManager.allowRTL(false);
	  						I18nManager.forceRTL(false);
						}
						await AsyncStorage.setItem('locale',newLocale);
						RNRestart.Restart();
					} catch (error) {
						// Error saving data
					}
				}}>
					<Text style={{
						color:"#FFFFFF",
						fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
						fontSize:15,
					}}>{locale == 'en'?'ع':'EN'}</Text>
				</TouchableOpacity>
				:
				null
			)
		}
    }


	constructor(props) {
		super(props);
		this.state = {
			navigateTo:"",
			loading:true,
			errorMessage:"",
			email:"",
			password:"",
			confirmPassword:"",
			screen:1,
			cart:{},
			showLoadingAlert:false,
			showErrorDialog:false,
		}
    }

    componentDidMount() {
		this.props.navigation.addListener('willFocus', this.componentDidAppear);
		this.props.navigation.addListener('willBlur', this.componentDidBlur);
		this.updateCart();
		this.authObserver = auth().onAuthStateChanged(this.onAuthStateChanged);
    }

    componentDidUpdate() {
		this.updateCart();
	}

	componentDidAppear = () => {
		BackHandler.addEventListener('hardwareBackPress', (this._handleBackButton));
	}

	componentDidBlur = () => {
		BackHandler.removeEventListener('hardwareBackPress', this._handleBackButton);
	}

	onAuthStateChanged = async (user) => {
		this.setState({errorMessage:""});
		if (!user) {
			this.setState({
				loading: false
			})
		} else {
			//Navigate To Phone Auth
			if(user.phoneNumber == null){
				try{
					let loggedUser = {
						emailVerified:user.emailVerified,
						loggedIn:false,
						phoneNumber: user.phoneNumber,
						email: user.email,
						uid: user.uid,
						password: this.state.password,
					}
					await AsyncStorage.setItem('loggedUser',JSON.stringify(loggedUser));
				}catch(error){
					console.log(error);
				}
				await this.setState({showLoadingAlert:false,navigateTo:"PhoneLogin"});
				if(this.state.email == ""){
					this.onLoadingModalDismiss();
				}
			}else{
				console.log(user);

				let loggedUser = {
					emailVerified:user.emailVerified,
					loggedIn:true,
					phoneNumber: user.phoneNumber,
					email: user.email,
					uid: user.uid,
					password: this.state.password,
				}
				await AsyncStorage.setItem('loggedUser',JSON.stringify(loggedUser));
				await this.setState({showLoadingAlert:false,navigateTo:"Authenticating"});
				console.log("HI");
			}
		}
	}

	onLoadingModalDismiss = () => {
		if(this.state.navigateTo != ""){
			this.props.navigation.navigate(this.state.navigateTo);	
		}

		if(this.state.errorMessage != ""){
			this.setState({showErrorDialog:true});
		}
		
	}

	fakeSignIn = () => {
		SignInProvider.byMail("abdurhmannaggar@gmail.com","123456").then(response => {
			console.log(response);
			console.log("FIREBASE USER FOUND X2");
			// if(response.status && response.status == "400"){
			// 	console.log("USER ::: Not Found");
			// 	SignUpProvider.fetch("+201003084520","abdurhmannaggar@gmail.com","mail","TvB9Cy5475XjaiqesBt4tLyeEKH3","123456").then(res => {
			// 		console.log("Signed UP");
			// 	});
			// }else{
			// 	console.log("Signed IN");
			// }
		}).catch((error) => {
			console.log("ASDASD:: ERORRR");
			console.log(error);
		});
	}

	updateCart() {
		if(this.props.cart != this.state.cart){
			this.setState({cart:this.props.cart});
			this.props.navigation.setParams({ cart: this.props.cart });
		}
	}

    _handleBackButton = () => {
    	if(this.state.screen == 1){
    		return false;
    	}else{
    		if(this.state.screen == 3){
    			this.setState({'screen':this.state.screen - 2});
    		}else{
    			if (this.state.screen == 1){
    				this.props.navigation.navigate("HomeStack");
    			}else{
    				this.setState({'screen':this.state.screen - 1});
    			}
    		}
    	}
    	return true;
    }

    componentWillUnmount () {
    	if(this.authObserver){
    		this.authObserver();
    	}
    }

    render(){
    	return(
    		this.state.loading?(
    			<View style={{
    				height:"100%",
    				width:"100%",
    				justifyContent:"center",
    				alignItems:"center",
    			}}>
    				<ActivityIndicator size="large" color="#034d7e" />
    			</View>
    		)
    		:
    		this.state.screen == 1?
    		(
		    	<View style={{
		    		flex: 1,
	        		flexDirection: 'column',
		    		width:'100%',
		    		height:'100%',
		    		alignItems:'center',
		    		justifyContent:'center',
		    		backgroundColor:'#FFFFFF'
		    	}}>
		    		<View style={{
		    			flex: 1,
	        			flexDirection: 'row',
	        			justifyContent: 'center',
	        			alignItems: 'flex-end'
		    		}}>
			    		<Text style={{
			    			color:"#034d7e",
			    			fontSize:35,
			    			fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
			    		}}>
			    			{i18n.t('Login.introTitle')}
		    			</Text>
		    		</View>

		    		<View style={{
		    			flex: 1,
	        			flexDirection: 'row',
	        			justifyContent: 'center',
		    		}}>
			    		<Text style={{
			    			paddingTop:15,
			    			color:"#98999b",
			    			fontSize:20,
			    			fontFamily:Platform.OS === 'ios'?"Roboto-Regular":"Robotoregular",
			    			textAlign:"center",
			    			width:"80%"
			    		}}>
			    			{i18n.t('Login.introDesc')}
			    		</Text>
		    		</View>
		    		<View style={{
		    			flex: 3,
	        			flexDirection: 'column',
	        			alignItems:"center",
	        			justifyContent: 'flex-start',
	        			width:"100%",
	        			height:"100%",
		    		}}>

		    			<View 
							style={{
								width:"90%",
								flexDirection: 'row',
								marginBottom:15,
								height:50,
								justifyContent: 'flex-start',
								alignItems:"center",
								paddingLeft:25,
								paddingRight:25,
								backgroundColor:"#3b5999",
								borderRadius:15,
								opacity:0.5
						}}>

		    				<View style={{
		    					flex:1,
		    					alignItems:"flex-start"
		    				}}>
		    					<FontisoIcon name="facebook" size={19} color="#FFFFFF" />
		    				</View>

		    				<View style={{
		    					flex:8,
		    					alignItems:"flex-start"
		    				}}>
			    				<Text style={{
			    					fontSize:20,
				    				fontFamily:Platform.OS === 'ios'?"Roboto-Regular":"Robotoregular",
				    				color:"#FFFFFF",
			    				}}>{i18n.t('Login.facebookLogin')}</Text>
		    				</View>

		    			</View>

		    			<View style={{
		    				width:"90%",
		    				flexDirection: 'row',
		    				marginBottom:15,
		    				height:50,
		        			justifyContent: 'flex-start',
		        			alignItems:"center",
		        			paddingLeft:25,
		        			paddingRight:25,
		        			borderColor:"#707070",
		        			borderWidth:1,
		        			borderRadius:15,
		        			opacity:0.5
		    			}}>

		    				<View style={{
		    					flex:1,
		    					alignItems:"flex-start"
		    				}}>
		    					<FontisoIcon name="google" size={19} color="#000000" />
		    				</View>

		    				<View style={{
		    					flex:8,
		    					alignItems:"flex-start"
		    				}}>
			    				<Text style={{
			    					fontSize:20,
				    				fontFamily:Platform.OS === 'ios'?"Roboto-Regular":"Robotoregular",
				    				color:"#707070",
			    				}}>{i18n.t('Login.googleLogin')}</Text>
			    			</View>

		    			</View>

						<View style={{
							width:"90%",
							flexDirection: 'row',
							height:50,
							justifyContent: 'flex-start',
							alignItems:"center",
							paddingLeft:25,
							paddingRight:25,
							borderColor:"#707070",
							borderWidth:1,
							borderRadius:15,
							marginBottom:15,
							opacity:0.5
						}}>

							<View style={{
								flex:1,
								alignItems:"flex-start"
							}}>
								<FontisoIcon name="apple" size={19} color="#000000" />
							</View>

							<View style={{
								flex:8,
								alignItems:"flex-start"
							}}>
								<Text style={{
									fontSize:20,
									fontFamily:Platform.OS === 'ios'?"Roboto-Regular":"Robotoregular",
									color:"#707070",
								}}>{i18n.t('Login.appleLogin')}</Text>
							</View>

						</View>

						<View style={{
							width:"90%",
							flexDirection: 'row',
							height:50,
						}}>
							<TouchableOpacity style={{
								flex:1,
								justifyContent: 'center',
								alignItems:"center",
							}} onPress={() => {
								this.setState({'screen':2});
							}}>
								<Text style={{
									fontFamily:Platform.OS === 'ios'?"Roboto-Regular":"Robotoregular",
									fontSize:15,
								}}>{i18n.t('Login.emailSignIn')}</Text>
							</TouchableOpacity>

							<TouchableOpacity style={{
								flex:1,
								justifyContent: 'center',
								alignItems:"center",
							}} onPress={() => {
								this.setState({'screen':3});
							}}>
								<Text style={{
									fontFamily:Platform.OS === 'ios'?"Roboto-Regular":"Robotoregular",
									fontSize:13,
									color:"#808080",
								}}>{i18n.t('Login.createNewAccount')}</Text>
							</TouchableOpacity>
						</View>
		    		</View>
		    	</View>
		    )
		    :
		    this.state.screen == 2?
		    (
				<View>
					<View style={{
						padding:10,
					}}>
						<Text style={{
							fontSize:18,
							fontFamily:Platform.OS === 'ios'?"Roboto-Regular":"Robotoregular",
							color:"#98999b",
						}}>{i18n.t('Login.emailSignInTitle')}</Text>

					</View>

					<View style={{
							flexDirection:'column',
							height:250,
							width:"100%",
							borderWidth:2,
							borderColor:'rgba(0,0,0,0.1)',
							padding:10,
						}}>
						<View style={{
							flex:1,
							alignItems:"center",
							justifyContent:"center",
						}}>
							<TextInput style={{
								width:"90%",
								backgroundColor:"#f5f6f8",
								borderColor:'rgba(0,0,0,0.1)',
								borderWidth:1,
								height:50,
								paddingHorizontal:10,
							}}
							placeholder={i18n.t('Login.email')}
							autoCompleteType={"email"}
							textContentType={"emailAddress"}
							keyboardType={"email-address"}
							onChangeText={text => {
								this.setState({email:text})
							}}></TextInput>

							<TextInput style={{
								width:"90%",
								backgroundColor:"#f5f6f8",
								borderColor:'rgba(0,0,0,0.1)',
								borderWidth:1,
								height:50,
								marginTop:15,
								paddingHorizontal:10,
							}}
							placeholder={i18n.t('Login.password')}
							autoCompleteType={"password"}
							textContentType={"password"}
							secureTextEntry={true}
							onChangeText={text => {
								this.setState({password:text})
							}}></TextInput>
						</View>
						<View style={{
							flex:1,
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
								//this.fakeSignIn();
								console.log("SDFSDFDS");
								if(this.state.email == ""){
									this.setState({errorMessage:i18n.t('Login.emailSignInErrorMessages.emailMissing'),showErrorDialog:true});
									return;
								}
								if(this.state.password == "" || this.state.password.length < 6){
									this.setState({errorMessage:i18n.t('Login.emailSignInErrorMessages.passwordInvalid'),showErrorDialog:true});
									return;
								}
								this.setState({showLoadingAlert:true});
								auth().signInWithEmailAndPassword(this.state.email,this.state.password).then(() => {
									//Succesfully Logged In
									//this.setState({showLoadingAlert:false});
								}).catch((error) => {
									console.log(error.code);
									let errorMessage = i18n.t('Login.emailSignInErrorMessages.authErrorUnknown');
									if(error.code === "auth/user-not-found"){
										errorMessage = i18n.t('Login.emailSignInErrorMessages.authUserNotFound');
									}else if (error.code == 'auth/invalid-email'){
										errorMessage = i18n.t('Login.emailSignInErrorMessages.authInvalidEmail');
									}else if(error.code == "auth/wrong-password"){
										errorMessage = i18n.t('Login.emailSignInErrorMessages.authIncorrectPassword');
									}
									this.setState({showLoadingAlert:false,errorMessage:errorMessage});
								})
							}}>

								<Text style={{
									fontSize:20,
				    				fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
				    				color:"#FFFFFF",
								}}>{i18n.t('Login.submitLogin')}</Text>

							</TouchableOpacity>
						</View>
					</View>
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
		    )
		    :
		    (
				<View>
					<View style={{
						padding:10,
					}}>
						<Text style={{
							fontSize:18,
							fontFamily:Platform.OS === 'ios'?"Roboto-Regular":"Robotoregular",
							color:"#98999b",
						}}>{i18n.t('Login.emailSignUpTitle')}</Text>

					</View>

					<View style={{
							flexDirection:'column',
							height:350,
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
								width:"90%",
								backgroundColor:"#f5f6f8",
								borderColor:'rgba(0,0,0,0.1)',
								borderWidth:1,
								height:50,
								paddingHorizontal:10,
							}}
							placeholder={i18n.t('Login.email')}
							autoCompleteType={"email"}
							textContentType={"emailAddress"}
							keyboardType={"email-address"}
							onChangeText={text => {
								this.setState({email:text})
							}}></TextInput>

							<TextInput style={{
								width:"90%",
								backgroundColor:"#f5f6f8",
								borderColor:'rgba(0,0,0,0.1)',
								borderWidth:1,
								height:50,
								marginTop:15,
								paddingHorizontal:10,
							}}
							placeholder={i18n.t('Login.password')}
							autoCompleteType={"password"}
							textContentType={"password"}
							secureTextEntry={true}
							onChangeText={text => {
								this.setState({password:text})
							}}></TextInput>

							<TextInput style={{
								width:"90%",
								backgroundColor:"#f5f6f8",
								borderColor:'rgba(0,0,0,0.1)',
								borderWidth:1,
								height:50,
								marginTop:15,
								paddingHorizontal:10,
							}}
							placeholder={i18n.t('Login.confirmPassword')}
							autoCompleteType={"password"}
							textContentType={"password"}
							secureTextEntry={true}
							onChangeText={text => {
								this.setState({confirmPassword:text})
							}}></TextInput>
						</View>
						<View style={{
							flex:1,
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
								if(this.state.email == ""){
									this.setState({errorMessage:i18n.t('Login.emailSignInErrorMessages.emailMissing'),showErrorDialog:true});
									return;
								}
								if(this.state.password != this.state.confirmPassword){
									this.setState({errorMessage:i18n.t('Login.emailSignInErrorMessages.passwordMismatch'),showErrorDialog:true});
									return;
								}

								if(this.state.password == "" || this.state.password.length < 6){
									this.setState({errorMessage:i18n.t('Login.emailSignInErrorMessages.passwordInvalid'),showErrorDialog:true});
									return;
								}
								this.setState({showLoadingAlert:true});
								auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then(() => {
									//Succesfully Logged In
									//this.setState({showLoadingAlert:false});
								}).catch((error) => {
									console.log(error.code);
									var errorMessage = i18n.t('Login.emailSignInErrorMessages.authErrorUnknown');
									if(error.code === "auth/user-not-found"){
										errorMessage = i18n.t('Login.emailSignInErrorMessages.authUserNotFound');
									}else if (error.code === "auth/invalid-email"){
										errorMessage = i18n.t('Login.emailSignInErrorMessages.authInvalidEmail');
									}else if (error.code === "auth/email-already-in-use") {
										errorMessage = i18n.t('Login.emailSignInErrorMessages.authEmailAlreadyInUse');
									}
									console.log("HERE");
									this.setState({showLoadingAlert:false,errorMessage:errorMessage});
								})
							}}>

								<Text style={{
									fontSize:20,
				    				fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
				    				color:"#FFFFFF",
								}}>{i18n.t('Login.submitSignUp')}</Text>

							</TouchableOpacity>
						</View>
					</View>
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
		    )
	    );
    }
}

const mapStateToProps = (state) => {
	return {
		cart: state.cart.list,
	}
}

const mapDispatchToProps = () => {
	return actions
}

export default connect(mapStateToProps,mapDispatchToProps())(Login);