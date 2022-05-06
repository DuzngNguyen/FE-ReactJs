import ServiceApi from '../ServiceApi';

export const fetchListsProducts = async (filter) => {
	try {
		const results = await ServiceApi.get(`/api/products${filter}`)
		return results.data
	} catch (e) {
		throw e
	}
}

export const fetchProductDetail = async (productId) => {
	try {
		const results = await ServiceApi.get(`/api/products/show/${productId}`)
		return results.data
	} catch (e) {
		throw e
	}
}
