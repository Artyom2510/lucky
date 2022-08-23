import { createSlice } from '@reduxjs/toolkit';

import { getFreeHouses as loadBuildingsApi } from '../api';

const initialState = {
	buildings: [],
	buildingsFilteredByType: [],
	current: {
		id: null,
		type: null,
		square: null
	},
	hoveredId: null,
	selectedId: null,
	isLoading: false,
	isLoaded: false,
	allSold: false,
	error: null
};

export const slice = createSlice({
	name: 'buildings',
	initialState,
	reducers: {
		getDataStart: state => {
			state.isLoading = true;
			state.isLoaded = false;
		},
		getDataSuccess: (state, { payload }) => {
			if (payload.length > 0) {
				const { id, type, square } = payload[0];
				state.buildings = payload;
				state.selectedId = id;
				state.current.id = id;
				state.current.type = type;
				state.current.square = square;
				const arr = payload
					.filter(el => el.type === type)
					.sort((a, b) => a.square - b.square);
				state.buildingsFilteredByType = arr;
			} else {
				state.allSold = true;
			}
			state.isLoading = false;
			state.isLoaded = true;
			state.error = null;
		},
		getDataFailure: (state, { payload }) => {
			state.error = payload.error;
			state.isLoading = false;
		},
		setSelectedId: (state, { payload }) => {
			state.selectedId = payload;
			const { type, square } = state.buildings.find(el => el.id === payload);
			state.current.type = type;
			const arr = state.buildings
				.filter(el => el.type === type)
				.sort((a, b) => a.square - b.square);
			state.current.square = square;
			state.current.id = payload;
			state.buildingsFilteredByType = arr;
		},
		setHoveredId: (state, { payload }) => {
			state.hoveredId = payload;
		},
		setCurrentType: (state, { payload }) => {
			state.current.type = payload;
			const arr = state.buildings
				.filter(({ type }) => type === payload)
				.sort((a, b) => a.square - b.square);
			const { square, id } = arr[0];
			state.current.square = square;
			state.current.id = id;
			state.buildingsFilteredByType = arr;
			state.selectedId = null;
		},
		setCurrentSquare: (state, { payload }) => {
			state.current.square = payload;
			const current = state.buildingsFilteredByType.find(
				el => el.square === payload
			);
			state.current.id = current.id;
			state.selectedId = null;
		}
	}
});

const { getDataStart, getDataSuccess, getDataFailure } = slice.actions;

export const { setSelectedId, setHoveredId, setCurrentType, setCurrentSquare } =
	slice.actions;

export const loadBuildings = () => async dispatch => {
	dispatch(getDataStart());
	try {
		const data = await loadBuildingsApi();
		dispatch(getDataSuccess(data));
	} catch (err) {
		dispatch(getDataFailure({ error: err.toString() }));
	}
};

export const selectBuildings = state => state.buildings;
export const selectCurrent = state => state.buildings.current;
export const selectSelectedId = state => state.buildings.selectedId;
export const selectCurrentBuildings = state =>
	state.buildings.buildingsFilteredByType;

export const selectHoverBuilding = state => {
	const { hoveredId, buildings } = state.buildings;
	if (hoveredId !== null) {
		return buildings.find(el => el.id === hoveredId);
	} else return;
};

export default slice.reducer;
