import axios from 'axios';
import { getToken, removeSession } from '../functions/common-func'

const URL = 'http://laravel-api.abc:8888';
const ServiceApi = axios.create({
	baseURL: URL,
	responseType: 'json',
})
console.log('---------- process.env.URL: ', process.env.URL);
// console.log('---------- ServiceApi: ', ServiceApi);

let accessToken = getToken()
ServiceApi.defaults.timeout = 20000
ServiceApi.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;

ServiceApi.defaults.headers.post['Content-Type'] = 'application/json';
ServiceApi.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
ServiceApi.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

ServiceApi.interceptors.response.use(
	function (response) {
		if (
			(response.data && response.data.error_code === 401) ||
			(response.data && response.data.code === 401) ||
			(response.data && response.data.statusCode === 401) ||
			(response.data && response.data.status === 401)
		) {
			// removeSession('userInfo')
			// removeSession('role')
			window.location.href = `/login`
		}
		return response
	},
	function (error) {

		if (error?.response?.status === 401 && error?.response?.data?.statusCode === 401) {
			// removeSession('userInfo')
			// removeSession('role')
			window.location.href = `/login`
		}

		return Promise.reject(error)
	}
)

export default ServiceApi
