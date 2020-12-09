import axios from 'axios';
import baseurl from "./BaseUrl"
import AsyncStorage from '@react-native-community/async-storage';

class Home {
	fetch = () => {
		var promise = new Promise(  async (resolve, reject) => {
			try{
				let locale = await AsyncStorage.getItem('locale');
				let response = await axios.post(baseurl+"startPage/"+locale);
				resolve(response);
			}catch(e){
				console.log(e);
				reject();
			}
		});

		return promise;
	}
}

export default new Home()