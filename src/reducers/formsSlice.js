import { createSlice } from '@reduxjs/toolkit';

import {
	sendFormCallback as sendFormCallbackApi,
	sendFormViewing as sendFormViewingApi,
	sendFormNewInfo as sendFormNewInfoApi
} from '../api';

const initialState = {
	form: {
		isLoading: false,
		isLoaded: false,
		error: null
	}
};

export const slice = createSlice({
	name: 'forms',
	initialState,
	reducers: {
		sendDataStart: state => {
			state.form.isLoading = true;
			state.form.isLoaded = false;
		},
		sendDataSuccess: state => {
			state.form.isLoading = false;
			state.form.isLoaded = true;
		},
		sendDataFailure: (state, { payload }) => {
			state.form.error = payload;
			state.form.isLoading = false;
			state.form.isLoaded = true;
		}
	}
});
const { sendDataStart, sendDataSuccess, sendDataFailure } = slice.actions;

export const sendFormCallback = (values, cb) => async dispatch => {
	dispatch(sendDataStart());
	try {
		const data = await sendFormCallbackApi(values);
		if (data.status === 201) {
			dispatch(sendDataSuccess());
			cb && cb();
		} else {
			dispatch(sendDataFailure({ error: 'ошибка сервера' }));
		}
	} catch (err) {
		dispatch(sendDataFailure({ error: err.toString() }));
	}
};

export const sendFormViewing = (values, cb) => async dispatch => {
	dispatch(sendDataStart());
	try {
		const data = await sendFormViewingApi(values);
		if (data.status === 201) {
			dispatch(sendDataSuccess());
			cb && cb();
		} else {
			dispatch(sendDataFailure({ error: 'ошибка сервера' }));
		}
	} catch (err) {
		dispatch(sendDataFailure({ error: err.toString() }));
	}
};

export const sendFormNewInfo = (values, cb) => async dispatch => {
	dispatch(sendDataStart());
	try {
		const data = await sendFormNewInfoApi(values);
		if (data.status === 201) {
			dispatch(sendDataSuccess());
			cb && cb();
		} else {
			dispatch(sendDataFailure({ error: 'ошибка сервера' }));
		}
	} catch (err) {
		dispatch(sendDataFailure({ error: err.toString() }));
	}
};

export const selectForm = state => state.forms.form;

export default slice.reducer;
