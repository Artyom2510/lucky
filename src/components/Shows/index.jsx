import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadData, selectData } from '../../reducers/dataSlice';
import { selectBuildings, loadBuildings } from '../../reducers/buildingsSlice';
import Intro from '../Intro';
import BuildingArea from '../BuildingArea';
import Lucky from '../Lucky';
import SimpleSlider from '../SimpleSlider';
import HorizontalSlider from '../HorizontalSlider';
import Panorama from '../Panorama';
import ContentSect from '../ContentSect';
import General from '../General';
import GeneralChoose from '../GeneralChoose';
import Video from '../Video';
import Presentation from '../Presentation';
import Footer from '../Footer';

const Shows = ({ st, scrollToSect, tglHowToBuy }) => {
	const dispatch = useDispatch();
	const buildingsData = useSelector(selectBuildings);
	const { buildings } = buildingsData;

	useEffect(() => {
		dispatch(loadData());
		dispatch(loadBuildings());
	}, []);

	const data = useSelector(selectData);
	const { isLoaded } = data;

	return (
		<>
			{isLoaded && (
				<>
					<Intro scrollTop={st} />
					<BuildingArea scrollTop={st} />
					<Lucky scrollTop={st} />
					<SimpleSlider />
					<HorizontalSlider />
					<Panorama scrollTop={st} />
					<ContentSect scrollTop={st} />
					<General scrollToSect={scrollToSect} />
					{buildings.length > 0 && (
						<GeneralChoose scrollTop={st} openHowToBuy={tglHowToBuy} />
					)}
					<Video />
					<Presentation />
					<Footer />
				</>
			)}
		</>
	);
};

export default Shows;
