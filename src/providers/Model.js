import axios from 'axios';
import baseurl from "./BaseUrl"

class Model {
	fetch = (brandId) => {
		var promise = new Promise(  async (resolve, reject) => {
			try{
				let response = await axios.post(baseurl+"getCarModels/ar",{brandId:brandId});
				resolve(response);
			}catch(e){
				reject();
			}
		});

		return promise;
	}
}

export default new Model()