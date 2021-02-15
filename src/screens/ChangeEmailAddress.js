import React from 'react';
import { Text, View, I18nManager, TextInput, TouchableOpacity} from 'react-native';
import { Formik } from 'formik';
import i18n from '../i18n';
import AwesomeAlert from 'react-native-awesome-alerts';
import auth from '@react-native-firebase/auth';
import EditInformation from '../providers/EditInformation';
import AsyncStorage from '@react-native-community/async-storage';

export default class ChangeEmailAddress extends React.Component {

	static navigationOptions = ({ navigation }) => {
		return{
			title:i18n.t('Profile.ChangeEmailAddress.title'),
		}
	};

	constructor(props) {
		super(props)
		this.hasLoaded = false;
		this.state = {
			showLoadingAlert:true,
			showErrorAlert:false,
			errorAlertMsg:"",
			hasSubmitted: false,
			email:"",
		}
	}

	reloadData = (payload) => {
		setTimeout(() => {
			this.setState(payload);
		},1000)
	}

	componentDidMount = () => {
		let user = auth().currentUser;

		this.reloadData({
			email: user.email,
			showLoadingAlert: false
		});
	}

	onLoadingModalDismiss = () => {
		if(this.state.errorAlertMsg != ""){
			this.setState({
				showErrorAlert: true
			})
		}else{
			//Navigate To Validation Page on Phone Number Change or Go Back
			if(!this.hasLoaded){
				this.hasLoaded = true;
			}else{
				auth().signOut().then(async () => {
					try{
						await AsyncStorage.removeItem('loggedUser');
						this.props.navigation.navigate('Auth');
					}catch(error){
						console.log("error:");
						console.log(error);
						this.props.navigation.navigate('Auth');
					}
				});
			}
		}
	}

	render(){
		return(
			<View style={{
				padding:10,
				width:"100%",
				height:"100%"
			}}>
				<Formik
					enableReinitialize={true}
					initialValues={{
						email:"",
						password:""
					}}
					onSubmit={async (values) => {
						//After Validation
						this.setState({showLoadingAlert:true})
						if(this.state.email == values.email){
							this.setState({
								showLoadingAlert:false,
								errorAlertMsg: i18n.t('Profile.ChangeEmailAddress.errorSameEmail')
							})
						}else{
							let user = auth().currentUser;
							const credential = auth.EmailAuthProvider.credential(
							    user.email, 
							    values.password
							);
							user.reauthenticateWithCredential(credential).then(async () => {
								let firstname = "Unknown";
								let lastname = "User";
								if(user.displayName != null){
									let displayNameSplited = user.displayName.split(" ");
									firstname = displayNameSplited[0];
									lastname = displayNameSplited[1];
								}

								let info = {
									firstName: firstname,
									lastName: lastname,
									mail: values.email,
									phoneNumber: user.phoneNumber,
								};
								let editInformationReponse = await EditInformation.submit(info);
								if(editInformationReponse.status){
									console.log("UPDATED STATUS FADY");
									user.updateEmail(values.email).then(() => {
										console.log("UPDATED STATUS FIREBASE");
										this.setState({
											showLoadingAlert:false,
										})
									}).catch((error) => {
										console.log(error);
										this.setState({
											showLoadingAlert:false,
											errorAlertMsg: i18n.t('Profile.ChangeEmailAddress.errorChangingMail')
										})
									})
								}else{
									this.setState({
										showLoadingAlert:false,
										errorAlertMsg: i18n.t('Profile.ChangeEmailAddress.errorChangingMail')
									})
								}
							}).catch((error) => {
								console.log(error);
								this.setState({
									showLoadingAlert:false,
									errorAlertMsg: i18n.t('Profile.ChangeEmailAddress.errorChangingMail')
								})
							})
							
						}
					}}
					validateOnChange={this.state.hasSubmitted}
					validateOnBlur={false}
					validate={values => {
						this.setState({
							hasSubmitted: true
						})
						const errors = {};

						if(!values.email){
							errors.email = i18n.t('General.Validation.fieldRequired');
						}else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
							errors.email = i18n.t('General.Validation.invalidEmail');
						}

						return errors;
					}}
				>
					{({ handleChange, handleBlur, handleSubmit, values, errors }) => (
						<View style={{
							padding:10,
							width:"100%",
							height:"100%"
						}}>
							<View style={{
								width:"100%",
								height:70,
								borderBottomWidth:1,
								borderColor: "rgba(0,0,0,0.2);",
								justifyContent:"center",
								alignItems:"flex-start",
							}}>
								<TextInput 
									style={{
										height:"100%",
										width:"100%",
									}}
									textAlign={I18nManager.isRTL?'right':'left'}
									placeholder={i18n.t('Profile.ChangeEmailAddress.email')}
									placeholderTextColor="#000"
									onChangeText={handleChange('email')}
									onBlur={handleBlur('email')}
									value={values.email}
									autoCompleteType={'email'}
									textContentType={"emailAddress"}
									keyboardType={"email-address"}
									onSubmitEditing={() => {this.passwordInputRef.focus(); }}
								/>
							</View>
							<View>
								{
									errors.email?
									<Text style={{color:"red"}}>{errors.email}</Text>
									:
									null
								}
							</View>

							<View style={{
								width:"100%",
								height:70,
								borderBottomWidth:1,
								borderColor: "rgba(0,0,0,0.2);",
								justifyContent:"center",
								alignItems:"flex-start",
							}}>
								<TextInput 
									ref={(input) => {this.passwordInputRef = input;}}
									style={{
										height:"100%",
										width:"100%",
									}}
									textAlign={I18nManager.isRTL?'right':'left'}
									placeholder={i18n.t('Profile.ChangeEmailAddress.password')}
									placeholderTextColor="#000"
									onChangeText={handleChange('password')}
									onBlur={handleBlur('password')}
									value={values.password}
									autoCompleteType={"password"}
									textContentType={"password"}
									secureTextEntry={true}
								/>
							</View>
							<View>
								{
									errors.lastname?
									<Text style={{color:"red"}}>{errors.lastname}</Text>
									:
									null
								}
							</View>

							<View style={{
								width:"100%",
								height:70,
								borderBottomWidth:1,
								borderColor: "rgba(0,0,0,0.2);",
								justifyContent:"center",
								alignItems:"flex-start",
							}}>
								<TouchableOpacity style={{
									backgroundColor:"#357541",
									alignItems:"center",
									justifyContent:"center",
									height:"100%",
									width:"100%",
									marginTop:10,
									borderRadius:10,
								}} onPress={handleSubmit}>
									<Text style={{
										color:"#FFFFFF",
										fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
										fontSize:18,
									}}>{i18n.t('Profile.ChangeEmailAddress.editEmailAddress')}</Text>
								</TouchableOpacity>
							</View>
						</View>
						)}
					</Formik>

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
						confirmText="OK"
						title="Error"
						message={this.state.errorAlertMsg}
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