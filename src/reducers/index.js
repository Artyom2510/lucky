import { configureStore } from '@reduxjs/toolkit';

import sliderReducer from './topSliderSlice';
import dataReducer from './dataSlice';
import appReducer from './appSlice';
import buildingsReducer from './buildingsSlice';
import formsReducer from './formsSlice';

export default configureStore({
	reducer: {
		slider: sliderReducer,
		data: dataReducer,
		device: appReducer,
		buildings: buildingsReducer,
		forms: formsReducer
	}
});
