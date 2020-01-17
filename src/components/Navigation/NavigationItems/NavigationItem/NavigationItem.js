import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavigationItem.module.css';


const NavigationItem = (props) => (
    <li className={styles.navigationItem}>
        <NavLink to={props.link} activeClassName={styles.active} exact={props.exact}>
            {props.children}
        </NavLink>
    </li>
);

export default NavigationItem;
