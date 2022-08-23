import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import InnerImageZoom from 'react-inner-image-zoom';

import {
	selectCurrentBuildings,
	selectCurrent
} from '../../reducers/buildingsSlice';
import { selectIsDesctop } from '../../reducers/appSlice';

import { selectData } from '../../reducers/dataSlice';
import Modal from '../Modal';
import ModalThx from '../ModalThx';
import FormController from '../FormController';
import FeedBack from '../FeedBack';
import NewInfo from '../NewInfo';

import 'swiper/swiper.scss';
import 'swiper/modules/pagination/pagination.scss';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import styles from './Selected.module.scss';

const Selected = ({ openHowToBuy }) => {
	const currentBuildings = useSelector(selectCurrentBuildings);
	const isDesctop = useSelector(selectIsDesctop);
	const current = useSelector(selectCurrent);
	const [buildingInfo, setBuildingInfo] = useState({});
	const data = useSelector(selectData);
	const { settings } = data;
	const ref = useRef(null);
	const paginationRef = useRef(null);

	const [showCheckIn, setShowCheckIn] = useState(false);
	const [showFormInfo, setShowFormInfo] = useState(false);

	const handleTglCheckIn = () => {
		setShowCheckIn(!showCheckIn);
	};

	const handleTglFormInfo = () => {
		setShowFormInfo(!showFormInfo);
	};

	const params = {
		loop: false,
		grabCursor: true,
		slidesPerView: 1,
		spaceBetween: 0,
		preventClicks: false,
		preventClicksPropagation: false,
		ref,
		allowTouchMove: false,
		modules: [Pagination],
		onBeforeInit: swiper => {
			swiper.params.pagination.el = paginationRef.current;
		},
		pagination: {
			el: paginationRef.current,
			clickable: true,
			renderBullet: (index, className) => {
				return `<button class="${className}"></button>`;
			}
		}
	};

	useEffect(() => {
		if (!!currentBuildings && !!current.id) {
			const info = currentBuildings.find(el => el.id === current.id);
			setBuildingInfo(info);
		}
	}, [currentBuildings, current]);

	return (
		<>
			{!!Object.keys(buildingInfo).length && (
				<div className={styles.selected} id='selected'>
					<div className={styles.selected__prev}>
						<img
							src={buildingInfo.images[0].X1}
							alt=''
							srcSet={`${buildingInfo.images[0].X2} 2x, ${buildingInfo.images[0].X3} 3x`}
						/>
					</div>
					<div className={cn(styles.selected__info, styles.selectedCurrent)}>
						<div
							className={cn(styles.selectedCurrent__head, styles.currentHead)}
						>
							<div className={styles.currentHead__info}>
								<p className='h3'>
									{!!buildingInfo.square && buildingInfo.square}
								</p>
								<p className='desc2'>
									Площадь апартамента, м<sup>2</sup>
								</p>
							</div>
							<div className={styles.currentHead__info}>
								<p className='h3'>
									{!!buildingInfo.floor_height && buildingInfo.floor_height} м
								</p>
								<p className='desc2'>Высота этажа</p>
							</div>
							{(settings.total_cost || settings.meter_cost) && (
								<div className={cn(styles.currentHead__price, styles.price)}>
									{settings.total_cost && !!buildingInfo.price && (
										<p className={cn(styles.price__total, 'h3')}>
											{buildingInfo.price.toLocaleString('ru')} руб.
										</p>
									)}
									{settings.total_cost &&
										settings.meter_cost &&
										!!buildingInfo.cost_per_meter && (
											<p className={styles.price__perMeter}>
												{buildingInfo.cost_per_meter.toLocaleString('ru')} руб/м
												<sup>2</sup>
											</p>
										)}
									{!settings.total_cost &&
										settings.meter_cost &&
										!!buildingInfo.cost_per_meter && (
											<>
												<p className={cn(styles.price__total, 'h3')}>
													{buildingInfo.cost_per_meter.toLocaleString('ru')}{' '}
													руб.
												</p>
												<p className={styles.price__perMeter}>
													Цена за м<sup>2</sup>
												</p>
											</>
										)}
								</div>
							)}
						</div>
						<div className={cn(styles.selectedCurrent__plans, styles.plans)}>
							<Swiper
								{...params}
								className={cn(styles.plans__sl, styles.plansSl)}
							>
								{buildingInfo.plans.length > 0 &&
									buildingInfo.plans.map(({ order, X1 }) => {
										return (
											<SwiperSlide
												className={styles.plansSl__slide}
												key={`plans${order}`}
											>
												<InnerImageZoom
													zoomScale={isDesctop ? 0.5 : 1}
													width={isDesctop ? 488 : 244}
													height={isDesctop ? 812 : 406}
													src={X1}
													zoomSrc={X1}
												/>
											</SwiperSlide>
										);
									})}
							</Swiper>
							<div
								className={cn(styles.plans__pagination, styles.plansPagination)}
							>
								<div
									className={styles.plansPagination__btns}
									ref={paginationRef}
								></div>
								<p className={styles.plansPagination__desc}>уровень</p>
							</div>
						</div>
						<div
							className={cn(styles.selectedCurrent__btns, styles.currentBtns)}
						>
							<div className={styles.currentBtns__wrap}>
								<button
									className={styles.currentBtns__tglForm}
									onClick={handleTglCheckIn}
								>
									Записаться на просмотр
								</button>
								<button
									className={styles.currentBtns__tglForm}
									onClick={handleTglFormInfo}
								>
									Отправить информацию на почту
								</button>
							</div>
							<button
								className={styles.currentBtns__howToBuy}
								onClick={openHowToBuy}
							>
								Как купить
							</button>
						</div>
					</div>

					<ul className={cn(styles.selected__staticList, styles.staticList)}>
						<li className={styles.staticList__item}>Панорамные окна</li>
						<li className={styles.staticList__item}>Автономное отопление</li>
						<li className={styles.staticList__item}>Свободная планировка</li>
						<li className={styles.staticList__item}>
							Просторные террасы и&nbsp;балконы
						</li>
					</ul>
				</div>
			)}

			{showCheckIn && (
				<Modal hide={handleTglCheckIn}>
					<FormController>
						{(isShowForm, setShowThx) =>
							isShowForm ? (
								<FeedBack
									onSuccess={setShowThx}
									title='Записаться на просмотр'
									id={current.id}
								/>
							) : (
								<ModalThx hide={handleTglCheckIn} />
							)
						}
					</FormController>
				</Modal>
			)}

			{showFormInfo && (
				<Modal hide={handleTglFormInfo}>
					<FormController>
						{(isShowForm, setShowThx) =>
							isShowForm ? (
								<NewInfo onSuccess={setShowThx} id={current.id} />
							) : (
								<ModalThx hide={handleTglFormInfo} />
							)
						}
					</FormController>
				</Modal>
			)}
		</>
	);
};

export default Selected;
