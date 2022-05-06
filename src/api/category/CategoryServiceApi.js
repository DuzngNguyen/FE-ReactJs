import ServiceApi from '../ServiceApi';

export const fetchListsCategoryHot = async (data) => {
	try {
		const results = await ServiceApi.get(`/api/categories`)
		return results.data
	} catch (e) {
		throw e
	}
}
