import { createSlice } from '@reduxjs/toolkit';

import { fetchTopSlider as loadTopSliderApi } from '../api';

const initialState = {
	main: [],
	isLoading: false,
	isLoaded: false,
	error: null
};

export const slice = createSlice({
	name: 'slider',
	initialState,
	reducers: {
		getDataStart: state => {
			state.isLoading = true;
			state.isLoaded = false;
		},
		getDataSuccess: (state, { payload }) => {
			state.main = payload;
			state.isLoading = false;
			state.isLoaded = true;
		},
		getDataFailure: (state, { payload }) => {
			state.error = payload.error;
			state.isLoading = false;
		}
	}
});

const { getDataStart, getDataSuccess, getDataFailure } = slice.actions;

export const loadSlider = () => async dispatch => {
	dispatch(getDataStart());
	try {
		const data = await loadTopSliderApi();
		dispatch(getDataSuccess(data));
	} catch (err) {
		dispatch(getDataFailure({ error: err.toString() }));
	}
};

export const selectSlider = state => state.slider;
export default slice.reducer;
