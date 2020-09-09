import axios from 'axios';
import baseurl from "./BaseUrl"

class Type {
	fetchBasedOnBrand = (brandId,modelId,modelYear) => {
		var promise = new Promise(  async (resolve, reject) => {
			try{
				let response = await axios.post(baseurl+"getCategoryType",{
					brandId:brandId,
					modelId:modelId,
					modelYear:modelYear,
				});
				resolve(response);
			}catch(e){
				reject();
			}
		});

		return promise;
	}

	fetch = () => {
		var promise = new Promise(  async (resolve, reject) => {
			try{
				let response = await axios.post(baseurl+"getMainCategory");
				response.data.categories = response.data.category;
				resolve(response);
			}catch(e){
				reject();
			}
		});

		return promise;
	}
}

export default new Type()