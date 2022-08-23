import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

import {
	selectDevice,
	selectDeviceHeight,
	selectIsDesctop,
	selectTablet
} from '../../reducers/appSlice';
import { selectData } from '../../reducers/dataSlice';
import IosModal from '../IosModal';

import iosPanoramaImg from '../../assets/img/panorama.jpg';
import styles from './Panorama.module.scss';

const Panorama = ({ scrollTop }) => {
	const wHeight = useSelector(selectDeviceHeight);
	const notIphone = useSelector(selectDevice);
	const isTablet = useSelector(selectTablet);
	const isDesctop = useSelector(selectIsDesctop);
	const data = useSelector(selectData);
	const [animate, setAnimate] = useState(false);
	const [full, setFull] = useState(false);
	const ref = useRef(null);
	const wrapRef = useRef(null);
	const handle = useFullScreenHandle();
	const [iosPopup, setIosPopup] = useState(false);

	const handleReportChange = useCallback(state => {
		setFull(state);
	}, []);

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

	const [mousePosition, setMousePosition] = useState({ top: 0, left: 0 });

	const handleMouseMove = e => {
		if (wrapRef !== null && wrapRef.current !== null) {
			const clientRect = wrapRef.current.getBoundingClientRect();
			setMousePosition({
				top: e.pageY - clientRect.top,
				left: e.pageX
			});
		}
	};

	const handleEnter = () => {
		if (notIphone) {
			handle.enter();
		} else {
			setIosPopup(true);
		}
	};

	return (
		<>
			<section
				className={cn('sect', styles.panorama, {
					sect_animate: animate
				})}
				id='panorama'
				ref={ref}
			>
				<div className={cn(styles.panorama__title, 'sect__title-wrap')}>
					<p>360&deg;</p>
				</div>
				<div
					className={cn(styles.panorama__wrap, {
						[styles.panorama__wrap_tablet]: isTablet
					})}
					ref={wrapRef}
				>
					<LazyLoadComponent threshold={wHeight / 2}>
						<div
							className={cn(styles.panorama__btnWrap, styles.btnWrap, {
								[styles.btnWrap_tablet]: isTablet
							})}
							onMouseMove={handleMouseMove}
						>
							<div
								className={styles.btnWrap__btn}
								style={{
									transform:
										isDesctop && !isTablet
											? `translate(calc(${mousePosition.left}px - 50%), calc(${mousePosition.top}px - 50%))`
											: 'none'
								}}
							>
								<button className='btn-look' onClick={handleEnter}>
									Смотреть
								</button>
							</div>
						</div>

						{notIphone ? (
							<FullScreen handle={handle} onChange={handleReportChange}>
								{full && (
									<button
										className={cn(styles.panorama__exit, 'exit-btn')}
										onClick={() => handle.exit()}
									></button>
								)}
								<iframe src={data.settings.panorama} name='iframe' />
							</FullScreen>
						) : (
							<img src={iosPanoramaImg} alt='' />
						)}
					</LazyLoadComponent>
				</div>
			</section>

			{iosPopup && (
				<IosModal>
					<button
						className={cn(styles.panorama__exit, 'exit-btn')}
						onClick={() => setIosPopup(false)}
					></button>
					<iframe src={data.settings.panorama} name='iframe' />
				</IosModal>
			)}
		</>
	);
};

export default Panorama;
