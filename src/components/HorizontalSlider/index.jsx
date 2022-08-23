import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import cn from 'classnames';

import SlideContent from '../SlideContent';
import { selectData } from '../../reducers/dataSlice';
import { selectIsDesctop, selectTablet } from '../../reducers/appSlice';
import { IMG_URL } from '../../constants';

import 'swiper/swiper.scss';
import styles from './HorizontalSlider.module.scss';

const HorizontalSlider = () => {
	const data = useSelector(selectData);
	const isDesctop = useSelector(selectIsDesctop);
	const isTablet = useSelector(selectTablet);
	const { services } = data;
	const ref = useRef(null);
	const [visible, setVisible] = useState(0);
	const [visibleCursor, setVisibleCursor] = useState(0);

	const [mousePosition, setMousePosition] = useState({ top: 0, left: 0 });

	const params = {
		loop: false,
		slideToClickedSlide: isDesctop,
		centeredSlides: isDesctop,
		grabCursor: true,
		slidesPerView: 'auto',
		spaceBetween: 8,
		preventClicks: false,
		preventClicksPropagation: false
	};

	const handleMouseMove = e => {
		if (ref !== null && ref.current !== null) {
			const clientRect = ref.current.getBoundingClientRect();
			setMousePosition({
				top: e.pageY - clientRect.top,
				left: e.pageX
			});
		}
	};

	const handleMouseEnter = i => {
		setVisible(i);
		setVisibleCursor(true);
	};

	return (
		<>
			{services.length !== 0 && (
				<section className={styles.horizontalSlider}>
					<div
						ref={ref}
						className={styles.horizontalSlider__slider}
						onMouseMove={handleMouseMove}
					>
						<Swiper {...params} className={styles.hzSlider}>
							{services.map((el, i) => {
								return (
									<SwiperSlide
										className={cn(styles.hzSlider__slide, styles.hzSlide)}
										onMouseEnter={() => handleMouseEnter(i)}
										onMouseLeave={() => setVisibleCursor(false)}
										key={`services${el.order}`}
									>
										<SlideContent
											{...el}
											visible={(i === visible && isDesctop) || isTablet}
										/>
									</SwiperSlide>
								);
							})}
						</Swiper>
						{isDesctop && !isTablet && (
							<>
								<div
									className={cn(
										styles.horizontalSlider__cursor,
										styles.sliderCursor,
										{
											[styles.sliderCursor_visible]: visibleCursor
										}
									)}
									style={{
										transform: `translate(calc(${mousePosition.left}px - 50%), calc(${mousePosition.top}px - 50%))`
									}}
								>
									<img src={`${IMG_URL}/icons/dragget.svg`} alt='тяни' />
								</div>
								<div
									className={cn(
										styles.horizontalSlider__animateText,
										styles.horizontalSlider__animateText_1
									)}
								>
									<img src={`${IMG_URL}/icons/advantage.svg`} alt='' />
								</div>
								<div
									className={cn(
										styles.horizontalSlider__animateText,
										styles.horizontalSlider__animateText_2
									)}
								>
									<img src={`${IMG_URL}/icons/advantage.svg`} alt='' />
								</div>
								<div
									className={cn(
										styles.horizontalSlider__animateText,
										styles.horizontalSlider__animateText_3
									)}
								>
									<img src={`${IMG_URL}/icons/advantage.svg`} alt='' />
								</div>
							</>
						)}
					</div>
					<img
						src={`${IMG_URL}/icons/rect3.svg`}
						alt=''
						className={cn(
							styles.horizontalSlider__decor,
							styles.horizontalSlider__decor_1
						)}
					/>
					<img
						src={`${IMG_URL}/icons/union2.svg`}
						alt=''
						className={cn(
							styles.horizontalSlider__decor,
							styles.horizontalSlider__decor_2
						)}
					/>
				</section>
			)}
		</>
	);
};

export default HorizontalSlider;
