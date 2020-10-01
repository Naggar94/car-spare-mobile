import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Text, View, TouchableOpacity,TextInput,I18nManager,BackHandler, Platform} from 'react-native';
import FontisoIcon from 'react-native-vector-icons/Fontisto';
import RNRestart from 'react-native-restart';
import i18n from '../i18n';
import { connect } from 'react-redux';
import actions from './../actions';
import auth from '@react-native-firebase/auth';
// import { LoginManager, AccessToken } from 'react-native-fbsdk';

class Login extends React.Component {

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
			screen:1,
			cart:{}
		}
    }

    componentDidMount() {
    	this.updateCart();
    	BackHandler.addEventListener('hardwareBackPress', (this._handleBackButton));
    }

    componentDidUpdate() {
		this.updateCart();
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
    		this.setState({'screen':this.state.screen - 1});
    	}
    	return true;
    }

    componentWillUnmount () {
    	BackHandler.removeEventListener('hardwareBackPress', this._handleBackButton);
    }

    render(){
    	return(
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

		    			<TouchableOpacity 
		    			onPress={() => {
		    				this.setState({'screen':2});
		    			}}
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
		        			borderRadius:15
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

		    			</TouchableOpacity>

		    			<TouchableOpacity style={{
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
		        			borderRadius:15
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

		    			</TouchableOpacity>

		    			<TouchableOpacity style={{
		    				width:"90%",
		    				flexDirection: 'row',
		    				height:50,
		        			justifyContent: 'flex-start',
		        			alignItems:"center",
		        			paddingLeft:25,
		        			paddingRight:25,
		        			borderColor:"#707070",
		        			borderWidth:1,
		        			borderRadius:15
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

		    			</TouchableOpacity>

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
			    		}}>رقم الهاتف *</Text>

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
			    			flex:1,
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
			    			}}>

			    				<Text style={{
			    					fontSize:20,
				    				fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",
				    				color:"#FFFFFF",
			    				}}>التحقق من الرقم</Text>

			    			</TouchableOpacity>
			    		</View>
			    	</View>
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