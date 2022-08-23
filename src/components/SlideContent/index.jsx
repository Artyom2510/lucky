import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

import { selectDeviceHeight } from '../../reducers/appSlice';
import styles from './SlideContent.module.scss';

const SlideContent = ({
	visible,
	X1,
	X2,
	X3,
	WEBP_X1,
	WEBP_X2,
	WEBP_X3,
	title,
	description
}) => {
	const wHeight = useSelector(selectDeviceHeight);

	return (
		<LazyLoadComponent threshold={wHeight / 2}>
			<picture
				className={cn(styles.hzSlide__img, {
					[styles.hzSlide__img_visible]: visible
				})}
			>
				<source
					srcSet={`${WEBP_X1} 1x, ${WEBP_X2} 2x, ${WEBP_X3} 3x`}
					alt=''
					type='image/webp'
				/>
				<img src={X1} srcSet={`${X2} 2x, ${X3} 3x`} alt='' />
			</picture>
			<div
				className={cn(styles.hzSlide__content, styles.slideContent, {
					[styles.slideContent_visible]: visible
				})}
			>
				<p className={cn(styles.slideContent__name, 'h3')}>{title}</p>
				<div className={cn(styles.slideContent__desc)}>
					<p>{description}</p>
				</div>
			</div>
		</LazyLoadComponent>
	);
};

export default SlideContent;
