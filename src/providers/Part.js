import axios from 'axios';
import baseurl from "./BaseUrl"
import AsyncStorage from '@react-native-community/async-storage';

class Part {
	fetch = (brandId,modelId,modelYear,mainCategoryId) => {
		var promise = new Promise(  async (resolve, reject) => {
			try{
				let loggedUser = await AsyncStorage.getItem('loggedUser');
				var headers = null;
				if(loggedUser != null){
					let loggedUserObj = JSON.parse(loggedUser);
					headers = {
						"Content-Type": "application/json",
						"Authorization": loggedUserObj.token
					};
				}else{
					headers = {
						"Content-Type": "application/json"
					};
				}
				let loggedUserObj = JSON.parse(loggedUser);
				fetch(baseurl+"getSpareParts", {
					method: "POST", // *GET, POST, PUT, DELETE, etc.
					headers: headers,
					body: JSON.stringify({
						brandId:brandId,
						modelId:modelId,
						modelYear:modelYear,
						mainCategoryId:mainCategoryId,
					})
				}).then((response) => response.json()).then((data) => {
					resolve(data);
				}).catch((error) => {
					console.log("show spare parts");
					console.log(error);
					reject();
				});
			}catch(e){
				console.log(e);
				reject();
			}
		});

		return promise;
	}
}

export default new Part()