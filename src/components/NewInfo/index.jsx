import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { sendFormNewInfo, selectForm } from '../../reducers/formsSlice';
import { selectData } from '../../reducers/dataSlice';
import FormikField from '../FormikField';
import FormikCheckbox from '../FormikCheckbox';

const re = new RegExp(
	/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
);

const NewInfo = ({ onSuccess = {}, id = null }) => {
	const dispatch = useDispatch();
	const form = useSelector(selectForm);
	const { isLoading } = form;
	const data = useSelector(selectData);
	const [captchaError, setCaptchaError] = useState('');
	const { executeRecaptcha } = useGoogleReCaptcha();

	const schema = yup.object().shape({
		email: yup
			.string()
			.email('Некорректный адрес')
			.test('value', 'Некорректный адрес', value => {
				if (!value || !re.test(value)) {
					return false;
				} else {
					return true;
				}
			})
			.required('Пожалуйста, укажите почту'),
		agree: yup.boolean().oneOf([true])
	});

	const initialState = {
		email: '',
		agree: true
	};

	const handleSubmit = async email => {
		setCaptchaError('');
		const token = await executeRecaptcha();
		if (!token) {
			setCaptchaError('error ReCaptcha');
		} else {
			dispatch(
				sendFormNewInfo({ email, id }, () => {
					onSuccess();
				})
			);
		}
	};

	return (
		<Formik
			initialValues={initialState}
			validationSchema={schema}
			onSubmit={({ email }) => handleSubmit(email)}
		>
			{({ dirty, errors }) => (
				<Form className='form'>
					<p className='form__title'>Отправить информацию</p>
					<div className='form__formfields'>
						<FormikField name='email' type='text' placeholder='E-mail' />
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

export default NewInfo;
