import React from 'react';
import { Text, View, TouchableOpacity, I18nManager} from 'react-native';
import { FlatList } from 'react-navigation';
import i18n from '../i18n';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart';

export default class Profile extends React.Component {

	static navigationOptions = ({ navigation }) => {
		return{
			title:i18n.t('Profile.title'),
		}
	};

	constructor(props) {
		super(props)
		this.state = {
			listItems:[
				{
					id:"1",
					title:i18n.t('Profile.item.basicInformation'),
					action: (() => {

					})
				},
				{
					id:"2",
					title:i18n.t('Profile.item.wishList'),
					action: (() => {
						this.props.navigation.navigate('Favorites');
					})
				},
				{
					id:"3",
					title:i18n.t('Profile.item.changeLanguage'),
					action: (() => {
						try {
							let newLocale = "en";
							AsyncStorage.getItem('locale').then(async (currentLocale) => {
								if(currentLocale == 'ar'){
									I18nManager.allowRTL(false);
			  						I18nManager.forceRTL(false);
								}else{
									newLocale = 'ar';
									I18nManager.allowRTL(true);
			  						I18nManager.forceRTL(true);
								}

								await AsyncStorage.setItem('locale',newLocale);
								RNRestart.Restart();
							})
						}catch (error) {
							// Error saving data
						}
					})
				},
				{
					id:"4",
					title:i18n.t('Profile.item.logout'),
					action: (() => {
						auth().signOut().then(() => {
							this.props.navigation.navigate('Auth');
						});
					})
				}
			]
		}
    }

    render(){
    	return(
	    	<View style={{
				backgroundColor:"#FFFFFF",
				width:"100%",
				height:"100%",
			}}>
				<FlatList
					data={this.state.listItems}
					renderItem={ ({item,index}) => {
						return(
							<TouchableOpacity key={item.id} style={{
								height:65,
								borderBottomColor: 'black',
								borderBottomWidth: 2,
								justifyContent:"center",
								paddingLeft:10,
							}} onPress={() => {
								item.action();
							}}>
								<Text style={{fontSize:20,fontFamily:Platform.OS === 'ios'?"Roboto-Bold":"Robotobold",alignSelf:"flex-start"}}>{item.title}</Text>
							</TouchableOpacity>
						);
					}}
					keyExtractor={(item,index) => item.id}
				/>
			</View>
	    );
    }
}