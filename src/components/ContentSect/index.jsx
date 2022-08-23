import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { selectDeviceHeight, selectIsDesctop } from '../../reducers/appSlice';
import { selectData } from '../../reducers/dataSlice';
import { IMG_URL } from '../../constants';

import styles from './ContentSect.module.scss';

const ContentSect = ({ scrollTop }) => {
	const data = useSelector(selectData);
	const { slogan } = data;
	const wHeight = useSelector(selectDeviceHeight);
	const isDesctop = useSelector(selectIsDesctop);
	const [animate, setAnimate] = useState(false);
	const ref = useRef(null);

	useEffect(() => {
		if (
			!animate &&
			ref.current !== null &&
			wHeight !== 0 &&
			scrollTop >= ref.current.offsetTop - wHeight / 2
		) {
			setAnimate(true);
		}
	}, [animate, scrollTop, wHeight]);

	return (
		<section
			className={cn('sect', styles.contentSect, {
				sect_animate: animate
			})}
			ref={ref}
		>
			<div className={cn('sect__title-wrap title', styles.contentSect__title)}>
				<h3>{slogan.text}</h3>
			</div>
			<img
				src={`${IMG_URL}/icons/frame-red.svg`}
				alt=''
				className={cn(styles.contentSect__decor, styles.contentSect__decor_1)}
			/>
			{isDesctop && (
				<img
					src={`${IMG_URL}/icons/frame-red2.svg`}
					alt=''
					className={cn(styles.contentSect__decor, styles.contentSect__decor_2)}
				/>
			)}
			<img
				src={`${IMG_URL}/icons/union3.svg`}
				alt=''
				className={cn(styles.contentSect__decor, styles.contentSect__decor_3)}
			/>
		</section>
	);
};

export default ContentSect;
