import React from 'react';
import { useField } from 'formik';
import cn from 'classnames';

import styles from './FormikCheckbox.module.scss';

const FormikCheckbox = props => {
	const {
		className = 'formfield__checkbox',
		required = false,
		id,
		...config
	} = props;
	const [field] = useField({ ...config, type: 'checkbox' });

	return (
		<div className={cn(styles.form__agree, 'formfield')}>
			<input
				className={className}
				autoComplete={'off'}
				type='checkbox'
				{...field}
				id={id}
			/>
			<label htmlFor={id} className='formfield__checkbox-label'>
				{props.children}
			</label>
		</div>
	);
};

export default FormikCheckbox;
