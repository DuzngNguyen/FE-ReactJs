import ProductNew from '../../containers/home/ProductNew';
import {useEffect, useState} from 'react';
import {fetchListsProducts} from '../../api/product/ProductServiceApi';
import CategoryHot from '../../containers/home/CategoryHot';
import {fetchListsCategoryHot} from '../../api/category/CategoryServiceApi';

function HomePage() {

	const [listProduct, setListProduct] = useState(null)
	const [listCategories, setListCategories] = useState(null)

	useEffect(() => {
		getListsProducts().then(r => {});
		getListsCategoriesHot().then(r => {});
	}, []);

	const getListsProducts = async (filter) => {
		filter = `?page=1&limit=8`;
		const results = await fetchListsProducts(filter)
		if (results && results.status === 'success')
		{
			setListProduct(results.data);
		}
	}

	const getListsCategoriesHot = async () => {
		const results = await fetchListsCategoryHot()
		if (results && results.status === 'success')
		{
			setListCategories(results.data);
		}
	}

	return (
		<>
			<div className="bg-white">
				<CategoryHot listCategories={listCategories}/>
				<ProductNew  listProduct={listProduct}/>
			</div>
		</>
	)
}

export default HomePage;
