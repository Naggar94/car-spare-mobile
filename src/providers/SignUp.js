import baseurl from "./BaseUrl"

class SignUp {
	fetch = (phoneNumber,mail,method,firebaseID,password) => {
		var promise = new Promise(  async (resolve, reject) => {
			try{
				fetch(baseurl+"signUp", {
					method: "POST", // *GET, POST, PUT, DELETE, etc.
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"firstname":"Annonymus",
						"lastname":"User",
						"phoneNumber":phoneNumber,
						"mail":mail,
						"method":method,
						"firebaseID":firebaseID,
						"password":password,
					}) 
				}).then((response) => response.json()).then((data) => {
					resolve(data);
				}).catch((error) => {
					console.log("internal error");
					console.log(error);
					reject();
				});
			}catch(e){
				reject();
			}
		});

		return promise;
	}
}

export default new SignUp()