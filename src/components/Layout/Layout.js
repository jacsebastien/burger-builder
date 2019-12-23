import React, { Fragment } from 'react';

import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const Layout = (props) => (
    <Fragment>
        <Toolbar />
        <main className={styles.content}>
            {props.children}
        </main>
    </Fragment>
);

export default Layout;
