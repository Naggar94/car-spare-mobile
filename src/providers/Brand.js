import axios from 'axios';
import baseurl from "./BaseUrl"

class Brand {
	fetch = () => {
		var promise = new Promise(  async (resolve, reject) => {
			try{
				let response = await axios.post(baseurl+"getCarBrandNames/ar");
				resolve(response);
			}catch(e){
				reject();
			}
		});

		return promise;
	}
}

export default new Brand()