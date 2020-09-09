import React from 'react';
import { Text, View, TouchableOpacity,TextInput,I18nManager,BackHandler} from 'react-native';
import FontisoIcon from 'react-native-vector-icons/Fontisto';

export default class Login extends React.Component {
	static navigationOptions = {
	    title: 'تسجيل الدخول',
	};
	constructor(props) {
		super(props)
		I18nManager.forceRTL(true);
		this.state = {
			screen:1,
		}
    }

    componentDidMount() {
    	BackHandler.addEventListener('hardwareBackPress', (this._handleBackButton));
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
			    			fontFamily:"Robotobold",
			    		}}>
			    			اهلا بكم في قطع غياري
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
			    			fontFamily:"Robotoregular",
			    			textAlign:"center",
			    			width:"80%"
			    		}}>
			    			حيث يمكنك شراء جميع احتياجتك من قطع غيار و اكسسوارات السيارات
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
				    				fontFamily:"Robotoregular",
				    				color:"#FFFFFF",
			    				}}>الاستمرار بواسطة حساب فيسبوك </Text>
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
				    				fontFamily:"Robotoregular",
				    				color:"#707070",
			    				}}>الاستمرار بواسطة حساب جوجل</Text>
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
				    				fontFamily:"Robotoregular",
				    				color:"#707070",
			    				}}>الاستمرار بواسطة حساب ابل </Text>
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
			    			fontFamily:"Robotoregular",
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
				    					fontFamily:"Robotobold",
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
				    				fontFamily:"Robotobold",
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