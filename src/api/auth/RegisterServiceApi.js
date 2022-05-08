import ServiceApi from '../ServiceApi';

export const register = async (data) => {
	try {
		const results = await ServiceApi.post(`api/auth/register`, data)
		return results.data
	} catch (e) {
		throw e
	}
}
