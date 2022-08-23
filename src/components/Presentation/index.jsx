import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

import { IMG_URL } from '../../constants';
import { selectData } from '../../reducers/dataSlice';
import { selectIsDesctop, selectDeviceHeight } from '../../reducers/appSlice';

import presentationImg from '../../assets/img/presentation/presentation.jpg';
import presentationImg2x from '../../assets/img/presentation/presentation@2x.jpg';
import presentationImgWebp from '../../assets/img/presentation/presentation.webp';
import presentationImgWebp2x from '../../assets/img/presentation/presentation@2x.webp';
import styles from './Presentation.module.scss';

const Presentation = () => {
	const data = useSelector(selectData);
	const wHeight = useSelector(selectDeviceHeight);
	const { settings } = data;
	const isDesctop = useSelector(selectIsDesctop);

	return (
		<section className={styles.presentation}>
			<div className={styles.presentation__wrap}>
				<LazyLoadComponent threshold={wHeight / 2}>
					<picture className={styles.presentation__wrapImg}>
						<source
							srcSet={`${presentationImgWebp} 1x, ${presentationImgWebp2x} 2x`}
							type='image/webp'
						/>
						<img src={presentationImg} srcSet={presentationImg2x} alt='' />
					</picture>
				</LazyLoadComponent>
				<div
					className={cn(
						styles.presentation__content,
						styles.presentationContent
					)}
				>
					<h2 className={styles.presentationContent__text}>
						{settings.presentation_text}
					</h2>
					<a
						href={settings.presentation_url}
						className={styles.presentationContent__link}
						target='_blank'
						rel='noreferrer'
					>
						<img src={`${IMG_URL}/icons/download.svg`} alt='download' />
						<span>Скачать презентацию</span>
					</a>
				</div>
				<div className={styles.presentation__grad}></div>
			</div>
			{isDesctop && (
				<>
					<img
						src={`${IMG_URL}/icons/circle-red.svg`}
						alt=''
						className={cn(
							styles.presentation__decor,
							styles.presentation__decor_1
						)}
					/>
					<img
						src={`${IMG_URL}/icons/frame-violet.svg`}
						alt=''
						className={cn(
							styles.presentation__decor,
							styles.presentation__decor_2
						)}
					/>
				</>
			)}
		</section>
	);
};

export default Presentation;
