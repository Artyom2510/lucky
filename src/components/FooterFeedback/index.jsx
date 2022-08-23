import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { sendFormCallback, selectForm } from '../../reducers/formsSlice';
import { selectData } from '../../reducers/dataSlice';
import FormikMaskedField from '../FormikMaskedField';
import FormikField from '../FormikField';

import styles from './FooterFeedback.module.scss';

const FooterFeedback = ({ onSuccess = () => null }) => {
	const dispatch = useDispatch();
	const formCallback = useSelector(selectForm);
	const data = useSelector(selectData);
	const { isLoading } = formCallback;
	const [captchaError, setCaptchaError] = useState('');
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
			.required()
	});

	const initialState = {
		name: '',
		phone: ''
	};

	const handleSubmit = async ({ name, phone }, resetForm) => {
		setCaptchaError('');
		const token = await executeRecaptcha();
		if (!token) {
			setCaptchaError('error ReCaptcha');
		} else {
			dispatch(
				sendFormCallback({ name, phone }, () => {
					resetForm();
					onSuccess();
				})
			);
		}
	};

	return (
		<Formik
			initialValues={initialState}
			validationSchema={schema}
			onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
		>
			{({ dirty, errors }) => (
				<Form className={styles.footerFeedback}>
					<div className={styles.footerFeedback__formfields}>
						<FormikField
							parentClassName='formfield_footer'
							name='name'
							placeholder='Ваше имя'
						/>
						<FormikMaskedField
							parentClassName='formfield_footer'
							name='phone'
							className='formfield__input formfield__input_phone'
						/>
					</div>
					<p className={styles.footerFeedback__desc}>
						Нажимая кнопку отправить вы соглашаетесь на обработку{' '}
						<a
							href={data.settings.privacy_policy}
							target='_blank'
							rel='noreferrer'
						>
							персональных данных
						</a>
					</p>
					<button
						type='submit'
						disabled={!!Object.keys(errors).length || !dirty || isLoading}
						className={cn(styles.footerFeedback__submit, {
							[styles.footerFeedback__submit_disabled]:
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

export default FooterFeedback;
