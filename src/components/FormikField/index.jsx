import React from 'react';
import { useField } from 'formik';
import cn from 'classnames';

import styles from './FormikField.module.scss';

const FormikField = props => {
	const {
		parentClassName = '',
		className = 'formfield__input',
		placeholder = '',
		type = 'text',
		required = false,
		...config
	} = props;
	const [field, meta] = useField(config);

	return (
		<label
			className={cn(styles.form__formfield, parentClassName, 'formfield', {
				formfield_error: meta.touched && !!meta.error
			})}
		>
			<input
				type={type}
				className={className}
				placeholder={placeholder}
				autoComplete={'off'}
				{...field}
			/>
			{meta.touched && !!meta.error && (
				<span className='formfield__error'>{meta.error}</span>
			)}
		</label>
	);
};

export default FormikField;
