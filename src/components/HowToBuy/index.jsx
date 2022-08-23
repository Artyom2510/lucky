import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import AnimateHeight from 'react-animate-height';

import { selectData } from '../../reducers/dataSlice';

import styles from './HowToBuy.module.scss';

const HowToBuy = ({ openForm, hide }) => {
	const data = useSelector(selectData);
	const { description, how_to_buy, banks } = data;
	const [activeTab, setActiveTab] = useState(0);

	const handleChange = idx => {
		setActiveTab(idx);
	};

	const handleTglPopup = () => {
		hide();
		openForm();
	};

	return (
		<div className={styles.howToBuy}>
			<p className={cn(styles.howToBuy__title, styles.title)}>Как купить</p>
			<div
				className={cn(styles.howToBuy__content, 'desc2')}
				dangerouslySetInnerHTML={{
					__html: description.text
				}}
			></div>
			<ul className={cn(styles.howToBuy__list, styles.list)}>
				{how_to_buy.map(({ title }, i) => {
					return (
						<li
							className={cn(styles.list__item, styles.listItem, 'tab-btn')}
							key={`howtobuy${i}`}
						>
							<input
								id={`way${i}`}
								name='way'
								type='radio'
								defaultChecked={i === 0}
								className='tab-btn__radio'
								onChange={() => handleChange(i)}
							/>
							<label
								htmlFor={`way${i}`}
								className={cn(styles.listItem__label, 'tab-btn__label')}
							>
								{title}
							</label>
						</li>
					);
				})}
			</ul>
			<div
				className={cn(styles.howToBuy__bContent, 'b-content')}
				dangerouslySetInnerHTML={{
					__html: how_to_buy[activeTab].content
				}}
			></div>
			<button className={styles.howToBuy__tglPopup} onClick={handleTglPopup}>
				Заказать консультацию
			</button>
			<AnimateHeight
				duration={400}
				className={styles.banks}
				height={how_to_buy[activeTab].is_enabled_bank ? 'auto' : 0}
			>
				<p className={cn(styles.banks__title, styles.title)}>Банки партнеры</p>
				<ul className={cn(styles.banks__list, styles.banksList)}>
					{banks.map(({ order, X1, bid, down_payment, timing, url }) => {
						return (
							<li
								key={`banksList${order}`}
								className={cn(styles.banksList__item, styles.banksItem)}
							>
								<a
									href={url}
									target='_blank'
									rel='noreferrer'
									className={styles.banksItem__prev}
								>
									<img src={X1} alt='' />
								</a>
								<ul className={cn(styles.banksItem__info, styles.infoList)}>
									<li className={styles.infoList__item}>
										<p>{bid}</p>
										<p>Ставка</p>
									</li>
									<li className={styles.infoList__item}>
										<p>{down_payment}</p>
										<p>Первый взнос</p>
									</li>
									<li className={styles.infoList__item}>
										<p>{timing}</p>
										<p>Срок, лет</p>
									</li>
								</ul>
							</li>
						);
					})}
				</ul>
			</AnimateHeight>
		</div>
	);
};

export default HowToBuy;
