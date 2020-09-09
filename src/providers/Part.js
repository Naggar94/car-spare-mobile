import axios from 'axios';
import baseurl from "./BaseUrl"

class Part {
	fetch = (brandId,modelId,modelYear,mainCategoryId) => {
		var promise = new Promise(  async (resolve, reject) => {
			try{
				let response = await axios.post(baseurl+"getSpareParts",{
					brandId:brandId,
					modelId:modelId,
					modelYear:modelYear,
					mainCategoryId:mainCategoryId,
				});
				resolve(response);
			}catch(e){
				reject();
			}
		});

		return promise;
	}
}

export default new Part()