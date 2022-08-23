import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { selectDeviceHeight } from '../../reducers/appSlice';
import { selectData } from '../../reducers/dataSlice';
import { IMG_URL } from '../../constants';
import IntroCard from '../IntroCard';

import styles from './Intro.module.scss';

const Intro = ({ scrollTop }) => {
	const root = document.querySelector('.root');
	const data = useSelector(selectData);
	const wHeight = useSelector(selectDeviceHeight);
	const [animate, setAnimate] = useState(false);

	const { sub_blocks } = data;
	const ref = useRef(null);

	useEffect(() => {
		if (ref.current !== null) {
			if (!animate && scrollTop >= wHeight / 2) {
				setAnimate(true);
			}

			const bg = root.style.getPropertyValue('background-color');
			if (
				`${bg}` !== 'rgb(255, 255, 255)' &&
				(scrollTop > ref.current.clientHeight || scrollTop < wHeight)
			) {
				root.style.setProperty('background-color', 'rgb(255, 255, 255)');
			}
		}
	}, [animate, scrollTop, wHeight]);

	return (
		<>
			{sub_blocks.length > 0 && (
				<section
					className={cn('sect', styles.intro, {
						sect_animate: animate
					})}
					ref={ref}
				>
					<div className={cn(styles.intro__title, 'title')}>
						<div className='sect__title-wrap'>
							<h1>Клубный пригород</h1>
						</div>
						<div className='sect__title-wrap'>
							<h1>с&nbsp;заботливым</h1>
						</div>
						<div className='sect__title-wrap'>
							<h1>сервисом</h1>
						</div>
					</div>
					<div className={cn(styles.intro__cards, styles.introCards)}>
						{sub_blocks.map((el, i) => {
							return (
								<IntroCard
									key={`intro${el.order}`}
									st={scrollTop}
									{...el}
									i={i}
									className={styles.introCards__card}
								/>
							);
						})}
					</div>
					<img
						className={cn(styles.intro__decor, styles.intro__decor_1)}
						src={`${IMG_URL}/icons/rect2.svg`}
						alt=''
					/>
					<img
						className={cn(styles.intro__decor, styles.intro__decor_2)}
						src={`${IMG_URL}/icons/ellipse.svg`}
						alt=''
					/>
				</section>
			)}
		</>
	);
};

export default Intro;
