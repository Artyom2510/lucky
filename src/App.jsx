import React, { useState, useRef, useEffect, Suspense, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isMobileOnly, isIOS, isTablet } from 'react-device-detect';

import { selectSlider, loadSlider } from './reducers/topSliderSlice';
import { setDeviceWindowProps } from './reducers/appSlice';
import { selectData } from './reducers/dataSlice';
import Header from './components/Header';
import GoToTop from './components/GoToTop';
import TopSlider from './components/TopSlider';
import FeedBack from './components/FeedBack';
import Modal from './components/Modal';
import ModalThx from './components/ModalThx';
import FormController from './components/FormController';
import HowToBuy from './components/HowToBuy';

const Shows = lazy(() => import('./components/Shows'));

const App = () => {
	const dispatch = useDispatch();
	const root = document.querySelector('.root');
	const data = useSelector(selectData);
	const slider = useSelector(selectSlider);
	const { isLoaded } = slider;

	useEffect(() => {
		dispatch(loadSlider());
	}, []);

	useEffect(() => {
		function updateDeviceProps() {
			const windowW = window.innerWidth;
			const windowH = window.innerHeight;
			dispatch(
				setDeviceWindowProps({
					width: windowW,
					height: windowH,
					notIphone: !isMobileOnly || (isMobileOnly && !isIOS),
					isTablet
				})
			);

			const vh = windowH * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
			if (data.isLoaded) {
				const scrollWidth = windowW - root.clientWidth;
				document.documentElement.style.setProperty(
					'--scroll-width',
					`${scrollWidth}px`
				);
			}
		}

		updateDeviceProps();
		window.addEventListener('resize', updateDeviceProps);

		return () => {
			window.removeEventListener('resize', updateDeviceProps);
		};
	}, [data.isLoaded]);

	const [isShowingForm, setIsShowingForm] = useState(false);
	const [isShowingHowToBuy, setIsShowingHowToBuy] = useState(false);

	const tglForm = () => {
		setIsShowingForm(!isShowingForm);
	};

	const tglHowToBuy = () => {
		setIsShowingHowToBuy(!isShowingHowToBuy);
	};

	const [st, setSt] = useState(0);
	const timeout = useRef(null);

	useEffect(() => {
		const handleScroll = () => {
			timeout.current = setTimeout(() => {
				setSt(root.scrollTop);
			}, 100);
		};
		root.addEventListener('scroll', handleScroll);

		return () => {
			root.removeEventListener('scroll', handleScroll);
			clearTimeout(timeout);
		};
	}, []);

	const scrollToSect = (anchor, parentAnchor = null, simple = false) => {
		const currentSect = document.getElementById(anchor);
		if (simple) {
			const coordY =
				currentSect.offsetTop + document.getElementById(parentAnchor).offsetTop;
			const scrollBy = coordY / 40;
			let end = st;
			console.log(coordY);
			if (coordY > st) {
				console.log('sdfsd');
				const scroller = setInterval(function () {
					end += scrollBy;
					if (end > coordY) {
						end = coordY;
						clearInterval(scroller);
					}
					root.scrollTo(0, end);
				}, 100);
			}
		} else {
			root.classList.add('root_hide');
			setTimeout(() => {
				const offsetTop = anchor === 'up' ? 0 : currentSect.offsetTop;
				root.scrollTo(0, offsetTop);
			}, 600);

			setTimeout(() => {
				root.classList.remove('root_hide');
			}, 1200);
		}
	};

	return (
		<>
			{isLoaded && <TopSlider />}
			{data.isLoaded && (
				<Header
					st={st}
					scrollToSect={scrollToSect}
					openForm={tglForm}
					openHowToBuy={tglHowToBuy}
				/>
			)}
			<Suspense fallback=''>
				<Shows
					st={st}
					scrollToSect={scrollToSect}
					tglHowToBuy={tglHowToBuy}
					tglForm={tglForm}
				/>
				<GoToTop st={st} scrollToSect={scrollToSect} />
			</Suspense>

			{isShowingForm && (
				<Modal hide={tglForm}>
					<FormController>
						{(isShowForm, setShowThx) =>
							isShowForm ? (
								<FeedBack onSuccess={setShowThx} title='Заказать звонок' />
							) : (
								<ModalThx hide={tglForm} />
							)
						}
					</FormController>
				</Modal>
			)}

			{isShowingHowToBuy && (
				<Modal hide={tglHowToBuy} modifierPopupClass='popup_howToBuy'>
					<HowToBuy openForm={tglForm} hide={tglHowToBuy} />
				</Modal>
			)}
		</>
	);
};

export default App;
