import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';

import { IMG_URL } from '../../constants';

import styles from './Modal.module.scss';

const Modal = ({
	hide = () => {},
	modifierPopupClass = '',
	children = null,
	container = document.body
}) => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		setVisible(true);
	}, []);

	return (
		<>
			{createPortal(
				<div
					className={cn(styles.popup, styles[modifierPopupClass], {
						[styles.popup_visible]: visible
					})}
				>
					<div className={styles.popup__bg} onClick={hide}></div>
					<div className={styles.popup__wrap}>
						<button className={styles.popup__close} onClick={hide}></button>
						<img
							src={`${IMG_URL}/icons/rect.svg`}
							alt=''
							className={styles.popup__decorIcon}
						/>
						{children}
					</div>
				</div>,
				container
			)}
		</>
	);
};

export default Modal;
