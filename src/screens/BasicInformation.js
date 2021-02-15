import React from 'react';
import { Text, View, I18nManager, TextInput, TouchableOpacity} from 'react-native';
import { Formik } from 'formik';
import i18n from '../i18n';
import AwesomeAlert from 'react-native-awesome-alerts';
import auth from '@react-native-firebase/auth';
import EditInformation from '../providers/EditInformation';

export default class BasicInformation extends React.Component {

	static navigationOptions = ({ navigation }) => {
		return{
			title:i18n.t('Profile.BasicInformation.title'),
		}
	};

	constructor(props) {
		super(props)
		this.state = {
			showLoadingAlert:false,
			showErrorAlert:false,
			errorAlertMsg:"",
			hasSubmitted: false,
			firstname:"",
			lastname:"",
		}
	}

	componentDidMount = () => {
		let user = auth().currentUser;
		let firstname = "Unknown";
		let lastname = "User";
		if(user.displayName != null){
			let displayNameSplited = user.displayName.split(" ");
			firstname = displayNameSplited[0];
			lastname = displayNameSplited[1];
		}

		this.setState({
			firstname: firstname,
			lastname: lastname,
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
			this.props.navigation.goBack();
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
						firstname:this.state.firstname,
						lastname:this.state.lastname
					}}
					onSubmit={async (values) => {
						//After Validation
						this.setState({
							showLoadingAlert:true
						})
						let user = auth().currentUser;
						let info = {
							firstName: values.firstname,
							lastName: values.lastname,
							mail: user.email,
							phoneNumber: user.phoneNumber,
						};
						await auth().currentUser.updateProfile({
							displayName: values.firstname + " " + values.lastname,
						});
						let editInformationReponse = await EditInformation.submit(info);
						if(editInformationReponse.status){
							this.setState({
								showLoadingAlert:false,
							})
						}else{
							this.setState({
								showLoadingAlert:false,
								errorAlertMsg:"Error editing information"
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

						if(!values.firstname){
							errors.firstname = i18n.t('General.Validation.fieldRequired');
						}

						if(!values.lastname){
							errors.lastname = i18n.t('General.Validation.fieldRequired');
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
									placeholder={i18n.t('Profile.BasicInformation.firstname')}
									placeholderTextColor="#000"
									onChangeText={handleChange('firstname')}
									onBlur={handleBlur('firstname')}
									value={values.firstname}
									autoCompleteType={'name'}
									textContentType={"givenName"}
									keyboardType={"default"}
									onSubmitEditing={() => {this.lastNameInputRef.focus(); }}
								/>
							</View>
							<View>
								{
									errors.firstname?
									<Text style={{color:"red"}}>{errors.firstname}</Text>
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
									ref={(input) => {this.lastNameInputRef = input;}}
									style={{
										height:"100%",
										width:"100%",
									}}
									textAlign={I18nManager.isRTL?'right':'left'}
									placeholder={i18n.t('Profile.BasicInformation.lastname')}
									placeholderTextColor="#000"
									onChangeText={handleChange('lastname')}
									onBlur={handleBlur('lastname')}
									value={values.lastname}
									autoCompleteType={'name'}
									textContentType={"familyName"}
									keyboardType={"default"}
									onSubmitEditing={() => {this.phoneInputRef.focus(); }}
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
									}}>{i18n.t('Profile.BasicInformation.editInformation')}</Text>
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