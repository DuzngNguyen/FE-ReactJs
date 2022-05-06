import Skeleton from 'react-loading-skeleton';
import {Link} from 'react-router-dom';
import {useEffect} from 'react';

export default function CategoryHot({listCategories}) {

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

	},[listCategories])

	return (
		<div className="bg-white">
			<div className="max-w-2xl mx-auto py-4 sm:py-4 sm:px-4 lg:max-w-7xl lg:px-8" style={
				{
					marginTop: "20px"
				}
			}>
				<h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Danh mục nổi bật</h2>
				<div className="categories-home" style={
					{
						marginTop: "20px"
					}
				}>
					<div className="lists" >
						{ listCategories && listCategories.categories.map((item, index) => (
							<div className="item item-2" key={index}>
								<div className="box">
									{/*<Link to="/" className="avatar">*/}
									<Link to={'/danh-muc/' + item.slug + '-' + item.id} className="avatar">
										<img src="https://salt.tikicdn.com/ts/category/47/0d/1a/09e7eca04da86b1ece2461fdcac3d847.jpg" alt="" />
									</Link>
									<h3 className="item-title">
										<a href="">{item.name}</a>
									</h3>
								</div>
							</div>
						))}

						{!listCategories && countLoading.map((item, index) => (
							<div className="item item-2" key={index}>
								<div className="box">
									<Skeleton count={1} height={100} style={{
										marginBottom: '20px'
									}} />
									<Skeleton count={1} height={30} style={{
										marginBottom: '20px'
									}} />
								</div>
							</div>
						))}

					</div>
				</div>
			</div>
		</div>
	)
}
