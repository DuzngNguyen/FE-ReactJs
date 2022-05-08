import {useEffect} from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

export default function ProductNew({listProduct}) {
	const countLoading = [
		{
			id : 1
		},
		{
			id : 2
		},
		{
			id : 3
		},
		{
			id : 4
		}
	];

	useEffect(() => {

	},[listProduct])

	return (
		<div className="bg-white">
			<div className="max-w-2xl mx-auto px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Sản phẩm mới nhất</h2>

				<div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{listProduct && listProduct.products.map((product) => (
						<div key={product.id} className="group relative">
							<div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
								<img
									src={product.avatar}
									alt={product.name}
									className="w-full h-full object-center object-cover lg:w-full lg:h-full"
								/>
							</div>
							<div className="mt-4 flex justify-between">
								<div>
									<h3 className="text-sm text-gray-700">
										<a href={'/san-pham/' + product.slug + '-' + product.id}>
											<span aria-hidden="true" className="absolute inset-0" />
											{product.name}
										</a>
									</h3>
									{/*<p className="mt-1 text-sm text-gray-500">{product.color}</p>*/}
								</div>
								<p className="text-sm font-medium text-gray-900">{product.price}</p>
							</div>
						</div>
					))}

					{!listProduct && countLoading.map((item) => (
						<div key={item.id} className="group relative">
							<div className="w-full  aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
								<Skeleton count={1} height={100} style={{ marginBottom: '20px'}} />
							</div>
							<Skeleton count={2} height={20} style={{
								marginBottom: '10px'
							}} />
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
