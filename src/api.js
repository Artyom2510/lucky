import axios from 'axios';

const _apiBase = process.env.REACT_APP_API_URL;
const _apiBaseForm = process.env.REACT_APP_API_URL_FORM;

export const fetchTopSlider = async () => {
	const res = await axios(`${_apiBase}blocks/main`);
	return res.data;
};

export const loadData = async () => {
	const res = await axios(`${_apiBase}landing/all`);
	return res.data;
};

export const getFreeHouses = async () => {
	const res = await axios(`${_apiBase}building/list?status=false`);
	return res.data;
};

export const sendFormCallback = async data => {
	return await axios
		.post(
			`${_apiBaseForm}new-callback`,
			`name=${data.name}&phone=${data.phone}`
		)
		.then(res => {
			return res;
		});
};

export const sendFormViewing = async data => {
	return await axios
		.post(
			`${_apiBaseForm}new-viewing`,
			`name=${data.name}&phone=${data.phone}&building_id=${data.id}`
		)
		.then(res => {
			return res;
		});
};

export const sendFormNewInfo = async data => {
	return await axios
		.post(
			`${_apiBaseForm}new-info`,
			`email=${data.email}&building_id=${data.id}`
		)
		.then(res => {
			return res;
		});
};
