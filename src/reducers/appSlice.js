import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	width: 0,
	height: 0,
	notIphone: true,
	tablet: false
};

export const slice = createSlice({
	name: 'device',
	initialState,
	reducers: {
		setDeviceWindowProps: (state, { payload }) => {
			state.width = payload.width;
			state.height = payload.height;
			state.notIphone = payload.notIphone;
			state.tablet = payload.isTablet;
		}
	}
});

export const { setDeviceWindowProps } = slice.actions;

export const selectDeviceWidth = state => state.device.width;
export const selectDeviceHeight = state => state.device.height;
export const selectDevice = state => state.device.notIphone;
export const selectTablet = state => state.device.tablet;

export const selectIsDesctop = state => state.device.width > 1279;
export const selectIsTablet = state =>
	state.device.width > 743 && state.device.width < 1024;
export const selectIsTabletPro = state =>
	state.device.width > 1023 && state.device.width < 1280;
export const selectIsTabletMobile = state => state.device.width < 1024;
export const selectIsTabletProMobile = state => state.device.width < 1280;
export const selectIsMobile = state => state.device.width < 744;

export default slice.reducer;
