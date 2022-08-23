const checkSlash = url => {
	if (!!url && typeof url === 'string') {
		return url.substr(-1) !== '/' ? url + '/' : url;
	}
	return undefined;
};

const DOMAIN_URL = checkSlash(process.env.REACT_APP_DOMAIN_URL) || '/';
const FOLDER_URL = checkSlash(process.env.PUBLIC_URL) || '/';
const UPLOAD_IMG_URL = process.env.REACT_APP_UPLOAD_IMG_URL;
const IMG_URL = `${FOLDER_URL}img`;

const SITE_KEY = '6LduY54eAAAAAM_hcbE_1urQ1wQpML1_p9CEczpl';
const API_YMAP_KEY = '8fe127fb-acdc-477f-b723-346b6ba342b5&lang=ru_RU';

export {
	UPLOAD_IMG_URL,
	IMG_URL,
	FOLDER_URL,
	DOMAIN_URL,
	SITE_KEY,
	API_YMAP_KEY
};
