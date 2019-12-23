import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

import styles from './Toolbar.module.css';

const Toolbar = (props) => (
    <header className={styles.toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className={styles.logo}>
            <Logo />
        </div>
        <nav>
            <NavigationItems />
        </nav>
    </header>
);

export default Toolbar;
