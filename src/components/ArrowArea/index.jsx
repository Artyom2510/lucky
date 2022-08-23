import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { IMG_URL } from '../../constants';
import {
	selectDeviceWidth,
	selectIsDesctop,
	selectTablet
} from '../../reducers/appSlice';

import styles from './ArrowArea.module.scss';

const ArrowArea = ({ className, type, slideChange }) => {
	const ref = useRef(null);
	const wWidth = useSelector(selectDeviceWidth);
	const isDesctop = useSelector(selectIsDesctop);
	const isTablet = useSelector(selectTablet);

	const [position, setPosition] = useState({
		left: 0,
		top: 0
	});

	const handleMouseMove = e => {
		if (ref !== null && ref.current !== null) {
			const clientRect = ref.current.getBoundingClientRect();
			if (e.clientX > wWidth / 2) {
				setPosition({
					left: e.clientX - clientRect.left,
					top: e.clientY - clientRect.top
				});
			} else {
				setPosition({
					left: e.clientX,
					top: e.clientY - clientRect.top
				});
			}
		}
	};

	return (
		<div
			className={cn(className, styles.arrowArea, {
				[styles.arrowArea_prev]: type === 'prev',
				[styles.arrowArea_next]: type === 'next',
				[styles.arrowArea_tablet]: isTablet
			})}
			onMouseMove={handleMouseMove}
			ref={ref}
		>
			<div
				className={styles.arrowArea__wrap}
				style={{
					transform:
						isDesctop && !isTablet
							? `translate(calc(${position.left}px - 50%), calc(${position.top}px - 50%)) scale(1)`
							: 'none'
				}}
			>
				<button onClick={slideChange}>
					<img src={`${IMG_URL}/icons/arrow-choose.svg`} alt='' />
				</button>
			</div>
		</div>
	);
};

export default ArrowArea;
