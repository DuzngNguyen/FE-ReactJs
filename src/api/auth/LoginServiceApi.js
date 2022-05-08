import ServiceApi from '../ServiceApi';

export const login = async (data) => {
	try {
		const results = await ServiceApi.post(`api/auth/login`, data)
		return results.data
	} catch (e) {
		throw e
	}
}
