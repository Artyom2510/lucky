import React from 'react';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import cn from 'classnames';

import { IMG_URL } from '../../constants';
import { selectData } from '../../reducers/dataSlice';
import { selectBuildings } from '../../reducers/buildingsSlice';
import { selectIsMobile } from '../../reducers/appSlice';
import Burger from '../Burger';

import styles from './Menu.module.scss';

const BurgerMenu = ({
	menuDisplay,
	menuVisible,
	handleTglMenu,
	openForm,
	openHowToBuy,
	scrollToSect
}) => {
	const buildingsData = useSelector(selectBuildings);
	const { buildings } = buildingsData;
	const data = useSelector(selectData);
	const { settings } = data;
	const isMobile = useSelector(selectIsMobile);

	const handleTglForm = () => {
		handleTglMenu();
		openForm();
	};

	const handleTglHowToBuy = () => {
		handleTglMenu();
		openHowToBuy();
	};

	const handleScrollToSect = sect => {
		scrollToSect(sect);
		handleTglMenu();
	};

	let classMenu = cn(styles.menu, {
		[styles.menu_visible]: menuVisible
	});

	return (
		<>
			{menuDisplay
				? createPortal(
						<div className={classMenu}>
							<div className={styles.menu__head}>
								<img
									src={`${IMG_URL}/icons/lucky-dark.svg`}
									alt=''
									className={styles.menu__logo}
								/>
								<Burger
									handleTglMenu={handleTglMenu}
									className={styles.menu__burger}
									menuVisible={menuVisible}
								/>
							</div>
							<div className={styles.menu__largeBtns}>
								<button
									className={cn(styles.menu__largeBtn, 'h2')}
									onClick={() => handleScrollToSect('general')}
								>
									Генплан
								</button>
								{buildings.length > 0 && (
									<button
										className={cn(
											styles.menu__largeBtn,
											styles.menu__largeBtn_choose,
											'h2'
										)}
										data-houses={buildings.length}
										onClick={() => handleScrollToSect('choose')}
									>
										Выбрать {isMobile && <br />} апартаменты
									</button>
								)}
							</div>
							<div className={cn(styles.menu__navBtns, styles.navBtns)}>
								<button
									className={styles.navBtns__btn}
									onClick={() => handleScrollToSect('map')}
								>
									<img src={`${IMG_URL}/icons/map-dark.svg`} alt='' />
									<span>Карта</span>
								</button>
								<button
									className={styles.navBtns__btn}
									onClick={() => handleScrollToSect('panorama')}
								>
									<img src={`${IMG_URL}/icons/panorama-dark.svg`} alt='' />
									<span>Панорама 360&deg;</span>
								</button>
								<a
									href={settings.presentation_url}
									className={styles.navBtns__btn}
									target='_blank'
									rel='noreferrer'
									download
								>
									<img
										src={`${IMG_URL}/icons/download-burger.svg`}
										alt='download'
									/>
									<span>Скачать презентацию</span>
								</a>
							</div>
							<div className={styles.menu__connect}>
								<a
									href={`tel:+${settings.phone.replace(/\D/gi, '')}`}
									className={styles.menuLink}
								>
									{settings.phone}
								</a>
								<button className={styles.menuLink} onClick={handleTglForm}>
									Заказать звонок
								</button>
							</div>
							<button className='btn' onClick={handleTglHowToBuy}>
								Как купить
							</button>
							<img
								src={`${IMG_URL}/icons/rect2.svg`}
								alt=''
								className={cn(styles.menu__decor, styles.menu__decor_1)}
							/>
							<img
								src={`${IMG_URL}/icons/union-head.svg`}
								alt=''
								className={cn(styles.menu__decor, styles.menu__decor_2)}
							/>
						</div>,
						document.body
				  )
				: null}
		</>
	);
};

export default BurgerMenu;
