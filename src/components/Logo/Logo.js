import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import styles from './Logo.module.css';

const Logo = () => (
    <div className={styles.logo}>
        <img src={burgerLogo} alt="MyBurger" />
    </div>
);

export default Logo;
