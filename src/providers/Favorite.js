import baseurl from "./BaseUrl"
import AsyncStorage from '@react-native-community/async-storage';

class Favorite {
	add = (partId) => {
		var promise = new Promise(  async (resolve, reject) => {
			try{
				let loggedUser = await AsyncStorage.getItem('loggedUser');
				if(loggedUser != null){
					let loggedUserObj = JSON.parse(loggedUser);
					fetch(baseurl+"addToFavourite", {
						method: "POST", // *GET, POST, PUT, DELETE, etc.
						headers: {
							"Content-Type": "application/json",
							"Authorization": loggedUserObj.token
						},
						body: JSON.stringify({
							"part":partId,
						}) 
					}).then((response) => response.json()).then((data) => {
						resolve(data);
					}).catch((error) => {
						console.log("add to Favorite error");
						console.log(error);
						reject();
					});
				}else{
					console.log("add to Favorite ASYNC NOT WORKING");
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
					fetch(baseurl+"getUserFavourite", {
						method: "POST", // *GET, POST, PUT, DELETE, etc.
						headers: {
							"Content-Type": "application/json",
							"Authorization": loggedUserObj.token
						},
					}).then((response) => response.json()).then((data) => {
						resolve(data);
					}).catch((error) => {
						console.log("show Favorites error");
						console.log(error);
						reject();
					});
				}else{
					console.log("fetch Favorite ASYNC NOT WORKING");
					reject();
				}
			}catch(e){
				reject();
			}
		});

		return promise;
	}
}

export default new Favorite()