import baseurl from "./BaseUrl"
import AsyncStorage from '@react-native-community/async-storage';

class Order {
	submit = (order) => {
		var promise = new Promise(  async (resolve, reject) => {
			try{
				let loggedUser = await AsyncStorage.getItem('loggedUser');
				if(loggedUser != null){
					let loggedUserObj = JSON.parse(loggedUser);
					fetch(baseurl+"addOrder", {
						method: "POST", // *GET, POST, PUT, DELETE, etc.
						headers: {
							"Content-Type": "application/json",
							"Authorization": loggedUserObj.token
						},
						body: JSON.stringify(order) 
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

export default new Order()