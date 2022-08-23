import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

import { selectData } from '../../reducers/dataSlice';
import {
	selectIsDesctop,
	selectIsTabletProMobile,
	selectDeviceHeight
} from '../../reducers/appSlice';
import {
	selectBuildings,
	selectSelectedId,
	setSelectedId,
	setHoveredId
} from '../../reducers/buildingsSlice';
import { selectDeviceWidth } from '../../reducers/appSlice';
import { IMG_URL } from '../../constants';
import BuildingsInfo from '../BuildingsInfo';

import generalImg from '../../assets/img/general/general.jpg';
import generalImgWebp from '../../assets/img/general/general.webp';
import styles from './General.module.scss';

const General = ({ scrollToSect }) => {
	const dispatch = useDispatch();
	const data = useSelector(selectData);
	const wHeight = useSelector(selectDeviceHeight);
	const { buildings } = data;
	const buildingsData = useSelector(selectBuildings);
	const selectedId = useSelector(selectSelectedId);
	const isDesctop = useSelector(selectIsDesctop);
	const isTabletProMobile = useSelector(selectIsTabletProMobile);
	const [helpHide, setHelpHide] = useState(false);
	const wWidth = useSelector(selectDeviceWidth);
	const [left, setLeft] = useState(0);

	const handleClick = id => {
		scrollToSect('selected', 'choose', true);
		dispatch(setSelectedId(id));
	};

	const handleSetHoveredId = id => {
		dispatch(setHoveredId(id));
	};

	const handleRemoveId = () => {
		dispatch(setHoveredId(null));
	};

	const memoScrollWidth = useMemo(() => {
		return (wWidth * wWidth) / 1200;
	}, [wWidth]);

	const memoScrollTransform = useMemo(() => {
		return left * ((wWidth - memoScrollWidth) / (1200 - wWidth));
	}, [wWidth, left]);

	const handleScroll = e => {
		setLeft(e.target.scrollLeft);
		setHelpHide(true);
	};

	return (
		<section className={styles.general} id='general'>
			<div
				className={styles.general__wraper}
				onScroll={handleScroll}
				style={{ '--scl': `${memoScrollTransform}px` }}
			>
				{!helpHide && <h2 className={styles.general__title}>Генплан</h2>}
				<div className={styles.general__wrap}>
					{buildings.map(({ order, status, id }) => {
						return (
							<button
								key={`house${order}`}
								className={cn(
									styles.general__house,
									styles[`general__house_${order}`],
									styles.house,
									{
										[styles.house_sold]: status,
										[styles.house_current]: !!selectedId && id === selectedId
									}
								)}
								onClick={() => handleClick(id)}
								onMouseEnter={() => handleSetHoveredId(id)}
								onMouseLeave={() => handleRemoveId(id)}
							>
								<span>{order}</span>
							</button>
						);
					})}
					<LazyLoadComponent threshold={wHeight}>
						<div className={cn(styles.general__decor, styles.general__decor_1)}>
							<img src={`${IMG_URL}/icons/general/north.svg`} alt='' />
							<span>
								СПА <br /> рестораны
							</span>
						</div>
						<div className={cn(styles.general__decor, styles.general__decor_2)}>
							<img src={`${IMG_URL}/icons/general/north.svg`} alt='' />
							<span>Море</span>
						</div>
						<img
							src={`${IMG_URL}/icons/general/compass.svg`}
							alt=''
							className={cn(styles.general__decor, styles.general__decor_3)}
						/>
						<picture className={styles.general__imgWrap}>
							<source type='image/webp' srcSet={generalImgWebp} />
							<img src={generalImg} alt='' />
						</picture>
					</LazyLoadComponent>
					{isDesctop && buildingsData.buildings.length > 0 && (
						<BuildingsInfo className={styles.general__buildingsInfo} />
					)}
				</div>
				{isTabletProMobile && (
					<>
						<div
							className={cn(styles.general__help, styles.help, {
								[styles.help_hide]: helpHide
							})}
						>
							<img
								className={styles.help__img}
								src={`${IMG_URL}/icons/general/hand.svg`}
								alt=''
							/>
						</div>
						<div className={styles.general__scroll}>
							<span
								style={{
									width: memoScrollWidth + 'px'
								}}
							></span>
						</div>
					</>
				)}
			</div>
		</section>
	);
};

export default General;
