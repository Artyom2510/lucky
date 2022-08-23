import { createSlice } from '@reduxjs/toolkit';

import { loadData as loadDataApi } from '../api';

const initialState = {
	sub_blocks: [],
	building_area: {},
	slides: [],
	services: [],
	banks: [],
	buildings: [],
	settings: {},
	how_to_buy: {},
	slogan: {},
	description: '',
	isLoading: false,
	isLoaded: false,
	error: null
};

export const slice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		getDataStart: state => {
			state.isLoading = true;
		},
		getDataSuccess: (state, { payload }) => {
			state.sub_blocks = payload.sub_blocks;
			state.building_area = payload.building_area;
			state.slides = payload.slides;
			state.services = payload.services;
			state.banks = payload.banks;
			state.buildings = payload.buildings;
			state.settings = payload.settings;
			state.how_to_buy = payload.how_to_buy;
			state.slogan = payload.slogan;
			state.description = payload.description;
			state.isLoading = false;
			state.isLoaded = true;
		},
		getDataFailure: (state, { payload }) => {
			state.error = payload;
			state.isLoading = false;
		}
	}
});

const { getDataStart, getDataSuccess, getDataFailure } = slice.actions;

export const loadData = () => async dispatch => {
	dispatch(getDataStart());
	try {
		const data = await loadDataApi();
		dispatch(getDataSuccess(data));
	} catch (err) {
		dispatch(getDataFailure({ error: err.toString() }));
	}
};

export const selectData = state => state.data;

export default slice.reducer;
