import ServiceApi from '../ServiceApi';

export const createContact = async (data) => {
	try {
		const results = await ServiceApi.post(`/api/contact/store`, data)
		return results.data
	} catch (e) {
		throw e
	}
}
