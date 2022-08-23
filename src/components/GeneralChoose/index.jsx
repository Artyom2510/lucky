import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { selectDeviceHeight } from '../../reducers/appSlice';
import {
	selectBuildings,
	selectCurrent,
	selectCurrentBuildings,
	setCurrentType,
	setCurrentSquare
} from '../../reducers/buildingsSlice';
import Selected from '../Selected';

import styles from './GeneralChoose.module.scss';

const GeneralChoose = ({ scrollTop, openHowToBuy }) => {
	const dispatch = useDispatch();
	const [animate, setAnimate] = useState(false);
	const ref = useRef(null);
	const buildingsData = useSelector(selectBuildings);
	const { isLoaded, buildings } = buildingsData;
	const wHeight = useSelector(selectDeviceHeight);
	const current = useSelector(selectCurrent);
	const currentBuildings = useSelector(selectCurrentBuildings);

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

	const filteredObj = useMemo(() => {
		const filteredArrayByType = [];
		const filteredArrayBySquare = [];
		buildings.some(({ type, square }) => {
			if (!filteredArrayByType.some(el => el === type)) {
				filteredArrayByType.push(type);
			}

			if (!filteredArrayBySquare.some(el => el === square)) {
				filteredArrayBySquare.push(square);
			}
		});
		return {
			type: filteredArrayByType.sort(),
			square: filteredArrayBySquare.sort()
		};
	}, [buildings]);

	const handleChangeType = type => {
		dispatch(setCurrentType(type));
	};

	const handleChangeSquare = square => {
		dispatch(setCurrentSquare(square));
	};

	return (
		<>
			{isLoaded && (
				<section
					className={cn('sect', styles.choose, {
						sect_animate: animate
					})}
					ref={ref}
					id='choose'
				>
					<div
						className={cn('sect__title-wrap', styles.choose__title, 'title')}
					>
						<h3>ВЫБЕРИТЕ АПАРТАМЕНТЫ</h3>
					</div>
					<div className={cn(styles.choose__building, styles.filters)}>
						<div className={cn(styles.filters__filter, styles.filter)}>
							<p className={cn(styles.filter__desc, 'desc')}>Тип дома</p>
							<div className={styles.filter__scWrap}>
								<ul className={cn(styles.filter__head, styles.tabs)}>
									{filteredObj.type.map((el, i) => {
										return (
											<li key={`type${i}`} className={styles.tabs__tab}>
												<button
													className={cn(styles.filterBtn, {
														[styles.filterBtn_active]: el === current.type
													})}
													onClick={() => handleChangeType(el)}
												>
													Тип {el}
												</button>
											</li>
										);
									})}
								</ul>
							</div>
						</div>
						<div className={cn(styles.filters__filter, styles.filter)}>
							<p className={cn(styles.filter__desc, 'desc')}>Площади</p>
							<div className={styles.filter__scWrap}>
								<ul className={cn(styles.filter__head, styles.tabs)}>
									{filteredObj.square.map((sq, i) => {
										return (
											<li
												key={`square${i}`}
												className={cn(styles.tabs__tab, {
													[styles.tabs__tab_disabled]: !currentBuildings.some(
														el => el.square === sq
													)
												})}
											>
												<button
													className={cn(styles.filterBtn, {
														[styles.filterBtn_active]: sq === current.square
													})}
													onClick={() => handleChangeSquare(sq)}
												>
													{sq.toString().replace('.', ',')} m<sup>2</sup>
												</button>
											</li>
										);
									})}
								</ul>
							</div>
						</div>
					</div>
					<Selected
						className={styles.selectedInfo}
						openHowToBuy={openHowToBuy}
					/>
				</section>
			)}
		</>
	);
};

export default GeneralChoose;
