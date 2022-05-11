import ServiceApi from '../ServiceApi';

export const saveCart = async (data) => {
	try {
		const results = await ServiceApi.post(`/api/cart/save`, data)
		return results.data
	} catch (e) {
		throw e
	}
}
