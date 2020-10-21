import baseurl from "./BaseUrl"
import AsyncStorage from '@react-native-community/async-storage';

class Address {
	add = (address) => {
		var promise = new Promise(  async (resolve, reject) => {
			try{
				let loggedUser = await AsyncStorage.getItem('loggedUser');
				if(loggedUser != null){
					let loggedUserObj = JSON.parse(loggedUser);
					fetch(baseurl+"addAdress", {
						method: "POST", // *GET, POST, PUT, DELETE, etc.
						headers: {
							"Content-Type": "application/json",
							"Authorization": loggedUserObj.token
						},
						body: JSON.stringify(address) 
					}).then((response) => response.json()).then((data) => {
						resolve(data);
					}).catch((error) => {
						console.log(error);
						reject();
					});
				}else{
					reject();
				}
			}catch(e){
				reject();
			}
		});

		return promise;
	}

	fetch = () => {
		var promise = new Promise(  async (resolve, reject) => {
			try{
				let loggedUser = await AsyncStorage.getItem('loggedUser');
				if(loggedUser != null){
					let loggedUserObj = JSON.parse(loggedUser);
					fetch(baseurl+"getAdress", {
						method: "POST", // *GET, POST, PUT, DELETE, etc.
						headers: {
							"Content-Type": "application/json",
							"Authorization": loggedUserObj.token
						},
					}).then((response) => response.json()).then((data) => {
						resolve(data);
					}).catch((error) => {
						console.log(error);
						reject();
					});
				}else{
					reject();
				}
			}catch(e){
				reject();
			}
		});

		return promise;
	}
}

export default new Address()