import React, {Fragment, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {
	fetchProductDetail,
} from '../../api/product/ProductServiceApi';
import {displayPrice} from '../../functions/common-func';
import {useDispatch, useSelector} from 'react-redux';
import { decrement, increment } from './../../app/counter/counterSlice';
import {Dialog, Transition} from '@headlessui/react';
import {XIcon} from '@heroicons/react/outline';
import {saveCart} from '../../api/cart/CartServiceApi';
import {NotificationContainer, NotificationManager} from 'react-notifications';
const breadcrumbs = [
	{
		id : 1,
		name: 'Trang chủ',
		hrefElm: '/'
	},
	{
		id : 2,
		name: 'Sản phẩm',
		hrefElm: '/'
	},
]
function ProductDetailPage()
{
	const [productID, setProductID] = useState(2)
	const [product, setProductDetail] = useState(null)
	const [open, setOpen] = useState(false)

	const count = useSelector((state) => state.counter.value);
	const dispatch = useDispatch();
	let params = useParams();

	useEffect(() => {
		const id = params.id ?  params.id : null;
		console.log(' ============== id: ', id);
		if (id && id !== 'undefined') {
			console.log('--------- set PRODUCT', id);
			setProductID(id);
		}
		getProductById().then(r => {});

	},[]);

	const addCart = (e) => {
		e.preventDefault();
		setOpen(true);
	}

	const getProductById = async () => {
		const results = await fetchProductDetail(productID)
		console.log(' ============== results: ', results);

		if (results && results.status === 'success')
		{
			setProductDetail(results.data.product);
		}
	}

	const payCart = async (e) => {
		e.preventDefault();
		let cart = {
			products_id: productID
		}
		const results = await saveCart(cart);
		if (results && results.status === 'success') {
			NotificationManager.success('Dữ liệu đã được xử lý, Admin sẽ liên hệ với bạn', 'Thông báo');
			window.location.href = `/`
		}

		if (results && results.status === 'error' || results.status === 'fail')
		{
			NotificationManager.error('Có lỗi xẩy ra, xin vui lòng thử lại sau', 'Thông báo');
		}
	}


	return (
		<>
			<div className="bg-white">
				<div className="pt-6">
					<nav aria-label="Breadcrumb">
						<ol role="list" className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
							{breadcrumbs.map((breadcrumb) => (
								<li key={breadcrumb.id}>
									<div className="flex items-center">
										<a href={breadcrumb.hrefElm} className="mr-2 text-sm font-medium text-gray-900">
											{breadcrumb.name}
										</a>
										<svg
											width={16}
											height={20}
											viewBox="0 0 16 20"
											fill="currentColor"
											xmlns="http://www.w3.org/2000/svg"
											aria-hidden="true"
											className="w-4 h-5 text-gray-300"
										>
											<path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
										</svg>
									</div>
								</li>
							))}
							{ product && (
								<li className="text-sm">
									<a  aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
										{product.pro_name}
									</a>
								</li>
							)}
						</ol>
					</nav>


					<div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
						<div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
							<h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{product?.pro_name}</h1>
						</div>

						{/* Options */}
						<div className="mt-4 lg:mt-0 lg:row-span-3">
							<h2 className="sr-only">Product information</h2>
							<p className="text-3xl text-gray-900">{displayPrice(product?.pro_price)}</p>

							{/* Reviews */}
							<div className="mt-6">
								{/*<h3 className="sr-only">Reviews</h3>*/}
								<div className="flex items-center">
									{/*<div className="flex items-center">*/}
									{/*	{[0, 1, 2, 3, 4].map((rating) => (*/}
									{/*		<StarIcon*/}
									{/*			key={rating}*/}
									{/*			className={classNames(*/}
									{/*				reviews.average > rating ? 'text-gray-900' : 'text-gray-200',*/}
									{/*				'h-5 w-5 flex-shrink-0'*/}
									{/*			)}*/}
									{/*			aria-hidden="true"*/}
									{/*		/>*/}
									{/*	))}*/}
									{/*</div>*/}
									{/*<p className="sr-only">{reviews.average} out of 5 stars</p>*/}
									{/*<a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">*/}
									{/*	{reviews.totalCount} reviews*/}
									{/*</a>*/}
								</div>
							</div>

							<form className="mt-10">
								{/* Colors */}
								<div>
									<h3 className="text-sm text-gray-900 font-medium">Color</h3>

									{/*<RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">*/}
									{/*	<RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>*/}
									{/*	<div className="flex items-center space-x-3">*/}
									{/*		{product.colors.map((color) => (*/}
									{/*			<RadioGroup.Option*/}
									{/*				key={color.name}*/}
									{/*				value={color}*/}
									{/*				className={({ active, checked }) =>*/}
									{/*					classNames(*/}
									{/*						color.selectedClass,*/}
									{/*						active && checked ? 'ring ring-offset-1' : '',*/}
									{/*						!active && checked ? 'ring-2' : '',*/}
									{/*						'-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'*/}
									{/*					)*/}
									{/*				}*/}
									{/*			>*/}
									{/*				<RadioGroup.Label as="p" className="sr-only">*/}
									{/*					{color.name}*/}
									{/*				</RadioGroup.Label>*/}
									{/*				<span*/}
									{/*					aria-hidden="true"*/}
									{/*					className={classNames(*/}
									{/*						color.class,*/}
									{/*						'h-8 w-8 border border-black border-opacity-10 rounded-full'*/}
									{/*					)}*/}
									{/*				/>*/}
									{/*			</RadioGroup.Option>*/}
									{/*		))}*/}
									{/*	</div>*/}
									{/*</RadioGroup>*/}
								</div>

								{/* Sizes */}
								<div className="mt-10">
									<div className="flex items-center justify-between">
										<h3 className="text-sm text-gray-900 font-medium">Size</h3>
										<a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
											Size guide
										</a>
									</div>

									{/*<RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">*/}
									{/*	<RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>*/}
									{/*	<div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">*/}
									{/*		{product.sizes.map((size) => (*/}
									{/*			<RadioGroup.Option*/}
									{/*				key={size.name}*/}
									{/*				value={size}*/}
									{/*				disabled={!size.inStock}*/}
									{/*				className={({ active }) =>*/}
									{/*					classNames(*/}
									{/*						size.inStock*/}
									{/*							? 'bg-white shadow-sm text-gray-900 cursor-pointer'*/}
									{/*							: 'bg-gray-50 text-gray-200 cursor-not-allowed',*/}
									{/*						active ? 'ring-2 ring-indigo-500' : '',*/}
									{/*						'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'*/}
									{/*					)*/}
									{/*				}*/}
									{/*			>*/}
									{/*				{({ active, checked }) => (*/}
									{/*					<>*/}
									{/*						<RadioGroup.Label as="p">{size.name}</RadioGroup.Label>*/}
									{/*						{size.inStock ? (*/}
									{/*							<div*/}
									{/*								className={classNames(*/}
									{/*									active ? 'border' : 'border-2',*/}
									{/*									checked ? 'border-indigo-500' : 'border-transparent',*/}
									{/*									'absolute -inset-px rounded-md pointer-events-none'*/}
									{/*								)}*/}
									{/*								aria-hidden="true"*/}
									{/*							/>*/}
									{/*						) : (*/}
									{/*							<div*/}
									{/*								aria-hidden="true"*/}
									{/*								className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none"*/}
									{/*							>*/}
									{/*								<svg*/}
									{/*									className="absolute inset-0 w-full h-full text-gray-200 stroke-2"*/}
									{/*									viewBox="0 0 100 100"*/}
									{/*									preserveAspectRatio="none"*/}
									{/*									stroke="currentColor"*/}
									{/*								>*/}
									{/*									<line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />*/}
									{/*								</svg>*/}
									{/*							</div>*/}
									{/*						)}*/}
									{/*					</>*/}
									{/*				)}*/}
									{/*			</RadioGroup.Option>*/}
									{/*		))}*/}
									{/*	</div>*/}
									{/*</RadioGroup>*/}
								</div>
								<span>{count}</span>
								<button
									onClick={addCart}
									className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									Đặt mua
								</button>
							</form>
						</div>

						<div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
							{/* Description and details */}
							<div>
								<h3 className="sr-only">Description</h3>

								<div className="space-y-6">
									<p className="text-base text-gray-900">{product?.pro_description}</p>
								</div>
							</div>

							<div className="mt-10">
								<h3 className="text-sm font-medium text-gray-900">Highlights</h3>

								{/*<div className="mt-4">*/}
								{/*	<ul role="list" className="pl-4 list-disc text-sm space-y-2">*/}
								{/*		{product.highlights.map((highlight) => (*/}
								{/*			<li key={highlight} className="text-gray-400">*/}
								{/*				<span className="text-gray-600">{highlight}</span>*/}
								{/*			</li>*/}
								{/*		))}*/}
								{/*	</ul>*/}
								{/*</div>*/}
							</div>

							<div className="mt-10">
								<h2 className="text-sm font-medium text-gray-900">Nội dung sản phẩm</h2>

								<div className="mt-4 space-y-6">
									<div dangerouslySetInnerHTML={{__html: product?.pro_content}} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Transition.Root show={open} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={setOpen}>
					<Transition.Child
						as={Fragment}
						enter="ease-in-out duration-500"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in-out duration-500"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-hidden">
						<div className="absolute inset-0 overflow-hidden">
							<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
								<Transition.Child
									as={Fragment}
									enter="transform transition ease-in-out duration-500 sm:duration-700"
									enterFrom="translate-x-full"
									enterTo="translate-x-0"
									leave="transform transition ease-in-out duration-500 sm:duration-700"
									leaveFrom="translate-x-0"
									leaveTo="translate-x-full"
								>
									<Dialog.Panel className="pointer-events-auto w-screen max-w-md">
										<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
											<div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
												<div className="flex items-start justify-between">
													<Dialog.Title className="text-lg font-medium text-gray-900"> Giỏ hàng </Dialog.Title>
													<div className="ml-3 flex h-7 items-center">
														<button
															type="button"
															className="-m-2 p-2 text-gray-400 hover:text-gray-500"
															onClick={() => setOpen(false)}
														>
															<span className="sr-only">Close panel</span>
															<XIcon className="h-6 w-6" aria-hidden="true" />
														</button>
													</div>
												</div>

												<div className="mt-8">
													<div className="flow-root">
														<ul role="list" className="-my-6 divide-y divide-gray-200">
															<li key={product?.id} className="flex py-6">
																<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
																	<img
																		src={product?.pro_avatar}
																		alt={product?.pro_name}
																		className="h-full w-full object-cover object-center"
																	/>
																</div>

																<div className="ml-4 flex flex-1 flex-col">
																	<div>
																		<div className="flex justify-between text-base font-medium text-gray-900">
																			<h3>
																				<a href={product?.href}> {product?.pro_name} </a>
																			</h3>
																			<p className="ml-4">{product?.price}</p>
																		</div>
																	</div>
																	<div className="flex flex-1 items-end justify-between text-sm">
																		<p className="text-gray-500">Qty 1</p>

																		<div className="flex">
																			<button
																				type="button"
																				className="font-medium text-indigo-600 hover:text-indigo-500"
																			>
																				Remove
																			</button>
																		</div>
																	</div>
																</div>
															</li>
														</ul>
													</div>
												</div>
											</div>

											<div className="border-t border-gray-200 py-6 px-4 sm:px-6">
												<div className="flex justify-between text-base font-medium text-gray-900">
													<p>Subtotal</p>
													<p>$262.00</p>
												</div>
												<p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
												<div className="mt-6">
													<a onClick={payCart}
														href="#"
														className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
													>
														Xác nhận thanh toán
													</a>
												</div>
												{/*<div className="mt-6 flex justify-center text-center text-sm text-gray-500">*/}
												{/*	<p>*/}
												{/*		or{' '}*/}
												{/*		<button*/}
												{/*			type="button"*/}
												{/*			className="font-medium text-indigo-600 hover:text-indigo-500"*/}
												{/*			onClick={() => setOpen(false)}*/}
												{/*		>*/}
												{/*			Continue Shopping<span aria-hidden="true"> &rarr;</span>*/}
												{/*		</button>*/}
												{/*	</p>*/}
												{/*</div>*/}
											</div>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
			<NotificationContainer/>
		</>
	)
}

export default ProductDetailPage;
