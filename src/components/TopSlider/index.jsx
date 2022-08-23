import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { EffectFade, Lazy } from 'swiper';
import cn from 'classnames';

import { selectSlider } from '../../reducers/topSliderSlice';

import { IMG_URL } from '../../constants';

import 'swiper/swiper.scss';
import 'swiper/modules/effect-fade/effect-fade.scss';
import 'swiper/modules/lazy/lazy.scss';
import styles from './TopSlider.module.scss';

const TopSlider = () => {
	const slider = useSelector(selectSlider);
	const { main } = slider;
	const [ready, setReady] = useState(false);
	const ref = useRef(null);
	const timeout = useRef(null);

	const params = {
		loop: true,
		grabCursor: false,
		draggable: false,
		allowTouchMove: false,
		slidesPerView: 1,
		spaceBetween: 0,
		preventClicks: false,
		preventClicksPropagation: false,
		speed: 0,
		ref,
		modules: [Lazy, EffectFade],
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 1
		}
	};

	useEffect(() => {
		if (ref.current !== null && ref.current.swiper !== null) {
			timeout.current = setInterval(() => {
				ref.current.swiper.slideNext();
			}, 10000);
		}

		setReady(true);

		return () => clearInterval(timeout);
	}, [ref]);

	return (
		<>
			{main.length > 0 && (
				<section className={styles.top}>
					<Swiper
						{...params}
						className={cn(styles.top__slider, styles.slider, {
							[styles.slider_ready]: ready
						})}
					>
						{main.map(({ order, X1, X2, X3 }) => {
							return (
								<SwiperSlide
									className={cn(styles.slider__slide, styles.slide)}
									key={order}
								>
									<img
										data-src={X1}
										data-srcset={`${X2} 2x, ${X3} 3x`}
										alt=''
										className={cn(styles.slide__img, 'swiper-lazy')}
									/>
									<div className={styles.slide__bg}></div>
								</SwiperSlide>
							);
						})}
					</Swiper>
					<img
						src={`${IMG_URL}/icons/lucky.svg`}
						alt='Удачное'
						className={styles.top__lucky}
					/>
				</section>
			)}
		</>
	);
};

export default TopSlider;
