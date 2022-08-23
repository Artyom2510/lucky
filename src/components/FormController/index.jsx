import { useState } from 'react';

const FormController = ({ children }) => {
	const [showForm, setShowForm] = useState(true);

	const setShowThx = () => {
		setShowForm(!showForm);
	};

	return children(showForm, setShowThx);
};

export default FormController;
