import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import { SITE_KEY } from './constants';
import store from './reducers';
import App from './App';

import './assets/style/index.scss';

ReactDOM.render(
	<React.StrictMode>
		<GoogleReCaptchaProvider reCaptchaKey={SITE_KEY} language='ru'>
			<Provider store={store}>
				<App />
			</Provider>
		</GoogleReCaptchaProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
