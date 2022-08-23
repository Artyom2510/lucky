import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { YMaps, Map, Placemark, ZoomControl } from 'react-yandex-maps';
import cn from 'classnames';

import { selectDeviceHeight, selectIsDesctop } from '../../reducers/appSlice';
import { selectData } from '../../reducers/dataSlice';
import { IMG_URL, API_YMAP_KEY } from '../../constants';

import mapImg from '../../assets/img/decor/map.png';
import mapImg2x from '../../assets/img/decor/map@2x.png';
import mapImg3x from '../../assets/img/decor/map@3x.png';

const mapState = {
	center: [44.656906, 34.390684],
	zoom: 16,
	controls: [],
	behaviors: ['drag', "disable('scrollZoom')"]
};

import styles from './Lucky.module.scss';

const Lucky = ({ scrollTop }) => {
	const data = useSelector(selectData);
	const isDesctop = useSelector(selectIsDesctop);
	const wHeight = useSelector(selectDeviceHeight);
	const { building_area } = data;
	const [animate, setAnimate] = useState(false);
	const [showMap, setShowMap] = useState(false);
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

	const handleChange = () => {
		setShowMap(!showMap);
	};

	return (
		<>
			{Object.keys(building_area).length !== 0 && (
				<section
					className={cn('sect', styles.lucky, {
						sect_animate: animate
					})}
					id='map'
					ref={ref}
				>
					<div className={cn(styles.lucky__title, 'title')}>
						<div className='sect__title-wrap'>
							<h2>Удачное место</h2>
						</div>
					</div>
					<div className={cn(styles.lucky__tabs, styles.tabs)}>
						<div className={cn(styles.tabs__radio, styles.radioTabs)}>
							<input
								type='radio'
								name='map'
								className={styles.radioTabs__radio}
								id='rmap'
								defaultChecked
								onChange={handleChange}
							/>
							<label htmlFor='rmap' className={styles.radioTabs__label}>
								Карта
							</label>
						</div>
						<span className={styles.tabs__divide}>/</span>
						<div className={cn(styles.tabs__radio, styles.radioTabs)}>
							<input
								type='radio'
								name='map'
								className={styles.radioTabs__radio}
								id='rymap'
								onChange={handleChange}
							/>
							<label htmlFor='rymap' className={styles.radioTabs__label}>
								Яндекс карта
							</label>
						</div>
					</div>
					<div className={styles.lucky__wrap}>
						{!showMap ? (
							<div className={cn(styles.lucky__location, styles.location)}>
								<div
									className={styles.location__info}
									dangerouslySetInnerHTML={{
										__html: building_area.place_description
									}}
								></div>
								<img
									src={mapImg}
									srcSet={`${mapImg2x} 2x, ${mapImg3x} 3x`}
									className={styles.location__img}
									alt=''
								/>
								<img
									src={`${IMG_URL}/icons/north.svg`}
									alt=''
									className={styles.location__northImg}
								/>
							</div>
						) : (
							<YMaps query={{ apikey: API_YMAP_KEY }}>
								<Map defaultState={mapState} className={styles.location__map}>
									<Placemark geometry={[44.656906, 34.390684]} />
									<ZoomControl />
								</Map>
							</YMaps>
						)}
					</div>
					<img
						src={`${IMG_URL}/icons/frame-violet.svg`}
						alt=''
						className={cn(styles.lucky__decor, styles.lucky__decor_1)}
					/>
					{isDesctop && (
						<img
							src={`${IMG_URL}/icons/frame-red2.svg`}
							alt=''
							className={cn(styles.lucky__decor, styles.lucky__decor_2)}
						/>
					)}
					<img
						src={`${IMG_URL}/icons/rect2.svg`}
						alt=''
						className={cn(styles.lucky__decor, styles.lucky__decor_3)}
					/>
				</section>
			)}
		</>
	);
};

export default Lucky;
