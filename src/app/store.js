import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import userReduce from './counter/counterSlice';
export default configureStore({
	reducer: {
		counter: counterReducer,
		user: userReduce
	},
})
