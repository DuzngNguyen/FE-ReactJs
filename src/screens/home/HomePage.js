import ProductNew from '../../containers/home/ProductNew';
import {useEffect, useState} from 'react';
import {fetchListsProducts} from '../../api/product/ProductServiceApi';

function HomePage() {

	const [listProduct, setListProduct] = useState(null)

	useEffect(() => {
		getListsProducts();
	}, []);

	const getListsProducts = async (filter) => {
		filter = `?page=1&limit=8`;
		const results = await fetchListsProducts(filter)
		if (results && results.status === 'success')
		{
			console.log('====================: ', results.data.products);
			setListProduct(results.data);
		}

		console.log('=========== data:fetchListsProducts ', results.status);
	}
	return (
		<>
			<div className="bg-white">
				<h2>Đây là Trang chủ</h2>
				<ProductNew  listProduct={listProduct}/>
			</div>
		</>
	)
}

export default HomePage;
