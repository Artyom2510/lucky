import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';

import styles from './IosModal.module.scss';

const IosModal = ({ children = null, container = document.body }) => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		setVisible(true);
	}, []);

	return (
		<>
			{createPortal(
				<div
					className={cn(styles.iosPopup, {
						[styles.iosPopup_visible]: visible
					})}
				>
					{children}
				</div>,
				container
			)}
		</>
	);
};

export default IosModal;
