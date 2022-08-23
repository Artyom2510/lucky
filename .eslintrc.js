module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended'
	],
	parserOptions: {
		ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
		ecmaFeatures: {
			jsx: true // Allows for the parsing of JSX
		}
	},
	rules: {
		'eqeqeq': 'warn',
		'react/prop-types': 'off',
		'no-unused-vars': 0,
		'no-mixed-spaces-and-tabs': 0
	},
	settings: {
		react: {
			version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
		}
	},
	env: {
		browser: true
	}
};
