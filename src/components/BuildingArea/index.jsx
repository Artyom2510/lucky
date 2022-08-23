import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import CountUp from 'react-countup';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

import { selectIsDesctop, selectDeviceHeight } from '../../reducers/appSlice';
import { selectData } from '../../reducers/dataSlice';
import { IMG_URL } from '../../constants';

import cloudImg from '../../assets/img/decor/cloud.png';
import cloudImg2 from '../../assets/img/decor/cloud2.png';
import styles from './BuildingArea.module.scss';

const BuildingArea = ({ scrollTop }) => {
	const data = useSelector(selectData);
	const isDesctop = useSelector(selectIsDesctop);
	const wHeight = useSelector(selectDeviceHeight);
	const { building_area } = data;
	const [animate, setAnimate] = useState(false);
	const ref = useRef(null);
	const num = +building_area.subtitle.replace(/\s+/g, '').replace(/,/g, '.');
	const num2 = +building_area.sub_description_one
		.replace(/\s+/g, '')
		.replace(/,/g, '.');

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
		<>
			{Object.keys(building_area).length !== 0 && (
				<section
					className={cn('sect', styles.plot, {
						sect_animate: animate
					})}
					ref={ref}
				>
					<div className={cn(styles.plot__title, styles.plotTitle)}>
						<p className={cn(styles.plotTitle__square)}>
							{animate && !isNaN(num) && (
								<CountUp
									start={0}
									end={num}
									useEasing={true}
									duration={0.3}
									separator=' '
									delay={0}
								/>
							)}
							<span className='h2'>
								m<sup>2</sup>
							</span>
						</p>
						<div className={cn(styles.plotTitle__text, 'title')}>
							<div className='sect__title-wrap'>
								<h2>Площадь</h2>
							</div>
							<div className='sect__title-wrap'>
								<h2>участка</h2>
							</div>
						</div>
					</div>
					<div className={cn(styles.plot__wrap, styles.plotWraper)}>
						<div className={cn(styles.plot__wrap, styles.plotWrap)}>
							<LazyLoadComponent threshold={wHeight / 2}>
								<picture className={styles.plotWrap__img}>
									<source
										type='image/webp'
										srcSet={`${building_area.WEBP_X1} 1x, ${building_area.WEBP_X2} 2x, ${building_area.WEBP_X3} 3x`}
									/>
									<img
										src={building_area.X1}
										srcSet={`${building_area.X2} 2x, ${building_area.X3} 3x`}
										alt=''
									/>
								</picture>
							</LazyLoadComponent>
							<div className={cn(styles.plotWrap__desc, styles.plotDesc)}>
								<div
									className={styles.plotDesc__content}
									dangerouslySetInnerHTML={{
										__html: building_area.description_one
									}}
								></div>
								<p className={styles.plotDesc__text}>
									{animate && !isNaN(num) && (
										<CountUp
											start={0}
											end={num2}
											useEasing={true}
											duration={0.3}
											decimal=','
											separator=' '
											decimals={1}
											delay={0}
											className='h2'
										/>
									)}
									<span className={styles.m}>
										m<sup>2</sup>
									</span>
								</p>
							</div>
							<LazyLoadComponent threshold={wHeight / 2}>
								<img src={cloudImg} alt='' className={styles.plotWrap__decor} />
								<img
									src={cloudImg2}
									alt=''
									className={cn(
										styles.plotWrap__decor,
										styles.plotWrap__decor_2
									)}
								/>
							</LazyLoadComponent>
						</div>
						<div
							className={cn(styles.plotWraper__desc)}
							dangerouslySetInnerHTML={{
								__html: building_area.description_two
							}}
						></div>
						<div className={styles.plotWraper__circle}></div>
						<div className={styles.plotWraper__grad}></div>
						<div className={styles.plotWraper__bg}></div>
						{isDesctop && (
							<img
								src={`${IMG_URL}/icons/frame-green.svg`}
								alt=''
								className={styles.plotWraper__decor}
							/>
						)}
					</div>
					<img
						src={`${IMG_URL}/icons/union.svg`}
						alt=''
						className={styles.plot__decor}
					/>
				</section>
			)}
		</>
	);
};

export default BuildingArea;
