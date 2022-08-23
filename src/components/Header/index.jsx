import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { saveAs } from 'file-saver';

import { IMG_URL } from '../../constants';
import { selectIsTabletMobile, selectIsTablet } from '../../reducers/appSlice';
import { selectBuildings } from '../../reducers/buildingsSlice';
import { selectData } from '../../reducers/dataSlice';
import Burger from '../Burger';
import BurgerMenu from '../BurgerMenu';

import styles from './Header.module.scss';

const Header = ({ st, scrollToSect, openForm, openHowToBuy }) => {
	const data = useSelector(selectData);
	const { settings } = data;
	const buildingsData = useSelector(selectBuildings);
	const { buildings } = buildingsData;

	const [sticky, setSticky] = useState(false);
	const [transform, setTransform] = useState(false);
	const [pverTop, setPrevTop] = useState(0);
	const [menuDisplay, setMenuDisplay] = useState(false);
	const [menuVisible, setMenuVisible] = useState(false);
	const isTabletMobile = useSelector(selectIsTabletMobile);
	const isTablet = useSelector(selectIsTablet);

	useEffect(() => {
		setSticky(st > 64);
		setTransform(pverTop < st);
		setPrevTop(st);
	}, [st]);

	const handleTglMenu = () => {
		if (isTabletMobile) {
			if (menuDisplay) {
				setMenuVisible(false);
				setTimeout(() => {
					setMenuDisplay(false);
				}, 300);
			} else {
				setMenuDisplay(true);
				setTimeout(() => {
					setMenuVisible(true);
				}, 0);
			}
		}
	};

	const saveFile = () => {
		const url = settings.presentation_url;
		const fileName = url.split('/').pop();
		saveAs(url, fileName);
	};

	return (
		<header
			className={cn(styles.header, {
				[styles.header_transform]: transform,
				[styles.header_sticky]: sticky
			})}
		>
			{isTabletMobile ? (
				<>
					<a
						href={`tel:+${settings.phone.replace(/\D/gi, '')}`}
						className={cn(styles.header__phone, styles.headerLink)}
					>
						{settings.phone}
					</a>

					{isTablet && (
						<button
							className={cn(styles.header__link, styles.headerLink)}
							onClick={openForm}
						>
							<span>Заказать звонок</span>
						</button>
					)}
					<Burger
						handleTglMenu={handleTglMenu}
						className={styles.header__burger}
						menuVisible={menuVisible}
					/>
					<BurgerMenu
						menuDisplay={menuDisplay}
						menuVisible={menuVisible}
						handleTglMenu={handleTglMenu}
						openForm={openForm}
						openHowToBuy={openHowToBuy}
						scrollToSect={scrollToSect}
					/>
				</>
			) : (
				<>
					<img
						src={`${IMG_URL}/icons/lucky.svg`}
						alt=''
						className={styles.header__logo}
					/>
					<div className={styles.header__links}>
						<button
							className={cn(styles.header__link, styles.headerLink)}
							onClick={() => scrollToSect('general')}
						>
							<span>Генплан</span>
						</button>

						{buildings.length > 0 && (
							<button
								className={cn(
									styles.header__link,
									styles.headerLink,
									styles.headerLink_choose
								)}
								onClick={() => scrollToSect('choose')}
								data-houses={buildings.length}
							>
								<span>Выбрать апартаменты</span>
							</button>
						)}
					</div>
					<div
						className={cn(styles.header__links, styles.header__links_second)}
					>
						<button
							className={cn(
								styles.header__link,
								styles.header__link_middle,
								styles.headerLink
							)}
							onClick={() => scrollToSect('map')}
						>
							<img src={`${IMG_URL}/icons/map.svg`} alt='map' />
							<span>Карта</span>
						</button>
						<button
							className={cn(
								styles.header__link,
								styles.header__link_middle,
								styles.headerLink
							)}
							onClick={() => scrollToSect('panorama')}
						>
							<img src={`${IMG_URL}/icons/panorama.svg`} alt='map' />
							<span>360&deg;</span>
						</button>
						<button
							onClick={saveFile}
							className={cn(
								styles.header__link,
								styles.header__link_middle,
								styles.headerLink
							)}
						>
							<img src={`${IMG_URL}/icons/download.svg`} alt='download' />
							<span>Презентация</span>
						</button>
					</div>
					<div className={cn(styles.header__links, styles.header__links_last)}>
						<a
							href={`tel:+${settings.phone.replace(/\D/gi, '')}`}
							className={cn(styles.header__link, styles.headerLink)}
						>
							<span>{settings.phone}</span>
						</a>
						<button
							className={cn(styles.header__link, styles.headerLink)}
							onClick={openForm}
						>
							<span>Заказать звонок</span>
						</button>
					</div>
				</>
			)}
		</header>
	);
};

export default Header;
