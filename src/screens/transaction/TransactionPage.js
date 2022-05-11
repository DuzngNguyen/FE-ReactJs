import React, {useEffect, useState, Fragment} from 'react';
import {getLists} from '../../api/cart/CartServiceApi';
import {displayPrice} from '../../functions/common-func';

function TransactionPage()
{
	const [listCarts, setListCarts] = useState([])
	useEffect(() => {
		getListsCarts().then(r => {});
	}, []);

	const getListsCarts = async (filter) => {
		const results = await getLists()
		if (results && results.status === 'success')
		{
			console.log('====================: ', results.data);
			setListCarts(results.data);
		}
	}
	return (
		<div className="bg-white">
			<div className="max-w-2xl mx-auto pt-6" style={{ marginTop: "25px" }}>
				<nav aria-label="Breadcrumb">
					<ol role="list" className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
						<li className="text-sm">
							<a  aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
								Đơn hàng
							</a>
						</li>
					</ol>
				</nav>

				<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
					<div className="p-4">
						<label htmlFor="table-search" className="sr-only">Search</label>
						<div className="relative mt-1">
							<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
								<svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
								</svg>
							</div>
							<input type="text" id="table-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
						</div>
					</div>
					<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="p-4">
								<div className="flex items-center">
									<input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
									<label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
								</div>
							</th>
							<th scope="col" className="px-6 py-3">
								Name
							</th>
							<th scope="col" className="px-6 py-3">
								Email
							</th>
							<th scope="col" className="px-6 py-3">
								Phone
							</th>
							<th scope="col" className="px-6 py-3">
								Price
							</th>
						</tr>
						</thead>
						<tbody>
						{ listCarts && listCarts.transactions && listCarts.transactions.map((item, index) => (
							<tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
								<td className="w-4 p-4">
									<div className="flex items-center">
										<input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
										<label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
									</div>
								</td>
								<th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
									{item.t_name}
								</th>
								<td className="px-6 py-4">
									{item.t_email}
								</td>
								<td className="px-6 py-4">
									{item.t_phone}
								</td>
								<td className="px-6 py-4">
									$2999
									{displayPrice(item?.t_total_money)}
								</td>
							</tr>
						)) }
						</tbody>
					</table>
				</div>
				<p className="mt-5">Thông tin đơn hàng của bạn</p>
			</div>
		</div>
	)
}

export default TransactionPage;
