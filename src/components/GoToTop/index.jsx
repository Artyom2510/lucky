import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { selectDeviceHeight } from '../../reducers/appSlice';
import { IMG_URL } from '../../constants';

import styles from './GoToTop.module.scss';

const GoToTop = ({ st, scrollToSect }) => {
	const [visible, setVisible] = useState(false);
	const wHeight = useSelector(selectDeviceHeight);

	useEffect(() => setVisible(st > wHeight), [st]);

	return (
		<button
			className={cn(styles.goToTop, {
				[styles.goToTop_visible]: visible
			})}
			onClick={() => scrollToSect('up')}
		>
			<img src={`${IMG_URL}/icons/arrow-up.svg`} alt='' />
		</button>
	);
};

export default GoToTop;
