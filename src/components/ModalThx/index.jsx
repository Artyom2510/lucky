import React, { useEffect, useRef } from 'react';

import { IMG_URL } from '../../constants';

import styles from './ModalThx.module.scss';

const ModalThx = ({ hide = () => null, time = 5000 }) => {
	const timer = useRef(null);

	useEffect(() => {
		timer.current = setTimeout(() => {
			hide();
		}, time);

		return () => {
			clearTimeout(timer.current);
		};
	}, []);

	return (
		<div className={styles.popupThx}>
			<img
				src={`${IMG_URL}/icons/success.svg`}
				alt=''
				className={styles.popupThx__icon}
			/>
			<p className={styles.popupThx__desc}>Ваша заявка успешно отправлена</p>
			<p className={styles.popupThx__desc2}>
				В ближайшее время с вами свяжется наш менеджер
			</p>
		</div>
	);
};

export default ModalThx;
