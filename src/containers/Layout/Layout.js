import React, { Fragment, useState } from 'react';

import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    };

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    };

    return (
        <Fragment>
            <Toolbar drawerToggleClicked={sideDrawerToggleHandler} isAuth={props.isAuth} />
            <SideDrawer
                open={showSideDrawer}
                closed={sideDrawerClosedHandler}
                isAuth={props.isAuth} />
            <main className={styles.content}>
                {props.children}
            </main>
        </Fragment>
    );
};

const mapStateToProps = state => {
    return {
        isAuth: !!state.auth.token
    };
};

export default connect(mapStateToProps)(Layout);
