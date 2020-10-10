import baseurl from "./BaseUrl"

class SignIn {
	byMail = (mail,password) => {
		var promise = new Promise(  async (resolve, reject) => {
			try{
				fetch(baseurl+"signInByMail", {
					method: "POST", // *GET, POST, PUT, DELETE, etc.
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						mail: mail,
						password: password
					}) 
				}).then((response) => response.json()).then((data) => {
					resolve(data);
				}).catch((error) => {
					console.log("internal error");
					console.log(error);
					reject();
				});
			}catch(e){
				console.log("error");
				console.log(e);
				reject();
			}
		});

		return promise;
	}
}

export default new SignIn()