import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { selectHoverBuilding } from '../../reducers/buildingsSlice';

import styles from './BuildingsInfo.module.scss';

const BuildingsInfo = ({ className }) => {
	const current = useSelector(selectHoverBuilding);

	return (
		<div className={cn(className, styles.buildingsInfo)}>
			{!!current && (
				<>
					<div className={styles.buildingsInfo__prev}>
						{!!current.images[0] && <img src={current.images[0].X1} alt='' />}
					</div>
					<ul className={cn(styles.buildingsInfo__list, styles.buildingsList)}>
						{!!current.type && (
							<li className={styles.buildingsList__item}>
								<p>{current.type}</p>
								<p>Тип дома</p>
							</li>
						)}
						{!!current.square && (
							<li className={styles.buildingsList__item}>
								<p>{current.square}</p>
								<p>
									Площадь м<sup>2</sup>
								</p>
							</li>
						)}
						{!!current.storeys_number && (
							<li className={styles.buildingsList__item}>
								<p>{current.storeys_number}</p>
								<p>Этажность</p>
							</li>
						)}
					</ul>
				</>
			)}
		</div>
	);
};

export default BuildingsInfo;
