import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import cn from 'classnames';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

import {
	selectDevice,
	selectDeviceHeight,
	selectIsDesctop,
	selectTablet
} from '../../reducers/appSlice';
import { selectData } from '../../reducers/dataSlice';
import { IMG_URL } from '../../constants';
import IosModal from '../IosModal';

import poster from '../../assets/img/video/video.jpg';
import posterWebp from '../../assets/img/video/video.webp';

import styles from './Video.module.scss';

const Video = ({ scrollTop }) => {
	const isDesctop = useSelector(selectIsDesctop);
	const notIphone = useSelector(selectDevice);
	const isTablet = useSelector(selectTablet);
	const data = useSelector(selectData);
	const wHeight = useSelector(selectDeviceHeight);
	const [animate, setAnimate] = useState(false);
	const [play, setPlay] = useState(false);
	const [full, setFull] = useState(false);
	const [muted, setMuted] = useState(true);
	const [controllsVisble, setControllsVisble] = useState(false);
	const [touchEnd, setTouchEnd] = useState(false);
	const [playedSeconds, setPlayedSeconds] = useState(0);
	const [loadedSeconds, setLoadedSeconds] = useState(0);
	const ref = useRef(null);
	const wrapRef = useRef(null);
	const videoRef = useRef(null);
	const handle = useFullScreenHandle();
	const [mousePosition, setMousePosition] = useState({ top: 0, left: 0 });
	const [iosPopup, setIosPopup] = useState(false);

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

	const handleMouseMove = e => {
		if (wrapRef !== null && wrapRef.current !== null) {
			const clientRect = wrapRef.current.getBoundingClientRect();
			setMousePosition({
				top: e.pageY - clientRect.top,
				left: e.pageX
			});
		}
	};

	const handleReportChange = useCallback(state => {
		setFull(state);
		setPlay(state);
		setMuted(!state);
	}, []);

	const handleTglPlay = () => {
		setPlay(!play);
	};

	const handleTglVolume = () => {
		setMuted(!muted);
	};

	const videoReady = () => {
		if (loadedSeconds === 0) {
			setLoadedSeconds(videoRef.current.getDuration() * 1000);
		}
	};

	const handleProgress = obj => {
		setPlayedSeconds(obj.playedSeconds * 1000);
	};

	const handleChangeProgress = e => {
		videoRef.current.seekTo(+e.target.value / 1000);
	};

	const tglIosPopup = () => {
		setIosPopup(!iosPopup);
		setPlay(!play);
		setMuted(!muted);
	};

	const handleEnter = () => {
		if (notIphone) {
			handle.enter();
		} else {
			tglIosPopup();
		}
	};

	const handleTouchStart = () => {
		setControllsVisble(true);
		setTouchEnd(false);
	};

	const timer = useRef(null);
	useEffect(() => {
		if (touchEnd) {
			timer.current = setTimeout(() => {
				setControllsVisble(false);
			}, 2000);

			return () => {
				!!timer.current && clearTimeout(timer.current);
			};
		}
	}, [controllsVisble, touchEnd]);

	const settings = {
		className: styles.video__player,
		width: '100%',
		height: '100%',
		progressInterval: 100,
		loop: true,
		controls: false,
		playsinline: true,
		stopOnUnmount: true,
		volume: 1,
		ref: videoRef
	};

	return (
		<>
			<section
				className={cn('sect', styles.video, {
					sect_animate: animate
				})}
				ref={ref}
			>
				<div className={cn(styles.video__title, 'sect__title-wrap')}>
					<p>ВИДЕО О ПРОЕКТЕ</p>
				</div>
				<div className={styles.video__wrap} ref={wrapRef}>
					<div
						className={cn(styles.video__btnWrap, {
							[styles.video__btnWrap_tablet]: isTablet
						})}
						onMouseMove={handleMouseMove}
					>
						<LazyLoadComponent threshold={wHeight / 2}>
							<picture className={styles.video__prev}>
								<source type='image/webp' srcSet={posterWebp} />
								<img src={poster} alt='' />
							</picture>
						</LazyLoadComponent>
						<div
							className={styles.video__fullscreenBtn}
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
					{notIphone && (
						<FullScreen handle={handle} onChange={handleReportChange}>
							{full && (
								<>
									<button
										className={cn(
											styles.video__fullscreenBtn,
											styles.video__fullscreenBtn_exit,
											'exit-btn'
										)}
										onClick={() => handle.exit()}
									></button>
									<div
										className={cn(styles.video__controlls, styles.controlls, {
											[styles.controlls_show]: controllsVisble
										})}
										onTouchStart={handleTouchStart}
										onTouchEnd={() => setTouchEnd(true)}
									>
										<button
											className={cn(
												styles.controlls__playBtn,
												styles.controllsBtn
											)}
											onClick={handleTglPlay}
										>
											{!play ? (
												<img src={`${IMG_URL}/icons/play.svg`} alt='' />
											) : (
												<img src={`${IMG_URL}/icons/pause.svg`} alt='' />
											)}
										</button>
										<input
											type='range'
											name='progress'
											id='progress'
											min='0'
											step='1'
											style={{
												backgroundSize:
													(playedSeconds * 100) / loadedSeconds + '% 100%'
											}}
											max={loadedSeconds}
											value={playedSeconds}
											onChange={handleChangeProgress}
											className={styles.controlls__progress}
										/>
										<button
											className={cn(
												styles.controlls__volumeBtn,
												styles.controllsBtn
											)}
											onClick={handleTglVolume}
										>
											{!muted ? (
												<img src={`${IMG_URL}/icons/volume.svg`} alt='' />
											) : (
												<img src={`${IMG_URL}/icons/volume-off.svg`} alt='' />
											)}
										</button>
									</div>
								</>
							)}
							<LazyLoadComponent threshold={wHeight / 2}>
								<ReactPlayer
									onTouchStart={handleTouchStart}
									onTouchEnd={() => setTouchEnd(true)}
									onProgress={handleProgress}
									onReady={videoReady}
									{...settings}
									url={data.settings.video}
									playing={play}
									muted={muted}
								/>
							</LazyLoadComponent>
						</FullScreen>
					)}
				</div>
			</section>

			{iosPopup && (
				<IosModal>
					<button
						className={cn(
							styles.video__fullscreenBtn,
							styles.video__fullscreenBtn_exit,
							'exit-btn'
						)}
						onClick={tglIosPopup}
					></button>
					<div
						className={cn(styles.video__controlls, styles.controlls, {
							[styles.controlls_show]: controllsVisble
						})}
						onTouchStart={handleTouchStart}
						onTouchEnd={() => setTouchEnd(true)}
					>
						<button
							className={cn(styles.controlls__playBtn, styles.controllsBtn)}
							onClick={handleTglPlay}
						>
							{!play ? (
								<img src={`${IMG_URL}/icons/play.svg`} alt='' />
							) : (
								<img src={`${IMG_URL}/icons/pause.svg`} alt='' />
							)}
						</button>
						<input
							type='range'
							name='progress'
							id='progress'
							min='0'
							step='1'
							style={{
								backgroundSize: (playedSeconds * 100) / loadedSeconds + '% 100%'
							}}
							max={loadedSeconds}
							value={playedSeconds}
							onChange={handleChangeProgress}
							className={styles.controlls__progress}
						/>
						<button
							className={cn(styles.controlls__volumeBtn, styles.controllsBtn)}
							onClick={handleTglVolume}
						>
							{!muted ? (
								<img src={`${IMG_URL}/icons/volume.svg`} alt='' />
							) : (
								<img src={`${IMG_URL}/icons/volume-off.svg`} alt='' />
							)}
						</button>
					</div>
					<ReactPlayer
						onTouchStart={handleTouchStart}
						onTouchEnd={() => setTouchEnd(true)}
						onProgress={handleProgress}
						onReady={videoReady}
						{...settings}
						url={data.settings.video}
						playing={play}
						muted={muted}
					/>
				</IosModal>
			)}
		</>
	);
};

export default Video;
