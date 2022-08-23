import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

import { IMG_URL } from '../../constants';
import { selectDeviceHeight, selectIsDesctop } from '../../reducers/appSlice';

import styles from './IntroCard.module.scss';

const icons = ['icon.svg', 'icon2.svg', 'icon3.svg'];
const colors = ['#FAE9ED', '#F3EDF4', '#EDF8F4'];

const IntroCard = ({ st, className, X1, X2, X3, description, i }) => {
	const isDesctop = useSelector(selectIsDesctop);
	const wHeight = useSelector(selectDeviceHeight);
	const root = document.querySelector('.root');
	const ref = useRef(null);
	const [position, setPosition] = useState(0);

	useEffect(() => {
		if (ref.current !== null) {
			setPosition(ref.current.offsetTop);
		}
	}, [ref]);

	useEffect(() => {
		if (ref.current !== null && st >= position + wHeight / 1.5) {
			root.style.setProperty('background-color', colors[i]);
		}
	}, [st, ref]);

	return (
		<div ref={ref} className={cn(className, styles.introCard)}>
			<div
				className={cn(styles.introCard__imgWrap, {
					[styles.introCard__imgWrap_xs]: i === 2
				})}
			>
				<LazyLoadComponent threshold={wHeight / 2}>
					<img src={X1} srcSet={`${X2} 2x, ${X3} 3x`} alt='' />
				</LazyLoadComponent>
			</div>
			<div className={styles.introCard__content}>
				<img
					className={styles.introCard__icon}
					src={`${IMG_URL}/icons/${icons[i]}`}
					alt=''
				/>
				<p
					className={styles.introCard__desc}
					dangerouslySetInnerHTML={{
						__html: description
					}}
				></p>
			</div>
			{i === 0 && (
				<img
					src={`${IMG_URL}/icons/frame-red.svg`}
					alt=''
					className={cn(styles.introCard__decor, styles.introCard__decor_1)}
				/>
			)}
			{i === 1 && isDesctop && (
				<img
					src={`${IMG_URL}/icons/frame-white.svg`}
					alt=''
					className={cn(styles.introCard__decor, styles.introCard__decor_2)}
				/>
			)}
		</div>
	);
};

export default IntroCard;
