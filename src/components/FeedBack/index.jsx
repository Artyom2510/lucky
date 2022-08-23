import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import {
	sendFormCallback,
	selectForm,
	sendFormViewing
} from '../../reducers/formsSlice';
import { selectData } from '../../reducers/dataSlice';
import FormikMaskedField from '../FormikMaskedField';
import FormikField from '../FormikField';
import FormikCheckbox from '../FormikCheckbox';

const FeedBack = ({ onSuccess = {}, title = '', id = null }) => {
	const dispatch = useDispatch();
	const form = useSelector(selectForm);
	const { isLoading } = form;
	const [captchaError, setCaptchaError] = useState('');
	const data = useSelector(selectData);
	const { executeRecaptcha } = useGoogleReCaptcha();

	const schema = yup.object().shape({
		name: yup.string().required('Пожалуйста, укажите имя'),
		phone: yup
			.string()
			.test('value', 'Пожалуйста, введите номер', value => {
				if (!value || value.indexOf('-') !== -1) {
					return false;
				} else {
					return true;
				}
			})
			.required(),
		agree: yup.boolean().oneOf([true])
	});

	const initialState = {
		name: '',
		phone: '',
		agree: true
	};

	const handleSubmit = async ({ name, phone }) => {
		setCaptchaError('');
		const token = await executeRecaptcha();
		if (!token) {
			setCaptchaError('error ReCaptcha');
		} else {
			if (id) {
				dispatch(
					sendFormViewing({ name, phone, id }, () => {
						onSuccess();
					})
				);
			} else {
				dispatch(
					sendFormCallback({ name, phone }, () => {
						onSuccess();
					})
				);
			}
		}
	};

	return (
		<Formik
			initialValues={initialState}
			validationSchema={schema}
			onSubmit={handleSubmit}
		>
			{({ dirty, errors }) => (
				<Form className='form'>
					<p className='form__title'>{title}</p>
					<div className='form__formfields'>
						<FormikField name='name' placeholder='Ваше имя' />
						<FormikMaskedField
							name='phone'
							className='formfield__input formfield__input_phone'
						/>
					</div>
					<FormikCheckbox name='agree' id='agree-cb'>
						Я согласен на обработку моих{' '}
						<a
							href={data.settings.privacy_policy}
							target='_blank'
							rel='noreferrer'
						>
							персональных данных
						</a>
					</FormikCheckbox>
					<button
						type='submit'
						disabled={!!Object.keys(errors).length || !dirty || isLoading}
						className={cn('form__submit', 'btn btn_lg', {
							btn_disabled:
								!!Object.keys(errors).length ||
								!dirty ||
								isLoading ||
								!!captchaError
						})}
					>
						Отправить
					</button>
				</Form>
			)}
		</Formik>
	);
};

export default FeedBack;
