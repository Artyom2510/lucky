import React from 'react';
import cn from 'classnames';

import styles from './Burger.module.scss';

const Burger = ({ handleTglMenu, className, menuVisible }) => {
	let classBurger = cn(
		styles.btnBurger,
		menuVisible ? styles.btnBurger_open : styles.btnBurger_close
	);

	return (
		<button
			className={cn(className, `${classBurger}`)}
			onClick={handleTglMenu}
		></button>
	);
};

export default Burger;
