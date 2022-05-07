import ServiceApi from '../ServiceApi';

export const login = async (data) => {
	try {
		const results = await ServiceApi.post(`/oauth/token`, data)
		return results.data
	} catch (e) {
		throw e
	}
}
