import axios from 'axios';
import baseurl from "./BaseUrl"

class Search {
	fetch = (query) => {
		var promise = new Promise(  async (resolve, reject) => {
			try{
				let response = await axios.post(baseurl+"searchCase",{
					search:query,
				});
				resolve(response);
			}catch(e){
				reject();
			}
		});

		return promise;
	}
}

export default new Search()