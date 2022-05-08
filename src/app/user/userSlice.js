import { createSlice } from '@reduxjs/toolkit'
import {getToken, getUser} from '../../functions/common-func';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		token: getToken(),
		userLogin: getUser()
	},
	reducers: {
		setToken: (state, data) => {
			state.token = state.data;
		},
		setUser: (state, data) => {
			state.userLogin = state.data;
		},
		// incrementByAmount: (state, action) => {
		// 	state.value += action.payload
		// },
	},
})

export const { setToken, setUser } = userSlice.actions
export default userSlice.reducer
