import axios from "axios";

const baseUrl = "https://asia-east2-socialapp-40c09.cloudfunctions.net/api";

class HttpMethod {
	constructor() {
		this.axios = axios;
		this.axios.defaults.baseURL = baseUrl;
	}

	attachTokenToHeader(token) {
		this.axios.interceptors.request.use(
			function (config) {
				config.headers.Authorization = `Bearer ${token}`;
				return config;
			},
			function (error) {
				return Promise.reject(error);
			}
		);
	}

	deleteTokenHeader() {
		console.log("run delete token header");
		console.log({ axios: this.axios.defaults.headers });
		// delete this.axios.defaults.headers.common.Authorization;
		// this.axios.interceptors.request.use(
		// 	function (config) {
		// 		const tempConfig = { ...config };
		// 		console.log({ tempConfig });
		// 		delete tempConfig.headers.authorization;
		// 		delete tempConfig.headers.Authorization;
		// 		console.log("____");
		// 		console.log({ tempConfig });
		// 		return tempConfig;
		// 	},
		// 	function (error) {
		// 		return Promise.reject(error);
		// 	}
		// );
		// return delete this.axios.defaults.headers.Authorization;
	}

	get(...arg) {
		return this.axios.get(...arg);
	}

	post(...arg) {
		return this.axios.post(...arg);
	}

	delete(...arg) {
		return this.axios.delete(...arg);
	}
}

export default new HttpMethod();
