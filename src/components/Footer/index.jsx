import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { selectData } from '../../reducers/dataSlice';
import FooterFeedback from '../FooterFeedback';
import Modal from '../Modal';
import ModalThx from '../ModalThx';

import styles from './Footer.module.scss';

const Footer = () => {
	const data = useSelector(selectData);
	const { settings } = data;
	const [showThx, setShowThx] = useState(false);

	const tglThx = () => setShowThx(!showThx);

	return (
		<>
			<footer className={styles.footer}>
				<div className={styles.footer__container}>
					<div className={cn(styles.footer__head, styles.footerHead)}>
						{settings.links.map(({ order, title, url }) => {
							return (
								<a
									href={url}
									className={cn(styles.footerHead__link, 'desc2')}
									target='_blank'
									rel='noreferrer'
									key={`footerLink${order}`}
								>
									{title}
								</a>
							);
						})}
					</div>
					<div className={styles.footer__row}>
						<div className={cn(styles.footerRow__col, styles.footerContacts)}>
							<div className={cn(styles.footerContacts__addr, styles.addr)}>
								<p className={cn(styles.addr__title, 'desc2')}>
									Центр выбора квартир
								</p>
								<p className={cn(styles.addr__info, 'desc2')}>
									{settings.place}
								</p>
							</div>
							<div
								className={cn(styles.footerContacts__schedule, styles.schedule)}
							>
								<p className={cn(styles.schedule__day, 'desc2')}>
									{settings.working_hours}
								</p>
								<div className={styles.schedule__tel}>
									<a
										href={`tel:+${settings.phone.replace(/\D/gi, '')}`}
										className='desc2'
									>
										{settings.phone}
									</a>
								</div>
								<div className={styles.schedule__tel}>
									<a
										href={`tel:${settings.contacts.replace(/\D/gi, '')}`}
										className='desc2'
									>
										{settings.contacts}
									</a>
								</div>
							</div>
						</div>
						<div className={cn(styles.footerRow__col, styles.footerForm)}>
							<p className={cn(styles.footerForm__desc, 'desc2')}>
								Оставьте свои контакты - мы свяжемся с вами <br /> в ближайшее
								время
							</p>
							<FooterFeedback onSuccess={tglThx} />
						</div>
					</div>
					<div className={cn(styles.footer__bottom, styles.footerBottom)}>
						<div className={cn(styles.footerBottom__links, styles.footerLinks)}>
							<a
								href={settings.privacy_policy}
								rel='noreferrer'
								target='_blank'
								className={cn(styles.footerLinks__link, 'desc2')}
							>
								Политика конфиденциальности
							</a>
							<span
								className={cn(
									styles.footerLinks__link,
									styles.footerLinks__link_text,
									'desc2'
								)}
							>
								{settings.developer}
							</span>
							<a
								href={settings.declaration}
								rel='noreferrer'
								target='_blank'
								className={cn(styles.footerLinks__link, 'desc2')}
							>
								Проектная декларация на наш.дом.рф
							</a>
						</div>
						<a
							href={settings.general_contractor_url}
							rel='noreferrer'
							className={styles.footerBottom__logo}
							target='_blank'
						>
							<img
								src={settings.X1}
								srcSet={`${settings.X2} 2x, ${settings.X3} 3x`}
								alt=''
							/>
						</a>
					</div>
					<div className={styles.footer__grad}></div>
					<div className={styles.footer__bg}></div>
				</div>
			</footer>

			{showThx && (
				<Modal hide={tglThx}>
					<ModalThx hide={tglThx} />
				</Modal>
			)}
		</>
	);
};

export default Footer;
