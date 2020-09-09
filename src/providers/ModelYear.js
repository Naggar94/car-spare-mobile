import axios from 'axios';
import baseurl from "./BaseUrl"

class ModelYear {
	fetch = (brandId,modelId) => {
		var promise = new Promise(  async (resolve, reject) => {
			try{
				let response = await axios.post(baseurl+"getModelYears",{
					brandId:brandId,
					modelId:modelId,
				});
				resolve(response);
			}catch(e){
				reject();
			}
		});

		return promise;
	}
}

export default new ModelYear()