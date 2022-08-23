import React from 'react';
import { useField } from 'formik';
import InputMask from 'react-input-mask';
import cn from 'classnames';

const FormikMaskedField = props => {
	const {
		className = 'formfield__input formfield__input_phone',
		parentClassName = '',
		label = '',
		placeholder = '',
		type = 'text',
		required = false,
		...config
	} = props;
	const [field, meta] = useField(config);

	return (
		<label
			className={cn('formfield', parentClassName, {
				formfield_error: meta.touched && !!meta.error
			})}
		>
			<InputMask
				mask='+7 (N99) 999 99 99'
				maskChar='-'
				formatChars={{ N: '[01234569]', 9: '[0-9]' }}
				alwaysShowMask
				{...field}
			>
				{p => (
					<input
						type={type}
						className={className}
						placeholder={placeholder}
						autoComplete={'off'}
						{...p}
					/>
				)}
			</InputMask>
			{meta.touched && !!meta.error && (
				<span className='formfield__error'>{meta.error}</span>
			)}
		</label>
	);
};

export default FormikMaskedField;
