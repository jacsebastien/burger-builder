import React, { Fragment } from 'react';
import styles from './Layout.module.css';

const Layout = (props) => (
    <Fragment>
        <header>Toolbar, SideDrawer, Backdrop</header>
        <main className={styles.content}>
            {props.children}
        </main>
    </Fragment>
);

export default Layout;
