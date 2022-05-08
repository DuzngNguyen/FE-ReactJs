import {useEffect, useState} from 'react';
import "tailwindcss/base.css";
import "tailwindcss/components.css";
import "tailwindcss/utilities.css";
import {createContact} from '../../api/contact/ContactServiceApi';
// import { useHistory } from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';

export default function ContactPage() {

	const initialFormData = Object.freeze({
		name: "",
		email: "",
		phone: "",
		contact: ""
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log('------------------- initialFormData; ', formData);

		const results = await createContact(formData)
		console.log('=================== results: ', results);
		if (results && results.status === 'success')
		{
			NotificationManager.success('Dữ liệu đã được xử lý, Admin sẽ liên hệ với bạn', 'Thông báo');
			console.log('====================: ', results.data);
		}

		if (results && results.status === 'error' || results.status === 'fail')
		{
			NotificationManager.error('Có lỗi xẩy ra, xin vui lòng thử lại sau', 'Thông báo');
		}
	}

	const handleChange = (e) => {
		updateFormData({
			...formData,

			[e.target.name]: e.target.value.trim()
		});

		console.log('--------- e.target.value.trim(): ', e.target.value.trim());
	};

	return (
		<>
			<div className="bg-white ">
				<div className="max-w-2xl mx-auto grid items-center grid-cols-1 gap-y-16 gap-x-10 sm:px-6 lg:max-w-7xl lg:px-12 lg:grid-cols-2">
					<div className="md:grid">
						<div className="mt-2 md:mt-10 md:col-span-2">
							<div className="px-4 sm:px-0">
								<h3 className="text-lg font-medium leading-6 text-gray-900">Để lại thông tin liên hệ</h3>
							</div>
							<form method="POST" className="mt-2" onSubmit={handleSubmit}>
								<div className="mb-6">
									<label htmlFor="name"
										   className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Họ Tên</label>
									<input type="text" id="name" name="name" onChange={handleChange}
										   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										   placeholder="Đồ án "
										   required />
								</div>

								<div className="mb-6">
									<label htmlFor="email"
										   className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
									<input type="email" id="email" name="email" onChange={handleChange}
										   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										   placeholder="name@flowbite.com"
										   required />
								</div>
								<div className="mb-6">
									<label htmlFor="phone"
										   className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Số điện thoại</label>
									<input type="number" id="phone" name="phone" onChange={handleChange}
										   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										   placeholder="0987565333"
										   required />
								</div>
								<div className="mb-6">
									<label htmlFor="phone"
										   className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nội dung</label>
									<textarea id="contact" rows="4" onChange={handleChange}
									className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Leave a comment..." name="contact"/>
								</div>

								<button type="submit" onClick={handleSubmit}
										className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
									Gủi thông tin
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
			<NotificationContainer/>
		</>
	)
}
