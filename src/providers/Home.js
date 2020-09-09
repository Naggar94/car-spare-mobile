import axios from 'axios';
import baseurl from "./BaseUrl"

class Home {
	fetch = () => {
		var promise = new Promise(  async (resolve, reject) => {
			try{
				let response = await axios.post(baseurl+"startPage/ar");
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