import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import cn from 'classnames';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

import { selectData } from '../../reducers/dataSlice';
import { selectDeviceHeight } from '../../reducers/appSlice';
import ArrowArea from '../ArrowArea';

import 'swiper/swiper.scss';
import 'swiper/modules/pagination/pagination.scss';
import styles from './SimpleSlider.module.scss';

const SimpleSlider = () => {
	const data = useSelector(selectData);
	const { slides } = data;
	const ref = useRef(null);
	const paginationRef = useRef(null);
	const wHeight = useSelector(selectDeviceHeight);

	const params = {
		loop: true,
		grabCursor: true,
		slidesPerView: 1,
		spaceBetween: 0,
		preventClicks: false,
		preventClicksPropagation: false,
		ref,
		modules: [Pagination],
		onBeforeInit: swiper => {
			swiper.params.pagination.el = paginationRef.current;
		},
		pagination: {
			type: 'custom',
			el: paginationRef.current,
			renderCustom: (swiper, current, total) => {
				return `<div><span class='h3'>${current}</span><span class='h3'>${total}</span></div>`;
			}
		}
	};

	const goNext = () => {
		if (ref.current !== null && ref.current.swiper !== null) {
			ref.current.swiper.slideNext();
		}
	};

	const goPrev = () => {
		if (ref.current !== null && ref.current.swiper !== null) {
			ref.current.swiper.slidePrev();
		}
	};

	return (
		<>
			{slides.length !== 0 && (
				<section className={cn(styles.simpleSlider, styles.sliderSect)}>
					<Swiper
						{...params}
						className={cn(styles.sliderSect__slider, styles.slider)}
					>
						{slides.map(({ order, X1, X2, X3 }) => {
							return (
								<SwiperSlide
									className={cn(styles.simpleSlider__slide, styles.simpleSlide)}
									key={`simple${order}`}
								>
									<LazyLoadComponent threshold={wHeight / 2}>
										<img
											src={X1}
											srcSet={`${X2} 2x, ${X3} 3x`}
											alt=''
											className={styles.simpleSlide__img}
										/>
									</LazyLoadComponent>
								</SwiperSlide>
							);
						})}
						<div
							className={styles.simpleSlider__amount}
							ref={paginationRef}
						></div>
					</Swiper>
					<ArrowArea
						slideChange={goPrev}
						type='prev'
						className={cn(
							styles.sliderSect__arrowArea,
							styles.sliderSect__arrowArea_prev
						)}
					/>
					<ArrowArea
						type='next'
						slideChange={goNext}
						className={cn(
							styles.sliderSect__arrowArea,
							styles.sliderSect__arrowArea_next
						)}
					/>
				</section>
			)}
		</>
	);
};

export default SimpleSlider;
