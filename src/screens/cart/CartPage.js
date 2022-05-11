import {useEffect, useState, Fragment} from 'react';
import {fetchListsProducts} from '../../api/product/ProductServiceApi';
import ProductNew from '../../containers/home/ProductNew';
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

const products = [
	{
		id: 1,
		name: 'Throwback Hip Bag',
		href: '#',
		color: 'Salmon',
		price: '$90.00',
		quantity: 1,
		imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
		imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
	},
	{
		id: 2,
		name: 'Medium Stuff Satchel',
		href: '#',
		color: 'Blue',
		price: '$32.00',
		quantity: 1,
		imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
		imageAlt:
			'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
	},
	// More products...
]

function CartPage()
{
	const [listProduct, setListProduct] = useState(null)
	const [open, setOpen] = useState(true)
	useEffect(() => {
		getListsProducts().then(r => {});
	}, []);

	const getListsProducts = async (filter) => {
		filter = `?page=1&limit=8`;
		const results = await fetchListsProducts(filter)
		if (results && results.status === 'success')
		{
			console.log('====================: ', results.data.products);
			setListProduct(results.data);
		}
	}
	return (
		<div></div>
	)
}

export default CartPage;
