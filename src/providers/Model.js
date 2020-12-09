import axios from 'axios';
import baseurl from "./BaseUrl"
import AsyncStorage from '@react-native-community/async-storage';

class Model {
	fetch = (brandId) => {
		var promise = new Promise(  async (resolve, reject) => {
			try{
				let locale = await AsyncStorage.getItem('locale');
				let response = await axios.post(baseurl+"getCarModels/"+locale,{brandId:brandId});
				resolve(response);
			}catch(e){
				reject();
			}
		});

		return promise;
	}
}

export default new Model()